'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

 

const CanteenViewer  = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene
    const scene = new THREE.Scene();

    // Sizes
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    // Camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 200);
    camera.position.set(-7, 22, -15);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
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
    const controls = new OrbitControls(camera, canvasRef.current);
    controls.target.set(0, 1, 0);
    controls.enableDamping = true;

    // Log camera position when orbiting
    controls.addEventListener('change', () => {
      console.log(`Camera position: x=${camera.position.x}, y=${camera.position.y}, z=${camera.position.z}`);
    });

    // Helper function to set shadow properties on objects
    function setShadowProperties(object: THREE.Object3D): void {
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

    // Load 3D models
    const gltfLoader = new GLTFLoader();
    
    function loadModel(path: string, position: THREE.Vector3): void {
      gltfLoader.load(
        path,
        (gltf) => {
          gltf.scene.traverse(child => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh:any = child as THREE.Mesh;
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

    // Load models - adjust paths for Next.js public folder structure
    loadModel('/3d/canteen/canteen_borders.gltf', new THREE.Vector3(-15, 0, 15));
    loadModel('/3d/canteen/canteen_borders2.glb', new THREE.Vector3(-15, 0, 15));

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
    floor.position.set(0, -0.01, 0);
    scene.add(floor);

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
    directionalLight.shadow.bias = -0.001;
    scene.add(directionalLight);

    // Handle window resize
    const handleResize = (): void => {
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

    const animate = (): void => {
      const elapsedTime = clock.getElapsedTime();
      const deltaTime = elapsedTime - previousTime;
      previousTime = elapsedTime;

      // Update controls
      controls.update();

      // Render
      renderer.render(scene, camera);

      // Call animate again on the next frame
      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      // Dispose of resources
      renderer.dispose();
      controls.dispose();
    };
  }, []); // Empty dependency array ensures this runs once when component mounts

  return (
    <canvas ref={canvasRef} className="w-full h-full threejs-canvas" />
  );
};

export default CanteenViewer;