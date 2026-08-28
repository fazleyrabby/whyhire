import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

// 1. Subtle Galaxy Spiral / Dust Field
const GalaxyDust = ({ count = 600, radius = 25 }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const colorInside = new THREE.Color('#10b981'); // Emerald
    const colorOutside = new THREE.Color('#06b6d4'); // Soft Cyan
    const colorDust = new THREE.Color('#94a3b8'); // Muted Slate

    for (let i = 0; i < count; i++) {
      // Spiral galaxy branch distribution
      const r = Math.random() * radius;
      const spinAngle = r * 0.4;
      const branchAngle = ((i % 3) * (2 * Math.PI)) / 3;

      const randomX = (Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3 * radius);
      const randomY = (Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.2 * radius);
      const randomZ = (Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3 * radius);

      pos[i * 3] = Math.cos(branchAngle + spinAngle) * r + randomX;
      pos[i * 3 + 1] = randomY - 2;
      pos[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ;

      // Color interpolation from core to arms
      const mixedColor = colorInside.clone().lerp(r > radius * 0.5 ? colorOutside : colorDust, r / radius);
      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;
    }
    return { positions: pos, colors: col };
  }, [count, radius]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    // Extremely slow, majestic galaxy rotation
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
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
        size={0.055} 
        vertexColors 
        transparent 
        opacity={0.35} 
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
};

// 2. Occasional Subtle Shooting Star
const ShootingStar = () => {
  const lineRef = useRef<THREE.LineSegments>(null);
  const [active, setActive] = useState(false);
  const startPos = useRef(new THREE.Vector3());
  const velocity = useRef(new THREE.Vector3());
  const progress = useRef(0);

  const resetStar = () => {
    // Spawn in random upper sky area
    startPos.current.set(
      (Math.random() - 0.5) * 30,
      8 + Math.random() * 8,
      -10 - Math.random() * 15
    );
    // Angle downwards diagonally
    velocity.current.set(
      -15 - Math.random() * 10,
      -8 - Math.random() * 6,
      Math.random() * 5
    ).normalize().multiplyScalar(0.35); // Smooth streak speed

    progress.current = 0;
    setActive(true);
  };

  useEffect(() => {
    // Trigger periodically every 3 to 6 seconds
    const interval = setInterval(() => {
      if (!active) resetStar();
    }, 3500 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, [active]);

  useFrame(() => {
    if (!active || !lineRef.current) return;

    progress.current += 1;
    const trailLength = 1.8;

    const currentHead = startPos.current.clone().add(velocity.current.clone().multiplyScalar(progress.current * 1.5));
    const currentTail = currentHead.clone().sub(velocity.current.clone().multiplyScalar(trailLength));

    const positions = new Float32Array([
      currentHead.x, currentHead.y, currentHead.z,
      currentTail.x, currentTail.y, currentTail.z
    ]);

    lineRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Despawn after traveling
    if (progress.current > 40) {
      setActive(false);
    }
  });

  if (!active) return null;

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry />
      <lineBasicMaterial color="#a7f3d0" transparent opacity={0.5} linewidth={2} />
    </lineSegments>
  );
};

// 3. Gentle Camera Rig following cursor
const CameraRig = () => {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 0.8, 0.025);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.pointer.y * 0.4, 0.025);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.05} />
      
      {/* Background Starfield */}
      <Stars radius={50} depth={40} count={1800} factor={2.5} saturation={0} fade speed={0.15} />
      
      {/* Subtle Rotating Galaxy Spiral */}
      <GalaxyDust count={750} radius={22} />
      
      {/* Occasional Subtle Shooting Star */}
      <ShootingStar />
      
      {/* Mouse Parallax Rig */}
      <CameraRig />
      
      {/* Dark Ambient Fog to preserve high text contrast */}
      <fog attach="fog" args={['#030712', 8, 28]} />
    </>
  );
};

export default function EngineeringCore() {
  return (
    <Canvas 
      camera={{ position: [0, 0, 10], fov: 45 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      dpr={[1, 1.5]}
    >
      <Scene />
    </Canvas>
  );
}
