import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { type LeadSource, LeadStatus } from "@prisma/client"

export async function GET(request: NextRequest) {
  try {
    // let session = await getServerSession(authOptions)
    // if (!session || session.user.role !== "ADMIN") {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    // }

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const status = searchParams.get("status")
    const source = searchParams.get("source")
    const search = searchParams.get("search")

    const where: any = {}
    if (status) where.status = status
    if (source) where.source = source
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { phone: { contains: search, mode: "insensitive" } },
      ]
    }

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        include: {
          company: true,
          jobPosting: true,
          interactions: {
            orderBy: { createdAt: "desc" },
            take: 3,
          },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.lead.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: {
        leads,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
    })
  } catch (error) {
    console.error("Error fetching leads:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, message, source = "WEBSITE", jobPostingId } = body

    // Validate required fields
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Check if lead already exists
    const existingLead = await prisma.lead.findFirst({
      where: { email },
    })

    if (existingLead) {
      // Update existing lead with new information
      const updatedLead = await prisma.lead.update({
        where: { id: existingLead.id },
        data: {
          name: name || existingLead.name,
          phone: phone || existingLead.phone,
          jobPostingId: jobPostingId || existingLead.jobPostingId,
          metadata: {
            ...((existingLead.metadata as any) || {}),
            lastContact: new Date(),
            message,
          },
        },
      })

      // Add interaction if message provided
      if (message) {
        await prisma.leadInteraction.create({
          data: {
            leadId: updatedLead.id,
            type: "NOTE",
            content: message,
          },
        })
      }

      return NextResponse.json({
        success: true,
        data: updatedLead,
        message: "Lead updated successfully",
      })
    }

    // Create new lead
    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        source: source as LeadSource,
        status: LeadStatus.NEW,
        jobPostingId,
        metadata: {
          company,
          message,
          createdFrom: "contact_form",
        },
      },
    })

    // Add initial interaction if message provided
    if (message) {
      await prisma.leadInteraction.create({
        data: {
          leadId: lead.id,
          type: "NOTE",
          content: message,
        },
      })
    }

    return NextResponse.json({
      success: true,
      data: lead,
      message: "Lead captured successfully",
    })
  } catch (error) {
    console.error("Error creating lead:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
