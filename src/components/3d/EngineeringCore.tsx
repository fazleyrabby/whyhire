import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

// 1. Soft, delicate galaxy dust field
const GalaxyDust = ({ count = 1500, radius = 20 }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const colorCore = new THREE.Color('#10b981'); // Emerald
    const colorMid = new THREE.Color('#38bdf8'); // Soft Sky Cyan
    const colorDust = new THREE.Color('#64748b'); // Muted Slate

    for (let i = 0; i < count; i++) {
      const r = Math.pow(Math.random(), 1.6) * radius;
      const spinAngle = r * 0.4;
      const branchAngle = ((i % 3) * (2 * Math.PI)) / 3;

      const randomX = (Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.35 * radius);
      const randomY = (Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.2 * radius);
      const randomZ = (Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.35 * radius);

      // Balanced position across the background
      pos[i * 3] = Math.cos(branchAngle + spinAngle) * r + randomX + 2;
      pos[i * 3 + 1] = randomY;
      pos[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ - 3;

      const mixedColor = r < radius * 0.4 
        ? colorCore.clone().lerp(colorMid, r / (radius * 0.4))
        : colorMid.clone().lerp(colorDust, (r - radius * 0.4) / (radius * 0.6));

      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;
    }
    return { positions: pos, colors: col };
  }, [count, radius]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.015; // Slow, calm rotation
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.04} 
        vertexColors 
        transparent 
        opacity={0.4} 
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
};

// 2. Soft, occasional shooting star
const ShootingStar = ({ delay = 0 }) => {
  const lineRef = useRef<THREE.LineSegments>(null);
  const [active, setActive] = useState(false);
  const startPos = useRef(new THREE.Vector3());
  const velocity = useRef(new THREE.Vector3());
  const progress = useRef(0);

  const triggerStar = () => {
    startPos.current.set(
      (Math.random() * 24) - 6,
      6 + Math.random() * 6,
      -8 - Math.random() * 8
    );
    velocity.current.set(
      -12 - Math.random() * 6,
      -6 - Math.random() * 4,
      Math.random() * 3
    ).normalize().multiplyScalar(0.35);

    progress.current = 0;
    setActive(true);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      triggerStar();
      const interval = setInterval(() => {
        triggerStar();
      }, 4500 + Math.random() * 4000);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay]);

  useFrame(() => {
    if (!active || !lineRef.current) return;

    progress.current += 1;
    const trailLength = 2.0;

    const currentHead = startPos.current.clone().add(velocity.current.clone().multiplyScalar(progress.current * 1.3));
    const currentTail = currentHead.clone().sub(velocity.current.clone().multiplyScalar(trailLength));

    const positions = new Float32Array([
      currentHead.x, currentHead.y, currentHead.z,
      currentTail.x, currentTail.y, currentTail.z
    ]);

    lineRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    if (progress.current > 30) {
      setActive(false);
    }
  });

  if (!active) return null;

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry />
      <lineBasicMaterial color="#a7f3d0" transparent opacity={0.4} linewidth={1.5} />
    </lineSegments>
  );
};

// 3. Gentle Camera Rig following cursor
const CameraRig = () => {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 0.8, 0.02);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.pointer.y * 0.4, 0.02);
    state.camera.lookAt(0.5, 0, 0);
  });
  return null;
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.05} />
      
      {/* Background Starfield */}
      <Stars radius={40} depth={30} count={1600} factor={2.2} saturation={0} fade speed={0.2} />
      
      {/* Soft Galaxy Dust */}
      <GalaxyDust count={1500} radius={18} />
      
      {/* Occasional Subtle Shooting Star */}
      <ShootingStar delay={800} />
      
      {/* Cursor Parallax */}
      <CameraRig />
      
      {/* Soft Fog for smooth edge blending */}
      <fog attach="fog" args={['#030712', 12, 38]} />
    </>
  );
};

export default function EngineeringCore() {
  return (
    <Canvas 
      camera={{ position: [0, 0, 9], fov: 45 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      dpr={[1, 1.5]}
    >
      <Scene />
    </Canvas>
  );
}
