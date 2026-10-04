'use client';

import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ScrollControls, useScroll, Text, Environment, MeshReflectorMaterial, Float, Html } from '@react-three/drei';
import * as THREE from 'three';

const CLIENTS = [
  "Acme Corp", "Apex Global", "Aura Wellness", "BioHorizon", "Celo Labs",
  "CloudScale", "Crestline", "Elysium AI", "Equinox", "Fjord Media",
  "Genesis Bio", "Helios Tech", "Luminary", "Nexus Prime", "Nova Botanics",
  "Omni Health", "Polaris", "Solstice", "Vanguard", "Zenith Bio"
];

// Component to handle the camera movement based on scroll
function CameraPath() {
  const scroll = useScroll();

  useFrame((state) => {
    const offset = scroll.offset; // 0 to 1
    const totalSteps = CLIENTS.length - 1;

    // Calculate exactly which step we are currently looking at based on scroll
    const currentStep = offset * totalSteps;

    // The exact Y and Z coordinates of the current step
    const stepY = currentStep * 1.5;
    const stepZ = -currentStep * 1.5;

    // LOCK the camera distance: Always stay 2 units above and 10 units back
    // This perfectly prevents the zooming/crashing issue
    state.camera.position.y = stepY + 2;
    state.camera.position.z = stepZ + 10;

    // Gently sway the camera on the X axis to follow the winding stairs
    const stepX = Math.sin(currentStep * 0.5) * 3;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, stepX * 0.4, 0.1);

    // Always aim the camera slightly ahead of the current step
    state.camera.lookAt(0, stepY, stepZ - 5);
  });

  return null;
}

// Component for the stairs and 3D floating text
function FloatingStairs() {
  return (
    <group>
      {CLIENTS.map((client, i) => {
        // Restored your original winding linear staircase layout
        const xPos = Math.sin(i * 0.5) * 3;
        const yPos = i * 1.5;
        const zPos = -i * 1.5;

        return (
          <group key={i} position={[xPos, yPos, zPos]}>
            {/* The Stone Step */}
            <mesh receiveShadow castShadow position={[0, -0.5, 0]}>
              <boxGeometry args={[4, 0.4, 2]} />
              <meshStandardMaterial color="#f5f5f5" roughness={0.7} />
            </mesh>

            {/* 3D Floating Text Above the Step */}
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
              <Text
                position={[0, 1, 0]}
                fontSize={0.6}
                color="#000000"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.015}
                outlineColor="#ff69b4"
              >
                {client}
              </Text>
            </Float>
          </group>
        );
      })}
    </group>
  );
}

// The Main Ocean Environment
function SurrealOcean() {
  return (
    <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[100, 100]} />
      <MeshReflectorMaterial
        blur={[300, 100]}
        resolution={512}
        mixBlur={1}
        mixStrength={40}
        roughness={1}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#ffffff"
        metalness={0.5}
      />
    </mesh>
  );
}

// Loading Fallback Component
function Loader() {
  return (
    <Html center>
      <div className="text-black tracking-widest text-sm font-semibold">LOADING EXPERIENCE...</div>
    </Html>
  );
}

export default function Stairs3DExperience() {
  return (
    <div className="relative bg-white" style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>

      {/* Fixed HTML Header */}
      <header className="fixed top-0 left-0 w-full z-20 flex justify-between items-center px-8 py-6 text-black/90 backdrop-blur-sm border-b border-black/10">
        <h1 className="text-lg font-semibold tracking-widest uppercase">ORGANIMO</h1>
        <div className="flex gap-6 text-sm tracking-wider">
          <span className="cursor-pointer hover:text-pink-500 transition">SHOP</span>
          <span className="cursor-pointer hover:text-pink-500 transition">AFFIRM</span>
          <span className="cursor-pointer hover:text-pink-500 transition">NEWS</span>
        </div>
      </header>

      {/* 3D Canvas */}
      <Canvas shadows camera={{ position: [0, 2, 10], fov: 45 }}>
        {/* Environment & Lighting */}
        <color attach="background" args={['#ffffff']} />
        <fog attach="fog" args={['#ffffff', 5, 25]} />
        <ambientLight intensity={0.5} />
        <directionalLight castShadow position={[10, 20, 10]} intensity={2} color="#ffb6c1" />
        <pointLight position={[0, 10, 0]} intensity={2} color="#ff69b4" />

        <Suspense fallback={<Loader />}>
          {/* Increased pages to 10 (CLIENTS.length * 0.5) to ensure you have plenty of scroll room without hitting the bottom abruptly */}
          <ScrollControls pages={CLIENTS.length * 0.5} damping={0.2}>
            <CameraPath />
            <FloatingStairs />
          </ScrollControls>

          <SurrealOcean />

          <Environment preset="city" />
        </Suspense>
      </Canvas>

      {/* Scroll indicator overlay */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-black/50 text-sm tracking-widest uppercase pointer-events-none z-20">
        Scroll down to explore
      </div>
    </div>
  );
}