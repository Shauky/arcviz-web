import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { WordPressSync } from "@/lib/wordpress-sync"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    // Only allow admin users to trigger sync
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const wpBaseUrl = process.env.WORDPRESS_API_URL
    const wpApiKey = process.env.WORDPRESS_API_KEY

    if (!wpBaseUrl) {
      return NextResponse.json({ error: "WordPress API URL not configured" }, { status: 500 })
    }

    const body = await request.json().catch(() => ({}))
    const { batchSize = 20, maxPages = 10, cleanupRemoved = false } = body

    const sync = new WordPressSync(wpBaseUrl, wpApiKey)

    // Sync posts
    const syncedCount = await sync.syncAllPosts({ batchSize, maxPages })

    // Optionally cleanup removed posts
    let deletedCount = 0
    if (cleanupRemoved) {
      deletedCount = await sync.deleteRemovedPosts()
    }

    return NextResponse.json({
      success: true,
      syncedCount,
      deletedCount,
      message: `Synced ${syncedCount} posts${cleanupRemoved ? `, deleted ${deletedCount} removed posts` : ""}`,
    })
  } catch (error) {
    console.error("WordPress sync error:", error)
    return NextResponse.json(
      { error: "Sync failed", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
