import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Math.min(Number.parseInt(searchParams.get("limit") || "12"), 50)
    const search = searchParams.get("search")
    const location = searchParams.get("location")
    const type = searchParams.get("type")
    const sort = searchParams.get("sort") || "newest"

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {
      status: "ACTIVE",
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { company: { name: { contains: search, mode: "insensitive" } } },
      ]
    }

    if (location && location !== "") {
      if (location === "remote") {
        where.OR = [{ location: { contains: "remote", mode: "insensitive" } }, { location: null }]
      } else {
        where.location = { contains: location, mode: "insensitive" }
      }
    }

    if (type && type !== "") {
      where.type = type
    }

    // Build orderBy clause
    let orderBy: any = { createdAt: "desc" }
    switch (sort) {
      case "oldest":
        orderBy = { createdAt: "asc" }
        break
      case "featured":
        orderBy = [{ featured: "desc" }, { createdAt: "desc" }]
        break
      case "applications":
        orderBy = { applications: { _count: "desc" } }
        break
      default:
        orderBy = { createdAt: "desc" }
    }

    // Get jobs and total count
    const [jobs, totalCount] = await Promise.all([
      prisma.jobPosting.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          company: {
            select: {
              id: true,
              name: true,
              logo: true,
            },
          },
          createdBy: {
            select: {
              id: true,
              name: true,
            },
          },
          _count: {
            select: { applications: true },
          },
        },
      }),
      prisma.jobPosting.count({ where }),
    ])

    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      success: true,
      data: {
        jobs,
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
    console.error("Error fetching jobs:", error)
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 })
  }
}
