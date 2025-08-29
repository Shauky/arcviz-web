import { WordPressSync } from "../lib/wordpress-sync"

async function main() {
  const wpBaseUrl = process.env.WORDPRESS_API_URL
  const wpApiKey = process.env.WORDPRESS_API_KEY

  if (!wpBaseUrl) {
    console.error("WORDPRESS_API_URL environment variable is required")
    process.exit(1)
  }

  console.log("Starting WordPress sync...")
  console.log("WordPress URL:", wpBaseUrl)

  const sync = new WordPressSync(wpBaseUrl, wpApiKey)

  try {
    // Sync all posts
    const syncedCount = await sync.syncAllPosts({
      batchSize: 20,
      maxPages: 50,
    })

    // Clean up removed posts
    const deletedCount = await sync.deleteRemovedPosts()

    console.log(`\n✅ Sync completed successfully!`)
    console.log(`📝 Posts synced: ${syncedCount}`)
    console.log(`🗑️  Posts deleted: ${deletedCount}`)
  } catch (error) {
    console.error("❌ Sync failed:", error)
    process.exit(1)
  }
}

main()
