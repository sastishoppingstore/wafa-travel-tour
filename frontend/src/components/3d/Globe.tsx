'use client';

import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Float, Stars, Line, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Globe with wireframe and dots
function GlobeMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  // Create dots on sphere surface
  const dotPositions = useMemo(() => {
    const positions = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      const phi = Math.acos(-1 + (2 * i) / 3000);
      const theta = Math.sqrt(3000 * Math.PI) * phi;
      positions[i * 3] = 2 * Math.cos(theta) * Math.sin(phi);
      positions[i * 3 + 1] = 2 * Math.sin(theta) * Math.sin(phi);
      positions[i * 3 + 2] = 2 * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group>
      {/* Wireframe sphere */}
      <Sphere ref={meshRef} args={[1.95, 32, 32]}>
        <meshPhongMaterial
          color="#0d7c3e"
          wireframe
          transparent
          opacity={0.15}
        />
      </Sphere>

      {/* Dot sphere */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[dotPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color="#d4af37"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

// Flight arcs between cities
function FlightArcs() {
  const groupRef = useRef<THREE.Group>(null);

  const arcs = useMemo(() => {
    const routes = [
      { from: [0, 1.5, 1.2] as [number, number, number], to: [1.5, 0.5, 1] as [number, number, number], color: '#d4af37' },
      { from: [-1, 1, 1.3] as [number, number, number], to: [1.2, -0.5, 1.3] as [number, number, number], color: '#f0d060' },
      { from: [0.5, 1.2, -1.2] as [number, number, number], to: [-1.3, 0.3, 1.1] as [number, number, number], color: '#d4af37' },
      { from: [-0.8, -0.5, 1.6] as [number, number, number], to: [1, 1, -1] as [number, number, number], color: '#f0d060' },
      { from: [1.2, 0.8, 0.8] as [number, number, number], to: [-1, -0.8, 1.2] as [number, number, number], color: '#d4af37' },
    ];

    return routes.map((route, i) => {
      const start = new THREE.Vector3(...route.from);
      const end = new THREE.Vector3(...route.to);
      const mid = start.clone().add(end).multiplyScalar(0.5);
      mid.normalize().multiplyScalar(2.8);

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(50);

      return { points, color: route.color, key: i };
    });
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      {arcs.map((arc) => (
        <Line
          key={arc.key}
          points={arc.points}
          color={arc.color}
          lineWidth={1.5}
          transparent
          opacity={0.6}
        />
      ))}
    </group>
  );
}

// Animated airplane orbiting the globe
function Airplane() {
  const groupRef = useRef<THREE.Group>(null);
  const radius = 2.5;

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime * 0.3;
      const x = radius * Math.cos(t);
      const z = radius * Math.sin(t);
      const y = Math.sin(t * 0.5) * 0.5;

      groupRef.current.position.set(x, y, z);
      groupRef.current.lookAt(0, 0, 0);
      groupRef.current.rotateY(Math.PI / 2);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Simple plane geometry */}
      <mesh scale={[0.08, 0.08, 0.08]}>
        <coneGeometry args={[0.5, 2, 4]} />
        <meshStandardMaterial color="#ffffff" emissive="#d4af37" emissiveIntensity={0.3} />
      </mesh>
      {/* Wings */}
      <mesh scale={[0.08, 0.08, 0.08]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.2, 3, 0.1]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
      {/* Trail glow */}
      <pointLight color="#d4af37" intensity={2} distance={1} />
    </group>
  );
}

// Main Globe Scene
function GlobeScene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-5, -5, 5]} intensity={0.3} color="#d4af37" />

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <GlobeMesh />
        <FlightArcs />
        <Airplane />
      </Float>

      <Stars radius={50} depth={50} count={1000} factor={3} saturation={0} fade speed={1} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
}

// Exported component with Canvas
export default function Globe3D() {
  return (
    <div className="w-full h-full min-h-[500px] md:min-h-[600px]">
      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-20 h-20 border-4 border-gold-400/30 border-t-gold-400 rounded-full animate-spin" />
        </div>
      }>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <GlobeScene />
        </Canvas>
      </Suspense>
    </div>
  );
}
