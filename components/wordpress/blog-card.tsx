import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

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

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const cleanExcerpt = post.excerpt
    ?.replace(/<[^>]*>/g, "")
    ?.replace(/&[^;]+;/g, " ")
    ?.trim()

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block p-4 border rounded-lg hover:shadow-lg transition-shadow duration-200"
    >
      {post.featuredImage && (
        <div className="relative aspect-video overflow-hidden rounded-md mb-4">
          <Image
            src={post.featuredImage.node.sourceUrl}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>
      )}
      <div className="text-sm text-muted-foreground mb-2">{formattedDate}</div>
      <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">{post.title}</h3>
      {cleanExcerpt && <p className="text-muted-foreground line-clamp-3 mt-2">{cleanExcerpt}</p>}
      <div className="flex flex-wrap gap-2 mt-4">
        {post.categories.nodes.map((category) => (
          <Badge key={category.name} variant="secondary" className="text-xs">
            {category.name}
          </Badge>
        ))}
      </div>
    </Link>
  )
}
