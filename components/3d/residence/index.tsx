'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface ResidenceViewerProps {
  // You can add props as needed
}

const ResidenceViewer: React.FC<ResidenceViewerProps> = () => {
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

    // Function to create axis-aligned edges only
    function createAxisAlignedEdges(geometry: THREE.BufferGeometry): THREE.LineSegments {
      // Get position attribute from the geometry
      const positions = geometry.getAttribute('position');
      
      // Array to store the edges
      const axisAlignedEdges: number[] = [];
      
      // Tolerance for floating point comparison
      const EPSILON = 0.00001;
      
      // Process each triangle in the geometry
      for (let i = 0; i < positions.count; i += 3) {
        const vertices = [
          new THREE.Vector3().fromBufferAttribute(positions, i),
          new THREE.Vector3().fromBufferAttribute(positions, i + 1),
          new THREE.Vector3().fromBufferAttribute(positions, i + 2)
        ];
        
        // Check each edge of the triangle
        const edges = [
          [vertices[0], vertices[1]],
          [vertices[1], vertices[2]],
          [vertices[2], vertices[0]]
        ];
        
        for (const [v1, v2] of edges) {
          // Calculate the edge direction vector
          const dx = v2.x - v1.x;
          const dy = v2.y - v1.y;
          const dz = v2.z - v1.z;
          
          // Normalize the direction vector
          const length = Math.sqrt(dx * dx + dy * dy + dz * dz);
          
          // Check if edge is parallel to any axis
          // If two of the direction components are close to zero, the edge is parallel to an axis
          if (
            (Math.abs(dx) < EPSILON && Math.abs(dy) < EPSILON) ||
            (Math.abs(dy) < EPSILON && Math.abs(dz) < EPSILON) ||
            (Math.abs(dx) < EPSILON && Math.abs(dz) < EPSILON)
          ) {
            // Add edge vertices to our array
            axisAlignedEdges.push(
              v1.x, v1.y, v1.z,
              v2.x, v2.y, v2.z
            );
          }
        }
      }
      
      // Create a buffer geometry for the edges
      const edgesGeometry = new THREE.BufferGeometry();
      edgesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(axisAlignedEdges, 3));
      
      // Create line segments with the geometry
      const edgesMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
      return new THREE.LineSegments(edgesGeometry, edgesMaterial);
    }

    // Load 3D models
    const gltfLoader = new GLTFLoader();
    
    function loadModel(path: string, position: THREE.Vector3): void {
      gltfLoader.load(
        path,
        (gltf) => {
          gltf.scene.traverse(child => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              mesh.castShadow = true;
              mesh.receiveShadow = true;
              mesh.material.side = THREE.DoubleSide;

              // Create axis-aligned edges and add them to the mesh
              const lines = createAxisAlignedEdges(mesh.geometry);
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
    loadModel('/3d/residence/residence.gltf', new THREE.Vector3(-45, -2, 65));

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(2048, 2048)
directionalLight.shadow.camera.near = 0.1;
directionalLight.shadow.camera.far = 50;
directionalLight.shadow.camera.left = -7;
directionalLight.shadow.camera.right = 7;
directionalLight.shadow.camera.top = 7;
directionalLight.shadow.camera.bottom = -7;
directionalLight.position.set(10, 20, 10);
directionalLight.shadowCameraLeft = -3000
directionalLight.shadow.bias = -0.001;

 



// For DirectionalLight
directionalLight.shadow.bias = -0.001;
 
scene.add(directionalLight)

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

export default ResidenceViewer;