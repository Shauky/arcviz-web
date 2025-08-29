import type { User, Company, JobPosting, Lead, UserProfile } from "@prisma/client"

// Extended types for better TypeScript support
export type UserWithProfile = User & {
  profile: UserProfile | null
  company: Company | null
}

export type JobPostingWithCompany = JobPosting & {
  company: Company
  createdBy: User
  _count: {
    applications: number
  }
}

export type LeadWithInteractions = Lead & {
  company: Company | null
  jobPosting: JobPosting | null
  interactions: {
    id: string
    type: string
    content: string | null
    createdAt: Date
  }[]
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Lead generation specific types
export interface LeadFormData {
  name: string
  email: string
  phone?: string
  company?: string
  message?: string
  source?: string
}

export interface JobSearchFilters {
  location?: string
  type?: string
  company?: string
  keywords?: string
  page?: number
  limit?: number
}

// WordPress-related types
export interface WordPressPostData {
  id: string
  wpId: number
  title: string
  slug: string
  content: string
  excerpt: string
  status: string
  type: string
  metaTitle: string | null
  metaDescription: string | null
  featuredImage: string | null
  categories: string[]
  tags: string[]
  wpCreatedAt: Date
  wpUpdatedAt: Date
  createdAt: Date
  updatedAt: Date
}

export interface BlogSearchFilters {
  search?: string
  category?: string
  tag?: string
  page?: number
  limit?: number
}

export interface WordPressSyncOptions {
  batchSize?: number
  maxPages?: number
  cleanupRemoved?: boolean
}
