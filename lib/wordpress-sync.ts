import { prisma } from "./prisma"
import { WordPressClient, transformWordPressPost } from "./wordpress"

export class WordPressSync {
  private client: WordPressClient

  constructor(baseUrl: string, apiKey?: string) {
    this.client = new WordPressClient(baseUrl, apiKey)
  }

  async syncAllPosts(
    options: {
      batchSize?: number
      maxPages?: number
    } = {},
  ) {
    const { batchSize = 20, maxPages = 10 } = options
    let page = 1
    let totalSynced = 0

    console.log("Starting WordPress content sync...")

    while (page <= maxPages) {
      try {
        const response = await this.client.getPosts({
          page,
          per_page: batchSize,
          status: "publish",
        })

        if (!response.posts.length) {
          break
        }

        // Process posts in batches
        for (const wpPost of response.posts) {
          await this.syncPost(wpPost.id)
          totalSynced++
        }

        console.log(`Synced page ${page}, total posts: ${totalSynced}`)

        // Check if we've reached the last page
        if (page >= response.totalPages) {
          break
        }

        page++
      } catch (error) {
        console.error(`Error syncing page ${page}:`, error)
        break
      }
    }

    console.log(`WordPress sync completed. Total posts synced: ${totalSynced}`)
    return totalSynced
  }

  async syncPost(wpId: number) {
    try {
      const wpPost = await this.client.getPost(wpId)
      const transformedPost = transformWordPressPost(wpPost)

      await prisma.wordPressPost.upsert({
        where: { wpId },
        update: transformedPost,
        create: transformedPost,
      })

      return true
    } catch (error) {
      console.error(`Error syncing post ${wpId}:`, error)
      return false
    }
  }

  async syncPostBySlug(slug: string) {
    try {
      const wpPost = await this.client.getPostBySlug(slug)
      return this.syncPost(wpPost.id)
    } catch (error) {
      console.error(`Error syncing post by slug ${slug}:`, error)
      return false
    }
  }

  async deleteRemovedPosts() {
    try {
      // Get all WordPress post IDs from our database
      const localPosts = await prisma.wordPressPost.findMany({
        select: { wpId: true },
      })

      const localWpIds = localPosts.map((post) => post.wpId)
      const removedPosts: number[] = []

      // Check each post against WordPress API
      for (const wpId of localWpIds) {
        try {
          await this.client.getPost(wpId)
        } catch (error) {
          // If post doesn't exist in WordPress, mark for deletion
          removedPosts.push(wpId)
        }
      }

      // Delete removed posts from database
      if (removedPosts.length > 0) {
        await prisma.wordPressPost.deleteMany({
          where: {
            wpId: {
              in: removedPosts,
            },
          },
        })

        console.log(`Deleted ${removedPosts.length} removed posts`)
      }

      return removedPosts.length
    } catch (error) {
      console.error("Error cleaning up removed posts:", error)
      return 0
    }
  }
}
