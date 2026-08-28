import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

// 1. Vibrant Spiral Galaxy Dust Field positioned to balance the Hero
const GalaxyDust = ({ count = 2200, radius = 18 }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sz = new Float32Array(count);

    const colorCore = new THREE.Color('#34d399'); // Radiant Emerald
    const colorMid = new THREE.Color('#38bdf8'); // Sky Cyan
    const colorOuter = new THREE.Color('#818cf8'); // Indigo/Purple
    const colorDust = new THREE.Color('#f8fafc'); // White

    for (let i = 0; i < count; i++) {
      // 3-arm spiral galaxy distribution
      const r = Math.pow(Math.random(), 1.5) * radius;
      const spinAngle = r * 0.45;
      const branchAngle = ((i % 3) * (2 * Math.PI)) / 3;

      const randomX = (Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.4 * radius);
      const randomY = (Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.25 * radius);
      const randomZ = (Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.4 * radius);

      // Offset slightly to the right to fill empty space on Hero
      pos[i * 3] = Math.cos(branchAngle + spinAngle) * r + randomX + 2.5;
      pos[i * 3 + 1] = randomY;
      pos[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ - 2;

      // Color interpolation
      const mixedColor = r < radius * 0.35 
        ? colorCore.clone().lerp(colorMid, r / (radius * 0.35))
        : colorMid.clone().lerp(r < radius * 0.7 ? colorOuter : colorDust, (r - radius * 0.35) / (radius * 0.65));

      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;

      // Varied star sizes
      sz[i] = (0.04 + Math.random() * 0.08);
    }
    return { positions: pos, colors: col, sizes: sz };
  }, [count, radius]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    pointsRef.current.rotation.z = state.clock.getElapsedTime() * 0.01;
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
        size={0.085} 
        vertexColors 
        transparent 
        opacity={0.75} 
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
};

// 2. Shooting Star System (Frequent, glowing streaks)
const ShootingStar = ({ delay = 0 }) => {
  const lineRef = useRef<THREE.LineSegments>(null);
  const [active, setActive] = useState(false);
  const startPos = useRef(new THREE.Vector3());
  const velocity = useRef(new THREE.Vector3());
  const progress = useRef(0);

  const triggerStar = () => {
    // Spawn across the upper right sky
    startPos.current.set(
      (Math.random() * 20) - 5,
      5 + Math.random() * 7,
      -5 - Math.random() * 10
    );
    velocity.current.set(
      -12 - Math.random() * 8,
      -7 - Math.random() * 5,
      2 + Math.random() * 4
    ).normalize().multiplyScalar(0.45);

    progress.current = 0;
    setActive(true);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      triggerStar();
      const interval = setInterval(() => {
        triggerStar();
      }, 3000 + Math.random() * 3500);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay]);

  useFrame(() => {
    if (!active || !lineRef.current) return;

    progress.current += 1;
    const trailLength = 2.5;

    const currentHead = startPos.current.clone().add(velocity.current.clone().multiplyScalar(progress.current * 1.6));
    const currentTail = currentHead.clone().sub(velocity.current.clone().multiplyScalar(trailLength));

    const positions = new Float32Array([
      currentHead.x, currentHead.y, currentHead.z,
      currentTail.x, currentTail.y, currentTail.z
    ]);

    lineRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    if (progress.current > 35) {
      setActive(false);
    }
  });

  if (!active) return null;

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry />
      <lineBasicMaterial color="#6ee7b7" transparent opacity={0.8} linewidth={2} />
    </lineSegments>
  );
};

// 3. Smooth Camera Rig following mouse
const CameraRig = () => {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 1.2, 0.03);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.pointer.y * 0.6, 0.03);
    state.camera.lookAt(1, 0, 0);
  });
  return null;
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.1} />
      
      {/* Background Starfield */}
      <Stars radius={30} depth={25} count={2400} factor={3.5} saturation={0.5} fade speed={0.4} />
      
      {/* Luminous Rotating Spiral Galaxy (Offset to right) */}
      <GalaxyDust count={2400} radius={18} />
      
      {/* Multiple Shooting Stars */}
      <ShootingStar delay={500} />
      <ShootingStar delay={2500} />
      
      {/* Cursor Parallax */}
      <CameraRig />
    </>
  );
};

export default function EngineeringCore() {
  return (
    <Canvas 
      camera={{ position: [0, 0, 10], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <Scene />
    </Canvas>
  );
}
