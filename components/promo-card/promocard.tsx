import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'
import { Briefcase, Megaphone } from "lucide-react"

// It's a good practice to define types for props for reusability and clarity.
// This defines the shape of a single job object.
interface Job {
    title:string;
    slug: string;
    description: string | null;
    requirements: string;
    benefits: string;
    salary: string;
    location: string;
    featured: boolean;
    company: string;
    // Media
    images: string; // Array of image URLs
}

// Props for the PromoCard component.
interface PromoCardProps {
    job: Job;
    totalApplications: number;
}

// The component is no longer async, as it receives all data via props.
// This makes it a "dumb" presentational component, which is more reusable and performant.
export default function PromoCard({ job, totalApplications }: PromoCardProps) {
    return (
        <>{/* Company promo section card  */}
            <section className="px-4 bg-slate-100" >
                <div className="container mx-auto min-w-100">
                    <div className="grid grid-cols-1 space-x-0 -mr-30 mb-10 mt-5 overflow-y-hidden -ml-10">
                        <Card className="text-center bg-white w-3/4 shadow prose prose-lg hover:shadow-lg mb-4">
                            <CardContent className="p-0 my-auto -mt-5">
                                <div className="flex items-center justify-center mx-auto p-2 mb-4">
                                    {/* Use the first image from the images array, with a fallback. */}
                                  <Image src={job.images? job.images:"/avatargroup.png"} alt={job.title || "Company Logo"} width={90} height={100} className="hover:w-96 w-94 align-center justify-center" />
                                </div>
                                <div className="text-sm justify-around text-muted-foreground">
                                    {/* Provide fallback content for potentially null values. */}
                                    <span className="p-1 mr-2 text-xs bg-background items-center rounded-xl border-1"> {job.title || "Job Title"}</span>
                                    <span className="text-xs font-semibold text-primary">{totalApplications.toLocaleString()} Successful Connections
                                    </span>
                                    <div>
                                        <span className="ml-50"> <h1 className="ml-10 text-left mb-5 text-sm snap-align-none font-semibold"> {job.description || "No description available."} </h1></span>
                                    </div>
                                    <div className="flex flex-row">
                                        <Briefcase className="h-5 ml-10 w-4 text-primary-foreground" />
                                        <span className="ml-6"> {job.company}</span>
                                         <Megaphone className="h-5 ml-2 w-4 text-primary-foreground" />
                                         <span className="ml-2"> 10</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                    </div>
                </div>
            </section>
            {/* end promos */}
        </>
    )
}