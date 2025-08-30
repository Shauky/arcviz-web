import { BlogList } from "@/components/wordpress/blog-list"
import { getAllPosts } from "@/lib/wordpress"

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <BlogList initialPosts={posts} />
      </div>
    </div>
  )
}
