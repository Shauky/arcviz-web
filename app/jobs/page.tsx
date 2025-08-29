"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { JobCard } from "@/components/jobs/job-card"
import { JobFilters } from "@/components/jobs/job-filters"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

interface Job {
  id: string
  title: string
  slug: string
  description: string
  requirements: string | null
  location: string | null
  type: string
  status: string
  featured: boolean
  images: string[]
  createdAt: string
  company: {
    id: string
    name: string
    logo: string | null
  }
  createdBy: {
    id: string
    name: string | null
  }
  _count: {
    applications: number
  }
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [totalJobs, setTotalJobs] = useState(0)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [sortBy, setSortBy] = useState("newest")
  const [filters, setFilters] = useState({})

  const fetchJobs = async (reset = false) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: reset ? "1" : page.toString(),
        limit: "12",
        sort: sortBy,
        ...filters,
      })

      const response = await fetch(`/api/jobs?${params}`)
      const data = await response.json()

      if (data.success) {
        if (reset) {
          setJobs(data.data.jobs)
          setPage(1)
        } else {
          setJobs((prev) => [...prev, ...data.data.jobs])
        }
        setTotalJobs(data.data.pagination.totalCount)
        setHasMore(data.data.pagination.hasNext)
      }
    } catch (error) {
      console.error("Error fetching jobs:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs(true)
  }, [filters, sortBy])

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters)
    setPage(1)
  }

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort)
    setPage(1)
  }

  const loadMore = () => {
    setPage((prev) => prev + 1)
    fetchJobs()
  }

  useEffect(() => {
    if (page > 1) {
      fetchJobs()
    }
  }, [page])

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <JobFilters onFiltersChange={handleFiltersChange} totalJobs={totalJobs} />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold">Job Opportunities</h1>
                <p className="text-muted-foreground">Discover your next career move</p>
              </div>

              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="featured">Featured First</SelectItem>
                  <SelectItem value="applications">Most Applied</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Jobs Grid */}
            {loading && jobs.length === 0 ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {jobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>

                {/* Load More */}
                {hasMore && (
                  <div className="text-center">
                    <Button variant="outline" onClick={loadMore} disabled={loading} className="min-w-32 bg-transparent">
                      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Load More Jobs
                    </Button>
                  </div>
                )}

                {jobs.length === 0 && !loading && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No jobs found matching your criteria.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
