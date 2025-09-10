import { prisma } from "@/lib/prisma"
import { JobCard } from "@/components/jobs/job-card"
import { ContactForm } from "@/components/forms/contact-form"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Briefcase, Users, Building, TrendingUp, Megaphone } from "lucide-react"
import Link from "next/link"
import Image from  "next/image"
import { CompanyHeader } from "@/components/layout/company-header"
import OnboardingPage from "../onboarding/page"
import PromoCard from "@/components/promo-card/promocard"

export default async function HomePage() {

const data = {
      name: {
        arc: 'arcviz',
        id: 'identity'
      },
      job: {
        title: 'Programmers',
        description: 'We are looking for dynamic people who can do magic on the keyboard',
        slug: 'no job too big' ,
        requirements: "fast on keyboard",
        benefits: "everything you can dream of",
        salary: "2000",
        location: "remote" ,
        featured: true,
        company: "identity",
        // Media
        images: "/keysplash.png",      
        // Array of image URLs
      },
      job2: {
        title: 'Designers',
        description: 'We can help you achieve interior design and 3D mastery. Looking for Interns',
        slug: 'no job too big' ,
        requirements: "fast on keyboard",
        benefits: "everything you can dream of",
        salary: "2000",
        location: "remote" ,
        featured: true,
        company: "arcviz",
        // Media
        images: "/pensplash.png",      // Array of image URLs
      }
  }

    // Fetch featured jobs and stats
    // const [featuredJobs, jobStats, companies] = await Promise.all([
    // prisma.jobPosting.findMany({
    //     where: {
    //     status: "ACTIVE",
    //     featured: true,
    //     },
    //     include: {
    //     company: true,
    //     createdBy: true,
    //     _count: {
    //         select: { applications: true },
    //     },
    //     },
    //     orderBy: { createdAt: "desc" },
    //     take: 6,
    // }),
    // prisma.jobPosting.aggregate({
    //     where: { status: "ACTIVE" },
    //     _count: true,
    // }),
    // prisma.company.count(),
    // ])
    

  //total job application count, this can be changes into a component later on
  // const totalApplications = await prisma.jobApplication.count() | 20

  return (
    <div className="min-h-screen bg-background">
       <div className="flex flex-row space-between justify-between w-full">
        
       <div className="container mx-auto max-w-6xl text-center">
          <div className=" mx-auto space-y-6">
            <div className="align-center w-full p-20">
            <Image src="/avatargroup.png" alt="avatargroup" width={100} height={20} className="mx-auto max-w-vw" sizes="(min-width:1024px) 20vw, 50vw" priority/>
            </div>

            {/* story card section */}

            <h3 className="text-sm font-semibold">Have a new design project? Let's work together.</h3>
            <Badge className="mb-4">
             <TrendingUp className="mr-2 h-4 w-4" />
             Manage projects <span className="text-primary">  more efficiently </span>
            </Badge>

  
            <p className="text-sm text-muted-foreground text-pretty max-w-2xl mx-auto">
              Begin projects, hire, and set work roles to make a real impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button size="lg" asChild>
                  <Link href="/jobs">
                    New Project
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/companies"> Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
    </div>
  </div>
  )
}