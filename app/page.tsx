import { prisma } from "@/lib/prisma"
import { JobCard } from "@/components/jobs/job-card"
import { ContactForm } from "@/components/forms/contact-form"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Briefcase, Users, Building, TrendingUp } from "lucide-react"
import Link from "next/link"
import Image from  "next/image"
import { CompanyHeader } from "@/components/layout/company-header"

export default async function HomePage() {
  return (
    <div className="min-h-screen bg-background w-2/3 ml-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="align-center w-full p-5 ml-20">
            <Image src="/avatargroup.png" alt="avatargroup" width={20} height={20} className="ml-44 w-1/5 max-w-vw max-sm align-center justify-center"/>
            </div>
            <Badge className="mb-4">
             <TrendingUp className="mr-2 h-4 w-4" />
                 Our impressions increased by 10 new projects <br></br>
                 reaching 1000 new customers and vendors, since your last visit
            </Badge>

            <h1 className="text-4xl md:text-2xl font-bold text-balance">
                We are a dedicated team of Interior designers, 3D artisans and architects <span className="text-primary">. </span> Building the future today.
            </h1>

            <p className="text-sm text-muted-foreground text-pretty max-w-2xl mx-auto">
              Connect with an agency that shares your values and discover how your home design project can make a real impact. 
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button size="lg" asChild>
                <Link href="/jobs">
                  Stories
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/companies">Create Leads</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

    
              <ContactForm
                title="Start Your Journey"
                description="Tell us about your project and we'll connect you to our amazing team."
              />
            </div>
  )
}
