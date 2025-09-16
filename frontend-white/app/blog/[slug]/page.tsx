import { notFound } from "next/navigation"
import { getPostBySlug, getAllSlugs } from "@/lib/wordpress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

interface BlogPostPageProps {
  params: { slug: string }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/blog">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </Link>

        {post.featuredImage && (
          <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
            <Image
              src={post.featuredImage.node.sourceUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <header className="mb-8">
          <div className="text-sm text-muted-foreground mb-4">{formattedDate}</div>
          <h1 className="text-4xl font-bold mb-4 text-balance">{post.title}</h1>
          <div className="flex flex-wrap gap-2">
            {post.categories.nodes.map((category: { name: string }) => (
              <Badge key={category.name} variant="default">
                {category.name}
              </Badge>
            ))}
            {post.tags.nodes.map((tag: { name: string }) => (
              <Badge key={tag.name} variant="outline">
                #{tag.name}
              </Badge>
            ))}
          </div>
        </header>

        <article
          className="prose prose-lg max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map(({ slug }) => ({ slug }))
}
