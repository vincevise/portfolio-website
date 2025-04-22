'use client'

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

type Props = {
    width?: number;
    height?:number
}

const SafakatHouseScene = ({
    width,
    height
}:Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Canvas
    const canvas = canvasRef.current;
    
    // Add origin axis
    const axisHelper = new THREE.AxesHelper(5);
    scene.add(axisHelper);
    
    // Sizes
    const sizes = {
      width: width ? width : window.innerWidth,
      height: height ? height : window.innerHeight
    };
    
    // Camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 200);
    camera.position.set(0, 0, 22);
    
    function setCameraDirection(camera: THREE.PerspectiveCamera, target: THREE.Vector3) {
      camera.lookAt(target);
    }
    
    // Set camera to look at the target
    setCameraDirection(camera, new THREE.Vector3(0, 6, 20));
    scene.add(camera);
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true
    });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    
    // Controls
    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 1, 0);
    controls.enableDamping = true;
    
    controls.addEventListener('change', () => {
      const direction = new THREE.Vector3();
      camera.getWorldDirection(direction);
      console.log(`Camera position: x=${camera.position.x}, y=${camera.position.y}, z=${camera.position.z}`);
      console.log(`Camera direction: x=${direction.x}, y=${direction.y}, z=${direction.z}`);
    });
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.set(2048, 2048);
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -7;
    directionalLight.shadow.camera.right = 7;
    directionalLight.shadow.camera.top = 7;
    directionalLight.shadow.camera.bottom = -7;
    directionalLight.position.set(10, 20, 10);
    directionalLight.shadowCameraLeft = -3000;
    directionalLight.shadow.bias = -0.001;
    scene.add(directionalLight);
    
    // Floor
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(50, 50),
      new THREE.MeshStandardMaterial({
        color: '#ffffff',
        metalness: 0,
        roughness: 0.5
      })
    );
    floor.receiveShadow = true;
    floor.rotation.x = -Math.PI * 0.5;
    floor.position.set(0, -5, 0);
    scene.add(floor);
    
    // Helper functions
    function setShadowProperties(object: THREE.Object3D) {
      if ((object as THREE.Mesh).isMesh) {
        (object as THREE.Mesh).castShadow = true;
        (object as THREE.Mesh).receiveShadow = true;
      }
      
      if (object.children && object.children.length > 0) {
        for (const child of object.children) {
          setShadowProperties(child);
        }
      }
    }
    
    function loadModel(path: string, position: THREE.Vector3) {
      const gltfLoader = new GLTFLoader();
      
      gltfLoader.load(
        path,
        (gltf) => {
          gltf.scene.traverse(child => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              mesh.castShadow = true;
              mesh.receiveShadow = true;
              mesh.material.side = THREE.DoubleSide;
              
              // Create edges geometry and line segments
              const edges = new THREE.EdgesGeometry(mesh.geometry);
              const edgesMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
              const lines = new THREE.LineSegments(edges, edgesMaterial);
              mesh.add(lines);
            }
          });
          
          gltf.scene.children.forEach(child => {
            setShadowProperties(child);
          });
          
          gltf.scene.position.copy(position);
          scene.add(gltf.scene);
        }
      );
    }
    
    // Load model
    loadModel('/3d/safakat/safakathouse2.gltf', new THREE.Vector3(-3.2, -5, 22));
    
    // Resize handler
    const handleResize = () => {
      // Update sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      
      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      
      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation
    const clock = new THREE.Clock();
    let previousTime = 0;
    let mixer: THREE.AnimationMixer | null = null;
    
    const tick = () => {
      const elapsedTime = clock.getElapsedTime();
      const deltaTime = elapsedTime - previousTime;
      previousTime = elapsedTime;
      
      if (mixer) {
        mixer.update(deltaTime);
      }
      
      // Update controls
      controls.update();
      
      // Render
      renderer.render(scene, camera);
      
      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };
    
    tick();
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      // Dispose of resources
      scene.clear();
      renderer.dispose();
      controls.dispose();
    };
  }, []);
  
  return <canvas ref={canvasRef} className="threejs-canvas w-full h-full " />;
};

export default SafakatHouseScene;