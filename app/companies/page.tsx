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
        images: "/keysplash.png",      // Array of image URLs
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
      <span className="text-xs pl-44 container min-w-screen max-w-20 text-center ml-96 justify-center"> 
        featured companies 
        </span>
       <div className="flex flex-row ml-0 space-between justify-between min-w-screen">
    {/* promo card */}
     {/* <PromoCard job={data.job} totalApplications={totalApplications}/>
     <PromoCard job={data.job2} totalApplications={totalApplications} />
          <PromoCard job={data.job2} totalApplications={totalApplications} />
                    <PromoCard job={data.job2} totalApplications={totalApplications} />
                                        <PromoCard job={data.job2} totalApplications={totalApplications} />
 */}


      </div> 

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      </section>

     {/* Featured Jobs Section */}
     {/* <CompanyHeader company={data.name.id} /> */}

      {/* CTA Section */}

       <div className="container mt-40 mx-auto max-w-6xl text-center">
          <div className="ml-50 max-w-3xl mx-auto space-y-6">
            <div className="align-center w-full p-5 ml-50">
            <Image src="/avatargroup.png" alt="avatargroup" width={20} height={20} className="ml-44 w-1/5 max-w-vw max-sm align-center justify-center"/>
            </div>

            {/* story card section */}

            <h3 className="text-sm font-semibold"> New Agency or Company? Lets begin your story </h3>
            
            
            <Badge className="mb-4">
             <TrendingUp className="mr-2 h-4 w-4" />
                Project Scouting increased by 10 new jobs since last visit
            </Badge>

            <h1 className="text-4xl md:text-2xl font-bold text-balance">
             Manage projects <span className="text-primary">  more efficiently </span>
              </h1>

            <p className="text-sm text-muted-foreground text-pretty max-w-2xl mx-auto">
              Begin projects, hire, and set work roles to make a real impact in your projects. Delegate within a dedicated hiring platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button size="lg" asChild>
                <Link href="/jobs">
                    Explore
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/companies">Browse Leads</Link>
              </Button>
            </div>
          </div>
        </div>



      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-xl font-bold mb-4">Ready to find your next role?</h2>
          <p className="text-sm text-muted-foreground mb-8">
            Join and get vetted. Be among hundreds, <span>who have found meaningful work </span>  through our platform
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
              <h2 className="text-xl font-bold text-balance">
                Let's discuss your <span className="text-primary">career goals</span>
              </h2>
              <p className="text-sm text-muted-foreground text-pretty">
                Whether you're actively looking for new opportunities or just exploring what's out there, our team is
                here to help you navigate your career journey.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground text-sm">Personalized career guidance</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground text-sm">Access to exclusive opportunities</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground text-sm">Direct connection with hiring managers</span>
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