import { prisma } from "@/lib/prisma"
import { BlogList } from "@/components/wordpress/blog-list"

export default async function BlogPage() {
  // Fetch initial posts and categories
  const [posts, categoriesData] = await Promise.all([
    prisma.wordPressPost.findMany({
      where: { status: "publish" },
      orderBy: { wpCreatedAt: "desc" },
      take: 12,
      select: {
        id: true,
        wpId: true,
        title: true,
        slug: true,
        excerpt: true,
        featuredImage: true,
        categories: true,
        tags: true,
        wpCreatedAt: true,
      },
    }),
    prisma.wordPressPost.findMany({
      where: { status: "publish" },
      select: { categories: true },
    }),
  ])

  // Extract unique categories
  const allCategories = categoriesData.flatMap((post) => post.categories)
  const uniqueCategories = Array.from(new Set(allCategories)).sort()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover insights, tips, and stories from our team and community.
          </p>
        </div>

        <BlogList initialPosts={posts} categories={uniqueCategories} />
      </div>
    </div>
  )
}
