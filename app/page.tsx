'use client'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Briefcase, Users, Building, TrendingUp } from "lucide-react"
import Link from "next/link"
import Image from  "next/image"
import { useEffect, useRef } from "react"
import {  motion, animate,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame} from "framer-motion"
import { userAgent } from "next/server"

type CardType = {
  id: number;
  slug: string;
  title: string;
  description: string;
  images: string[];
}

const projects: CardType[] = [
    { id: 12,
    slug: "digital walkthrough",
    title: "Digital Walkthrough",
    description: " a truly digital walkthrough experience",
    images: [
      "/image1.jpg", "/image2.jpg"
    ]
  }, {id: 1,
    slug: "Hiya Apartments",
    title: "Prefab Interiors",
    description: "A truly digital walkthrough",
    images: [
       "/image1.jpg", "/image2.jpg"
    ]
  },
  {id: 6,
    slug: "Hiya Fari Bay ",
    title: "Prefab Interiors",
    description: "Never a dull scene",
    images: [
       "/image1.jpg", "/image2.jpg"
    ]
  },
  {id: 7,
    slug: "Hiya Norm Bay ",
    title: "Prefab Interiors",
    description: "Coming together to Hiuya",
    images: [
       "/image1.jpg", "/image2.jpg"
    ]
  },
]

const Card = ({card}: {card: CardType}) => {
  return (
    <div className="flex-shrink-0 w-[300px] p-4 -ml-10">
      <section key={card.id}> 
        <small className="p-0 text-gray-400">{card.slug}</small><br />
        <small className="p-0 text-xs">{card.description}</small>
        {/* refactor for random image */}
        <div className="w-100 overflow-hidden"> 
        <Image
          src={card.images[0]}
          alt="image"
          width={500}
          height={200}
          className="object-cover hover:scale-110 transition-transform duration-200"
        />
        </div>
      </section>
    </div>
  )
}

interface ParallaxProps {
  children: [];
}


function ParallaxImages({ children}: ParallaxProps) {
        const containerRef = useRef(null)
        const {scrollYProgress} = useScroll({
          target:containerRef,
          offset: ['start end', 'end start']
        })

        const x = useTransform(scrollYProgress, [0 , 1], [400, -2000])

        useEffect(()=>{
          let controls;
          let finalPosition = -innerWidth / 2 - 8;

          controls = animate(x, [0, finalPosition], {
            ease: 'linear',
            duration: 25,
            repeat: Infinity,
            repeatType: 'loop',
            repeatDelay: 0,
          })
          return controls.stop
        }, [x, innerWidth])


        return (
          <div ref={containerRef} className="parallax"  style={{ scrollBehavior: 'smooth' }}>
            <motion.div className="scroller flex flex-row" style={{ x }}>
              <span> {children} </span>
              <span> {children} </span>
            </motion.div>
          </div>
   );
}

export default function HomePage() {
  
 return (
    <div className="min-h-screen h-[300vh] bg-background">
       {/* Hero Section */}
    <div  className="w-full top-0">
      <div className="mt-64 items-center space-between">
        <div className="w-full snap-x snap-mandatory"
        >
           <ParallaxImages>
            <div className="flex flex-row animate-scroll">
            {/* array through all project objects */}
              {[...projects].map((project) => (
           <Card key={project.id} card={project}/> 
                ))}, {[...projects].map((project) => (
           <Card key={project.id} card={project}/> 
                ))}
            </div> 
          </ParallaxImages>
         </div>
        </div>
       </div>
       
      {/* Corporate Section */}
    <section className="w-full relative bg-white from-primary/5 via-background to-accent/5 p-20">
      <div className="sticky top-0 p-20 items-center ml-90 text-xl font-semibold bg-white"> We've got you Covered </div>
        <div className="container mx-auto max-w-6xl text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="align-center w-full p-5">
            <Image
              src="/avatargroup.png"
              alt="avatargroup"
              width={20}
              height={20}
              className="ml-72 w-1/5 max-w-full max-sm:mx-auto"
            />
            </div>
            
            <Badge className="mb-4">
             <TrendingUp className="mr-2 h-4 w-4" />
                 Working on 10 new projects <br></br>impacting 1025 customers and vendors, since your last visit
            </Badge>

            <h1 className="text-4xl md:text-2xl font-bold text-balance">
             We are a dedicated team of Interior designers, 3D artisans and architects<span className="text-primary">. </span> 
            </h1>

            <p className="text-sm text-muted-foreground text-pretty max-w-2xl mx-auto">
              We're building a better future today. Connect with an agency that shares your values and discover how your project can make a real impact. 
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">

              <Button size="lg" asChild>
                <Link href="/jobs">
                  Stories
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>

              <Button variant="outline" size="lg" asChild>
                <Link href="/companies">Projects</Link>
              </Button>

            </div>
          </div>
             <br></br>
             
        </div>
      </section>
    
      <div className="flex flex-row w-[1500px] space-between justify-between min-w-screen">
         {/* <section className="p-10"><ContactForm
            title="Start Your Journey"
            description="Tell us about your project and we'll connect you to our amazing team."
          /></section> */}     
        <br></br>
        <div> next details </div>
        </div>
    </div>
  )
}
