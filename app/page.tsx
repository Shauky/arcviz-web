import { prisma } from "@/lib/prisma"
import { Header } from "@/components/layout/header"
import { JobCard } from "@/components/jobs/job-card"
import { ContactForm } from "@/components/forms/contact-form"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Briefcase, Users, Building, TrendingUp } from "lucide-react"
import Link from "next/link"

export default async function HomePage() {
  // Fetch featured jobs and stats
  const [featuredJobs, jobStats, companies] = await Promise.all([
    prisma.jobPosting.findMany({
      where: {
        status: "ACTIVE",
        featured: true,
      },
      include: {
        company: true,
        createdBy: true,
        _count: {
          select: { applications: true },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
    prisma.jobPosting.aggregate({
      where: { status: "ACTIVE" },
      _count: true,
    }),
    prisma.company.count(),
  ])

  const totalApplications = await prisma.jobApplication.count()

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <Badge className="mb-4">
              <TrendingUp className="mr-2 h-4 w-4" />
              Scouting increased by approximately 10 times
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold text-balance">
              Find your next <span className="text-primary">opportunity</span> with purpose
            </h1>

            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Connect with companies that share your values and discover roles where you can make a real impact. Join
              thousands of professionals finding meaningful work.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button size="lg" asChild>
                <Link href="/jobs">
                  Explore Opportunities
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/companies">Browse Companies</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 border-b">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-4">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary">{jobStats._count.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Active Job Opportunities</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mx-auto mb-4">
                  <Building className="h-6 w-6 text-accent" />
                </div>
                <div className="text-3xl font-bold text-accent">{companies.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Partner Companies</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary">{totalApplications.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Successful Connections</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Opportunities</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover hand-picked opportunities from companies that are making a difference
            </p>
          </div>

          {featuredJobs.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {featuredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>

              <div className="text-center">
                <Button variant="outline" size="lg" asChild>
                  <Link href="/jobs">
                    View All Opportunities
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No featured jobs yet</h3>
                <p className="text-muted-foreground mb-6">
                  Check back soon for exciting opportunities from our partner companies.
                </p>
                <Button asChild>
                  <Link href="/jobs">Browse All Jobs</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to find your next role?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of professionals who have found meaningful work through our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/auth/signup">Get Started Today</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/companies">For Employers</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Lead Capture Section with Contact Form */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-balance">
                Let's discuss your <span className="text-primary">career goals</span>
              </h2>
              <p className="text-xl text-muted-foreground text-pretty">
                Whether you're actively looking for new opportunities or just exploring what's out there, our team is
                here to help you navigate your career journey.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Personalized career guidance</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Access to exclusive opportunities</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Direct connection with hiring managers</span>
                </div>
              </div>
            </div>
            <div>
              <ContactForm
                title="Start Your Journey"
                description="Tell us about your career aspirations and we'll help you find the perfect match."
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
