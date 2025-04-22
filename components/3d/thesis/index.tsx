'use client'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import {
  OrbitControls,
  useHelper,
  Html
} from '@react-three/drei'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

function Model({ url }) {
  const gltf = useLoader(GLTFLoader, url, (loader) => {
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/draco/')
    loader.setDRACOLoader(dracoLoader)
  })

  useEffect(() => {
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [gltf])

  return (
    <group position={[-5, 0, 20]} rotation={[0, Math.PI / 4, 0]}>
      <primitive object={gltf.scene} />
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

export default function Thesis3d() {
  const [showModel, setShowModel] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setShowModel(true), 500) // Lazy load model
    return () => clearTimeout(timeout)
  }, [])

  return (
    <Canvas
      shadows
      camera={{ position: [0, 5, 15], fov: 1000 }}
      style={{ height: '100vh', width: '100vw' }}
      className="bg-white"
    >
      <Lights />
      <GroundPlane />
      <axesHelper args={[10]} />
      <OrbitControls />

      {showModel && (
        <Suspense
          fallback={
            <Html center>
              <div style={{ color: 'black' }}>Loading model...</div>
            </Html>
          }
        >
          <Model url="/3d/thesis/thesis.glb" />
        </Suspense>
      )}
    </Canvas>
  )
}
