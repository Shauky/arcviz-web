import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Math.min(Number.parseInt(searchParams.get("limit") || "10"), 50)
    const search = searchParams.get("search")
    const category = searchParams.get("category")
    const tag = searchParams.get("tag")

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {
      status: "publish",
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { content: { contains: search, mode: "insensitive" } },
        { excerpt: { contains: search, mode: "insensitive" } },
      ]
    }

    if (category) {
      where.categories = {
        has: category,
      }
    }

    if (tag) {
      where.tags = {
        has: tag,
      }
    }

    // Get posts and total count
    const [posts, totalCount] = await Promise.all([
      prisma.wordPressPost.findMany({
        where,
        orderBy: { wpCreatedAt: "desc" },
        skip,
        take: limit,
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
          wpUpdatedAt: true,
        },
      }),
      prisma.wordPressPost.count({ where }),
    ])

    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      success: true,
      data: {
        posts,
        pagination: {
          page,
          limit,
          totalCount,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      },
    })
  } catch (error) {
    console.error("Error fetching WordPress posts:", error)
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}
