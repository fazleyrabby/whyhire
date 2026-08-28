import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, Instance, Instances } from '@react-three/drei';
import * as THREE from 'three';

// Structured engineering core: Database cylinders and data packets

const DataStream = ({ radius = 10, count = 100 }) => {
  const points = useRef<THREE.Points>(null);

  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Create streams that flow along the Z axis
      pos[i * 3] = (Math.random() - 0.5) * radius * 2;
      pos[i * 3 + 1] = (Math.random() - 0.5) * radius;
      pos[i * 3 + 2] = (Math.random() - 0.5) * radius * 2;
      spd[i] = 0.05 + Math.random() * 0.1; // speed
    }
    return { positions: pos, speeds: spd };
  }, [count, radius]);

  useFrame(() => {
    if (!points.current) return;
    const pos = points.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      // Flow along Z
      pos[i * 3 + 2] += speeds[i];
      if (pos[i * 3 + 2] > radius) {
        pos[i * 3 + 2] = -radius; // Reset to back
      }
    }
    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.08} 
        color="#10b981" 
        transparent 
        opacity={0.6} 
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const DatabaseCluster = () => {
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <Instances limit={10} range={10}>
        <cylinderGeometry args={[0.5, 0.5, 1.5, 16]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.15} wireframe />
        {/* Render a few abstract DB cylinders */}
        <Instance position={[-4, 0, -2]} scale={1.2} />
        <Instance position={[4, -2, -5]} scale={0.8} />
        <Instance position={[0, 2, -8]} scale={1.5} />
        <Instance position={[-6, 3, -10]} scale={1} />
        <Instance position={[6, 1, -4]} scale={0.9} />
      </Instances>
    </Float>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      
      <Stars radius={50} depth={50} count={3000} factor={3} saturation={0} fade speed={0.5} />
      
      {/* High-speed data packets flowing through the system */}
      <DataStream radius={15} count={400} />
      
      {/* Abstract Database Nodes */}
      <DatabaseCluster />
      
      {/* Subtle floor grid representing infrastructure */}
      <gridHelper args={[60, 60, '#10b981', '#111216']} position={[0, -5, 0]} />
      <fog attach="fog" args={['#030712', 5, 25]} />
    </>
  );
};

export default function EngineeringCore() {
  return (
    <Canvas 
      camera={{ position: [0, 0, 10], fov: 50 }}
      gl={{ antialias: false, alpha: true }}
      dpr={[1, 2]}
    >
      <Scene />
    </Canvas>
  );
}
