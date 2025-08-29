"use client"

import { useState, useEffect } from "react"
import { BlogCard } from "./blog-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Search } from "lucide-react"

interface BlogPost {
  id: string
  wpId: number
  title: string
  slug: string
  excerpt: string
  featuredImage: string | null
  categories: string[]
  tags: string[]
  wpCreatedAt: Date
}

interface BlogListProps {
  initialPosts?: BlogPost[]
  categories?: string[]
}

export function BlogList({ initialPosts = [], categories = [] }: BlogListProps) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const fetchPosts = async (reset = false) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: reset ? "1" : page.toString(),
        limit: "12",
      })

      if (search) params.append("search", search)
      if (selectedCategory !== "all") params.append("category", selectedCategory)

      const response = await fetch(`/api/wordpress/posts?${params}`)
      const data = await response.json()

      if (data.success) {
        if (reset) {
          setPosts(data.data.posts)
          setPage(1)
        } else {
          setPosts((prev) => [...prev, ...data.data.posts])
        }
        setHasMore(data.data.pagination.hasNext)
      }
    } catch (error) {
      console.error("Error fetching posts:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    setPage(1)
    fetchPosts(true)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setPage(1)
    fetchPosts(true)
  }

  const loadMore = () => {
    setPage((prev) => prev + 1)
    fetchPosts()
  }

  useEffect(() => {
    if (page > 1) {
      fetchPosts()
    }
  }, [page])

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleSearch} disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Search
        </Button>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="text-center">
          <Button variant="outline" onClick={loadMore} disabled={loading} className="min-w-32 bg-transparent">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Load More
          </Button>
        </div>
      )}

      {posts.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No posts found.</p>
        </div>
      )}
    </div>
  )
}
