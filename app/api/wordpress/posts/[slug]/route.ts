import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const post = await prisma.wordPressPost.findUnique({
      where: {
        slug: params.slug,
        status: "publish",
      },
    })

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: post,
    })
  } catch (error) {
    console.error("Error fetching WordPress post:", error)
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 })
  }
}
