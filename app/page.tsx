'use client'
import Scene from '@/components/Scene'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-20 overflow-hidden">
      <div id="canvas-container" className='w-[1024px] h-[900px]'>
        <Scene />
        <p className='text-center'> There's a lady who knows </p>
      </div>
    </main>
  );
}


