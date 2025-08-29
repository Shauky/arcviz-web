import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

interface BlogPostPageProps {
  params: { slug: string }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await prisma.wordPressPost.findUnique({
    where: {
      slug: params.slug,
      status: "publish",
    },
  })

  if (!post) {
    notFound()
  }

  const formattedDate = new Date(post.wpCreatedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link href="/blog">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </Link>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
            <Image
              src={post.featuredImage || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Post Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Calendar className="h-4 w-4" />
            <span>{formattedDate}</span>
          </div>

          <h1 className="text-4xl font-bold mb-4 text-balance">{post.title}</h1>

          {post.excerpt && (
            <p className="text-xl text-muted-foreground mb-6 text-pretty">
              {post.excerpt
                .replace(/<[^>]*>/g, "")
                .replace(/&[^;]+;/g, " ")
                .trim()}
            </p>
          )}

          {/* Categories and Tags */}
          <div className="flex flex-wrap gap-2">
            {post.categories.map((category) => (
              <Badge key={category} variant="default">
                {category}
              </Badge>
            ))}
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                #{tag}
              </Badge>
            ))}
          </div>
        </header>

        {/* Post Content */}
        <article
          className="prose prose-lg max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const posts = await prisma.wordPressPost.findMany({
    where: { status: "publish" },
    select: { slug: true },
  })

  return posts.map((post) => ({
    slug: post.slug,
  }))
}
