"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Search, MapPin, Briefcase, Building, X } from "lucide-react"

interface JobFiltersProps {
  onFiltersChange: (filters: any) => void
  totalJobs?: number
}

export function JobFilters({ onFiltersChange, totalJobs = 0 }: JobFiltersProps) {
  const [filters, setFilters] = useState({
    search: "",
    location: "any",
    type: "any",
    company: "any",
    salary: "",
  })

  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)

    // Update active filters
    const active = Object.entries(newFilters)
      .filter(([_, v]) => v !== "")
      .map(([k, v]) => `${k}:${v}`)
    setActiveFilters(active)
  }

  const clearFilter = (filterKey: string) => {
    handleFilterChange(filterKey, "")
  }

  const clearAllFilters = () => {
    const clearedFilters = {
      search: "",
      location: "any",
      type: "any",
      company: "any",
      salary: "",
    }
    setFilters(clearedFilters)
    setActiveFilters([])
    onFiltersChange(clearedFilters)
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs, companies, or keywords..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Filter Options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            Narrow your search
            {activeFilters.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                Clear all
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Location Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location
            </label>
            <Select value={filters.location} onValueChange={(value) => handleFilterChange("location", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Any location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any location</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="new-york">New York</SelectItem>
                <SelectItem value="san-francisco">San Francisco</SelectItem>
                <SelectItem value="london">London</SelectItem>
                <SelectItem value="tokyo">Tokyo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Job Type Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Job Type
            </label>
            <Select value={filters.type} onValueChange={(value) => handleFilterChange("type", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Any type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any type</SelectItem>
                <SelectItem value="FULL_TIME">Full Time</SelectItem>
                <SelectItem value="PART_TIME">Part Time</SelectItem>
                <SelectItem value="CONTRACT">Contract</SelectItem>
                <SelectItem value="INTERNSHIP">Internship</SelectItem>
                <SelectItem value="FREELANCE">Freelance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Company Size Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Building className="h-4 w-4" />
              Company Size
            </label>
            <Select value={filters.company} onValueChange={(value) => handleFilterChange("company", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Any size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any size</SelectItem>
                <SelectItem value="startup">Startup (1-50)</SelectItem>
                <SelectItem value="medium">Medium (51-200)</SelectItem>
                <SelectItem value="large">Large (201-1000)</SelectItem>
                <SelectItem value="enterprise">Enterprise (1000+)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Active Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filter) => {
                const [key, value] = filter.split(":")
                return (
                  <Badge key={filter} variant="secondary" className="flex items-center gap-1">
                    {key}: {value}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => clearFilter(key)} />
                  </Badge>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">{totalJobs.toLocaleString()} jobs found</div>
    </div>
  )
}
