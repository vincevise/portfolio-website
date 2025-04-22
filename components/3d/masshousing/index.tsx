'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import * as dat from 'lil-gui';

const MassHousingScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // const gui = new dat.GUI();
    const scene = new THREE.Scene();


    const gltfLoader = new GLTFLoader();

    const setShadowProperties = (object: THREE.Object3D) => {
      if ((object as THREE.Mesh).isMesh) {
        (object as THREE.Mesh).castShadow = true;
        (object as THREE.Mesh).receiveShadow = true;
      }
      object.children.forEach(setShadowProperties);
    };

    const createLOD = (model: THREE.Object3D) => {
      const lod = new THREE.LOD();
      lod.addLevel(model, 0);
      lod.addLevel(model.clone().scale.set(0.5, 0.5, 0.5), 50);
      lod.addLevel(model.clone().scale.set(0.1, 0.1, 0.1), 100);
      return lod;
    };

    const loadModel = (path: string, position: THREE.Vector3) => {
      gltfLoader.load(path, (gltf) => {
        gltf.scene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            // const edges = new THREE.EdgesGeometry(mesh.geometry);
            // const edgesMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
            // const lines = new THREE.LineSegments(edges, edgesMaterial);
            // mesh.add(lines);
          }
        });

        gltf.scene.children.forEach(setShadowProperties);

        const lod = createLOD(gltf.scene);
        lod.position.copy(position);
        lod.scale.set(0.001, 0.001, 0.001);
        scene.add(lod);
      });
    };

    loadModel('/3d/masshousing/masshousing.gltf', new THREE.Vector3(-10, 0, 5));

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(50, 50),
      new THREE.MeshStandardMaterial({
        color: '#ffffff',
        metalness: 0,
        roughness: 0.5,
      })
    );
    floor.receiveShadow = true;
    floor.rotation.x = -Math.PI * 0.5;
    floor.position.set(0, -0.01, 0);
    scene.add(floor);

    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.set(1024, 1024);
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -7;
    directionalLight.shadow.camera.right = 7;
    directionalLight.shadow.camera.top = 7;
    directionalLight.shadow.camera.bottom = -7;
    directionalLight.shadow.bias = -0.001;
    directionalLight.position.set(10, 20, 10);
    scene.add(directionalLight);

    scene.traverse((object) => {
      if ((object as THREE.Mesh).isMesh) {
        object.frustumCulled = true;
      }
    });

    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 200);
    camera.position.set(5.2929, 8.481, 18.284);
    camera.lookAt(new THREE.Vector3(0.00377, -0.00845, -0.99995));
    scene.add(camera);

    const controls = new OrbitControls(camera, canvasRef.current);
    controls.target.set(0, 1, 0);
    controls.enableDamping = true;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);

    window.addEventListener('resize', () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    const clock = new THREE.Clock();
    let previousTime = 0;

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();
      previousTime = elapsedTime;
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    };

    tick();
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full  threejs-canvas " />;
};

export default MassHousingScene;
