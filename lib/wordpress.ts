import type { WordPressPost } from "@prisma/client"

export interface WordPressApiPost {
  id: number
  date: string
  date_gmt: string
  guid: { rendered: string }
  modified: string
  modified_gmt: string
  slug: string
  status: string
  type: string
  link: string
  title: { rendered: string }
  content: { rendered: string }
  excerpt: { rendered: string }
  author: number
  featured_media: number
  comment_status: string
  ping_status: string
  sticky: boolean
  template: string
  format: string
  meta: any
  categories: number[]
  tags: number[]
  yoast_head?: string
  yoast_head_json?: {
    title?: string
    description?: string
    og_image?: Array<{ url: string }>
  }
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string
      alt_text: string
    }>
    "wp:term"?: Array<
      Array<{
        id: number
        name: string
        slug: string
        taxonomy: string
      }>
    >
  }
}

export interface WordPressApiResponse {
  posts: WordPressApiPost[]
  totalPages: number
  totalPosts: number
}

export class WordPressClient {
  private baseUrl: string
  private apiKey?: string

  constructor(baseUrl: string, apiKey?: string) {
    this.baseUrl = baseUrl.replace(/\/$/, "") // Remove trailing slash
    this.apiKey = apiKey
  }

  private async makeRequest(endpoint: string, params: Record<string, any> = {}) {
    const url = new URL(`${this.baseUrl}/wp-json/wp/v2${endpoint}`)

    // Add common parameters
    params._embed = true // Include embedded data (featured images, categories, etc.)

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value.toString())
      }
    })

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    }

    if (this.apiKey) {
      headers["Authorization"] = `Bearer ${this.apiKey}`
    }

    const response = await fetch(url.toString(), { headers })

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  async getPosts(
    params: {
      page?: number
      per_page?: number
      search?: string
      categories?: string
      tags?: string
      status?: string
      orderby?: string
      order?: "asc" | "desc"
    } = {},
  ): Promise<WordPressApiResponse> {
    const posts = await this.makeRequest("/posts", {
      page: params.page || 1,
      per_page: params.per_page || 10,
      search: params.search,
      categories: params.categories,
      tags: params.tags,
      status: params.status || "publish",
      orderby: params.orderby || "date",
      order: params.order || "desc",
    })

    return {
      posts,
      totalPages: Number.parseInt(posts.headers?.get("X-WP-TotalPages") || "1"),
      totalPosts: Number.parseInt(posts.headers?.get("X-WP-Total") || posts.length.toString()),
    }
  }

  async getPost(id: number): Promise<WordPressApiPost> {
    return this.makeRequest(`/posts/${id}`)
  }

  async getPostBySlug(slug: string): Promise<WordPressApiPost> {
    const posts = await this.makeRequest("/posts", { slug })
    if (!posts.length) {
      throw new Error(`Post with slug "${slug}" not found`)
    }
    return posts[0]
  }

  async getCategories(): Promise<any[]> {
    return this.makeRequest("/categories", { per_page: 100 })
  }

  async getTags(): Promise<any[]> {
    return this.makeRequest("/tags", { per_page: 100 })
  }
}

export function transformWordPressPost(
  wpPost: WordPressApiPost,
): Omit<WordPressPost, "id" | "createdAt" | "updatedAt"> {
  // Extract categories and tags from embedded data
  const categories: string[] = []
  const tags: string[] = []

  if (wpPost._embedded?.["wp:term"]) {
    wpPost._embedded["wp:term"].forEach((termGroup) => {
      termGroup.forEach((term) => {
        if (term.taxonomy === "category") {
          categories.push(term.name)
        } else if (term.taxonomy === "post_tag") {
          tags.push(term.name)
        }
      })
    })
  }

  // Extract featured image
  let featuredImage: string | null = null
  if (wpPost._embedded?.["wp:featuredmedia"]?.[0]) {
    featuredImage = wpPost._embedded["wp:featuredmedia"][0].source_url
  }

  // Extract SEO data from Yoast if available
  const metaTitle = wpPost.yoast_head_json?.title || null
  const metaDescription = wpPost.yoast_head_json?.description || null

  return {
    wpId: wpPost.id,
    title: wpPost.title.rendered,
    slug: wpPost.slug,
    content: wpPost.content.rendered,
    excerpt: wpPost.excerpt.rendered,
    status: wpPost.status,
    type: wpPost.type,
    metaTitle,
    metaDescription,
    featuredImage,
    categories,
    tags,
    wpCreatedAt: new Date(wpPost.date),
    wpUpdatedAt: new Date(wpPost.modified),
  }
}
