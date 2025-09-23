import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import modelPath from '@/public/flower.glb'

function Model(props) {
  const gltf = useGLTF(modelPath)
  return <primitive {...props} object={gltf.scene} />
}

export default function App() {
  return (
    <Canvas camera={{ position: [1, 0.001, 0.001] }}>
      <ambientLight />
       <Suspense>
        <Model />
      </Suspense>
    </Canvas>
  )
}

