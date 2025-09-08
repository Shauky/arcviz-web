"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Mail, Phone, Building, Calendar } from "lucide-react"
import type { LeadWithInteractions } from "@/lib/types"

const statusColors = {
  NEW: "bg-blue-100 text-blue-800",
  CONTACTED: "bg-yellow-100 text-yellow-800",
  QUALIFIED: "bg-green-100 text-green-800",
  PROPOSAL: "bg-purple-100 text-purple-800",
  NEGOTIATION: "bg-orange-100 text-orange-800",
  CLOSED_WON: "bg-green-100 text-green-800",
  CLOSED_LOST: "bg-red-100 text-red-800",
}

export function LeadManagement() {
  const [leads, setLeads] = useState<LeadWithInteractions[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: "",
    status: "NEW", // Updated default value
    source: "",
    page: 1,
  })

  const fetchLeads = async () => {
    try {
      const params = new URLSearchParams()
      if (filters.search) params.append("search", filters.search)
      if (filters.status) params.append("status", filters.status)
      if (filters.source) params.append("source", filters.source)
      params.append("page", filters.page.toString())

      const response = await fetch(`/api/leads?${params}`)
      const data = await response.json()

      if (data.success) {
        setLeads(data.data.leads)
      }
    } catch (error) {
      console.error("Error fetching leads:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeads()
  }, [filters])

  const updateLeadStatus = async (leadId: string, status: string) => {
    try {
      const response = await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        fetchLeads() // Refresh the list
      }
    } catch (error) {
      console.error("Error updating lead:", error)
    }
  }

  if (loading) {
    return <div className="flex justify-center p-8">Loading leads...</div>
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Lead Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search leads..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value, page: 1 })}
                  className="pl-10"
                />
              </div>
            </div>
            <Select
              value={filters.status}
              onValueChange={(value) => setFilters({ ...filters, status: value, page: 1 })}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NEW">All Statuses</SelectItem> {/* Updated value */}
                <SelectItem value="NEW">New</SelectItem>
                <SelectItem value="CONTACTED">Contacted</SelectItem>
                <SelectItem value="QUALIFIED">Qualified</SelectItem>
                <SelectItem value="PROPOSAL">Proposal</SelectItem>
                <SelectItem value="NEGOTIATION">Negotiation</SelectItem>
                <SelectItem value="CLOSED_WON">Closed Won</SelectItem>
                <SelectItem value="CLOSED_LOST">Closed Lost</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filters.source}
              onValueChange={(value) => setFilters({ ...filters, source: value, page: 1 })}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Sources" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL_SOURCES">All Sources</SelectItem> {/* Updated value */}
                <SelectItem value="WEBSITE">Website</SelectItem>
                <SelectItem value="SOCIAL_MEDIA">Social Media</SelectItem>
                <SelectItem value="EMAIL">Email</SelectItem>
                <SelectItem value="REFERRAL">Referral</SelectItem>
                <SelectItem value="ADVERTISEMENT">Advertisement</SelectItem>
                <SelectItem value="DIRECT">Direct</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Leads List */}
      <div className="grid gap-4">
        {leads.map((lead) => (
          <Card key={lead.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg text-gray-900">{lead.name || "Anonymous Lead"}</h3>
                    <Badge className={statusColors[lead.status as keyof typeof statusColors]}>
                      {lead.status.replace("_", " ")}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Score: {lead.score}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {lead.email}
                    </div>
                    {lead.phone && (
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {lead.phone}
                      </div>
                    )}
                    {lead.company && (
                      <div className="flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        {lead.company.name}
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  {lead.interactions.length > 0 && (
                    <div className="text-sm text-gray-600">
                      <strong>Latest:</strong> {lead.interactions[0].content}
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Select value={lead.status} onValueChange={(value) => updateLeadStatus(lead.id, value)}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NEW">New</SelectItem>
                      <SelectItem value="CONTACTED">Contacted</SelectItem>
                      <SelectItem value="QUALIFIED">Qualified</SelectItem>
                      <SelectItem value="PROPOSAL">Proposal</SelectItem>
                      <SelectItem value="NEGOTIATION">Negotiation</SelectItem>
                      <SelectItem value="CLOSED_WON">Closed Won</SelectItem>
                      <SelectItem value="CLOSED_LOST">Closed Lost</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {leads.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">No leads found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
