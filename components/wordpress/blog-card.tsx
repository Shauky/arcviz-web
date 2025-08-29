import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"

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

interface BlogCardProps {
  post: BlogPost
  showExcerpt?: boolean
  className?: string
}

export function BlogCard({ post, showExcerpt = true, className = "" }: BlogCardProps) {
  const formattedDate = new Date(post.wpCreatedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Clean HTML from excerpt
  const cleanExcerpt = post.excerpt
    ?.replace(/<[^>]*>/g, "")
    ?.replace(/&[^;]+;/g, " ")
    ?.trim()

  return (
    <Card className={`group hover:shadow-lg transition-shadow duration-200 ${className}`}>
      <Link href={`/blog/${post.slug}`}>
        {post.featuredImage && (
          <div className="relative aspect-video overflow-hidden rounded-t-lg">
            <Image
              src={post.featuredImage || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-200"
            />
          </div>
        )}
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Calendar className="h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
          <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">{post.title}</CardTitle>
          {showExcerpt && cleanExcerpt && <CardDescription className="line-clamp-3">{cleanExcerpt}</CardDescription>}
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-2">
            {post.categories.slice(0, 3).map((category) => (
              <Badge key={category} variant="secondary" className="text-xs">
                {category}
              </Badge>
            ))}
            {post.categories.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{post.categories.length - 3} more
              </Badge>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
