"use client"

import { useState } from "react"
import { BlogCard } from "./blog-card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { getAllPosts } from "@/lib/wordpress"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  date: string
  featuredImage: {
    node: {
      sourceUrl: string
    }
  }
  categories: {
    nodes: {
      name: string
    }[]
  }
}

interface BlogListProps {
  initialPosts: {
    nodes: BlogPost[]
    pageInfo: {
      hasNextPage: boolean
      endCursor: string
    }
  }
}

export function BlogList({ initialPosts }: BlogListProps) {
  const [posts, setPosts] = useState(initialPosts.nodes)
  const [cursor, setCursor] = useState(initialPosts.pageInfo.endCursor)
  const [hasNextPage, setHasNextPage] = useState(
    initialPosts.pageInfo.hasNextPage
  )
  const [loading, setLoading] = useState(false)

  const loadMorePosts = async () => {
    setLoading(true)
    const newPosts = await getAllPosts(10, cursor)
    setPosts([...posts, ...newPosts.nodes])
    setCursor(newPosts.pageInfo.endCursor)
    setHasNextPage(newPosts.pageInfo.hasNextPage)
    setLoading(false)
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {hasNextPage && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={loadMorePosts}
            disabled={loading}
            className="min-w-32 bg-transparent"
          >
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
