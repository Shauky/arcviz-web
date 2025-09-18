'use client';
import Image from 'next/image';
import { Button } from "@/components/ui/button"
import dynamic from 'next/dynamic';
import Spline from '@splinetool/react-spline/next';

const ThreeViewer = dynamic(
  async () => import('@/components/ThreeViewerComponent'),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-20 overflow-hidden">
   <iframe src='https://my.spline.design/retrofuturismbganimation-EqmLiwtdN9Ap8k38LUZYnJs8/' frameBorder='0' width='300%' height='600px'></iframe>


      <div className="flex flex-row max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed z-0 p-10 space-x-1 gap-8 top-0 -mt-20 bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
           <div>  <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/arcvizsmall.png"
              alt="Arcviz Logo"
              className="dark:invert"
              width={54}
              height={24}
              priority
            />
          </a>
          <p className="font-semibold"> Arcviz</p></div>
          <p>WE ARE ARCHITECTS & INTERIOR VISUAL DESIGNERS, 
          CREATING TIMELESS WORK IN ARCHITECTURE, 3D DESIGN, INTERIOR AND EXTERIOR RENDERS & THE WEB. Watch this space as we create a new experience in the Maldives soon,&nbsp; </p>
          <br></br>
        
        </div>
      </div>
     
      <br>
      </br>

      <Button> Contact Us </Button>
      
    </main>
  );
}


