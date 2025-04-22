'use client'
import React, { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, useHelper } from '@react-three/drei'
import * as THREE from 'three'

function Model({ url }) {
  const { scene } = useGLTF(url)

  // Ensure the model reacts to light
  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
      child.material = new THREE.MeshStandardMaterial({ color: 'white' }) // optional: force light-reactive material
    }
  })

  return (
    <group position={[-5, 0, 20]} rotation={[0, Math.PI / 4, 0]}>
      <primitive object={scene} />
    </group>
  )
}

function Lights() {
  const dirLightRef = useRef()
  useHelper(dirLightRef, THREE.DirectionalLightHelper, 5, 'hotpink')

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight
        ref={dirLightRef}
        position={[10, 20, 10]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
    </>
  )
}

function GroundPlane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <shadowMaterial opacity={0.3} />
    </mesh>
  )
}

export default function ModelViewer() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 5, 15], fov: 50 }}
      style={{ height: '100vh', width: '100vw' }}
      className="bg-white"
    >
      <Suspense fallback={null}>
        <Model url="/3d/canteen/canteen_borders.gltf" />
      </Suspense>
      <Lights />
      <GroundPlane />
      <axesHelper args={[10]} />
      <OrbitControls />
    </Canvas>
  )
}
