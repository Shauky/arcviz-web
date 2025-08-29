import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    const profile = await prisma.userProfile.upsert({
      where: { userId: session.user.id },
      update: {
        bio: body.bio,
        location: body.location,
        website: body.website,
        linkedin: body.linkedin,
        github: body.github,
        skills: body.skills,
        experience: body.experience,
        salary: body.salary,
        availability: body.availability,
      },
      create: {
        userId: session.user.id,
        bio: body.bio,
        location: body.location,
        website: body.website,
        linkedin: body.linkedin,
        github: body.github,
        skills: body.skills,
        experience: body.experience,
        salary: body.salary,
        availability: body.availability,
      },
    })

    return NextResponse.json({ success: true, profile })
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
