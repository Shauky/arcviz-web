'use client'
import Scene from '@/components/Scene'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-20 overflow-hidden">
      <div id="canvas-container">
        <Scene />
        <p> There should be somethng here </p>
      </div>
    </main>
  );
}


