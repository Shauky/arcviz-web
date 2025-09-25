import React, { Suspense, useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, useHelper } from '@react-three/drei'
import * as THREE from 'three'
// Use the correct path for the GLTF file (adjust as needed)
import modelPath from '@/public/flower.glb'

function Model(props) {
  const { scene } = useGLTF(modelPath)
  const ref = useRef()
  const { camera } = useThree()

  // Compute bounding box and center the camera
  useEffect(() => {
    // Calculate the bounding box of the model
    const box = new THREE.Box3().setFromObject(scene)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    
    // Estimate distance based on the model's size and camera FOV
    const maxDim = Math.max(size.x, size.y, size.z)
    const fov = camera.fov * (Math.PI / 180) // Convert FOV to radians
    const distance = maxDim / (2 * Math.tan(fov / 2)) * 1.5 // Adjust multiplier for padding
    
    // Set camera position (e.g., along z-axis) and look at the model's center
    camera.position.set(center.x, center.y, center.z + distance)
    camera.lookAt(center)
    camera.updateProjectionMatrix()
  }, [scene, camera])

  // Animation
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime()
      ref.current.rotation.y = t / 2
      ref.current.rotation.x = t / 4
      ref.current.rotation.z = t / 5
      ref.current.position.y = (1 + Math.sin(t / 2)) / 2
    }
  })
  return <primitive object={scene} ref={ref} dispose={null} />
}

export default function App() {
  return (
    <Canvas camera={{ position: [0.00001, 0.01, 0.01] }}>
      <ambientLight intensity={0.01} />
      <directionalLight position={[10, 10, 5]} intensity={5} />
      <Suspense fallback={<mesh><boxGeometry /><meshStandardMaterial color="gray" /></mesh>}>
        <Model />
      </Suspense>
    </Canvas>
  )
}