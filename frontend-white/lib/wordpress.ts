import { GraphQLClient, gql } from "graphql-request"

const API_URL = process.env.WORDPRESS_API_URL!
const client = new GraphQLClient(API_URL)

export async function getAllPosts(first = 10, after = "") {
  const query = gql`
    query GetAllPosts($first: Int, $after: String) {
      posts(first: $first, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          title
          slug
          excerpt
          date
          featuredImage {
            node {
              sourceUrl
            }
          }
          categories {
            nodes {
              name
            }
          }
        }
      }
    }
  `

  const variables = {
    first,
    after,
  }

  const data: { posts: any } = await client.request(query, variables)
  return data.posts
}

export async function getPostBySlug(slug: string) {
  const query = gql`
    query GetPostBySlug($id: ID!) {
      post(id: $id, idType: SLUG) {
        id
        title
        slug
        content
        date
        featuredImage {
          node {
            sourceUrl
          }
        }
        categories {
          nodes {
            name
          }
        }
        tags {
          nodes {
            name
          }
        }
      }
    }
  `

  const variables = {
    id: slug,
  }

  const data: { post: any } = await client.request(query, variables)
  return data.post
}

export async function getAllSlugs() {
  const query = gql`
    query GetAllSlugs {
      posts(first: 10000) {
        nodes {
          slug
        }
      }
    }
  `
  const data: { posts: { nodes: any[] } } = await client.request(query)
  return data.posts.nodes
}
