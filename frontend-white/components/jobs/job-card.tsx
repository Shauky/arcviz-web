import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Users, Clock, Heart } from "lucide-react"
import type { JobPostingWithCompany } from "@/lib/types"

interface JobCardProps {
  job: JobPostingWithCompany
  className?: string
}

export function JobCard({ job, className = "" }: JobCardProps) {
  const applicationCount = job._count?.applications || 0
  const isNew = new Date(job.createdAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000

  return (
    <Card
      className={`group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden ${className}`}
    >
      {/* Company Header Image */}
      <div className="relative h-32 bg-gradient-to-r from-primary/10 to-accent/10">
        {job.images?.[0] && (
          <Image
            src={job.images[0] || "/placeholder.svg?height=128&width=400"}
            alt={`${job.company.name} team`}
            fill
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/20" />

        {/* Company Logo */}
        <div className="absolute bottom-4 left-4">
          <Avatar className="h-12 w-12 border-2 border-background">
            <AvatarImage src={job.company.logo || ""} alt={job.company.name} />
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
              {job.company.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Badges */}
        <div className="absolute top-4 right-4 flex gap-2">
          {isNew && <Badge className="bg-accent text-accent-foreground">New</Badge>}
          {job.featured && <Badge className="bg-primary text-primary-foreground">Featured</Badge>}
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-2">
              {job.title}
            </h3>
            <p className="text-sm text-muted-foreground font-medium">{job.company.name}</p>
          </div>
          <Button variant="ghost" size="sm" className="shrink-0">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Job Details */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{job.location || "Remote"}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{job.type.replace("_", " ")}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-3">
          {job.description.replace(/<[^>]*>/g, "").substring(0, 150)}...
        </p>

        {/* Skills/Requirements */}
        {job.requirements && (
          <div className="flex flex-wrap gap-1">
            {job.requirements
              .split(",")
              .slice(0, 3)
              .map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {skill.trim()}
                </Badge>
              ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{applicationCount} applications</span>
          </div>

          <Button asChild size="sm">
            <Link href={`/jobs/${job.slug}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
