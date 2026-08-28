import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

// Subtle, ambient data field: Slow, calming particle drift that stays out of the text's way

const AmbientDataField = ({ count = 180, radius = 12 }) => {
  const points = useRef<THREE.Points>(null);

  const { positions, speeds, phases } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const phs = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * radius * 2;
      pos[i * 3 + 1] = (Math.random() - 0.5) * radius * 1.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * radius * 1.5;
      // Gentle, calm upward/z drift
      spd[i] = 0.003 + Math.random() * 0.006;
      phs[i] = Math.random() * Math.PI * 2;
    }
    return { positions: pos, speeds: spd, phases: phs };
  }, [count, radius]);

  useFrame((state) => {
    if (!points.current) return;
    const pos = points.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      // Gentle floating motion
      pos[i * 3 + 1] += speeds[i] * 0.5; // slow upward drift
      pos[i * 3] += Math.sin(time * 0.3 + phases[i]) * 0.003; // subtle horizontal sway
      pos[i * 3 + 2] += speeds[i]; // slow depth drift

      // Reset when out of bounds for seamless infinite loop
      if (pos[i * 3 + 1] > radius * 0.75) pos[i * 3 + 1] = -radius * 0.75;
      if (pos[i * 3 + 2] > radius * 0.75) pos[i * 3 + 2] = -radius * 0.75;
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
        size={0.045} 
        color="#10b981" 
        transparent 
        opacity={0.3} 
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
};

const SubtleGrid = () => {
  return (
    <gridHelper 
      args={[40, 40, '#1f2937', '#0f172a']} 
      position={[0, -4, 0]} 
    />
  );
};

const CameraRig = () => {
  useFrame((state) => {
    // Subtle, smooth camera parallax following mouse
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 0.8, 0.03);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.pointer.y * 0.5, 0.03);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.05} />
      
      {/* Calm, distant dust stars */}
      <Stars radius={40} depth={40} count={1200} factor={2} saturation={0} fade speed={0.2} />
      
      {/* Slow, ambient data particles */}
      <AmbientDataField count={180} radius={14} />
      
      {/* Soft structural infrastructure grid */}
      <SubtleGrid />
      
      {/* Gentle mouse parallax */}
      <CameraRig />
      
      {/* Deep fog to keep background dark and text readable */}
      <fog attach="fog" args={['#030712', 6, 20]} />
    </>
  );
};

export default function EngineeringCore() {
  return (
    <Canvas 
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      dpr={[1, 1.5]}
    >
      <Scene />
    </Canvas>
  );
}
