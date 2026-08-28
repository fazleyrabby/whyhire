import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// ─────────────────────────────────────────────────────────────────────────────
// 1. REAL STARS — circular soft glowing points using a canvas sprite texture
// ─────────────────────────────────────────────────────────────────────────────
function makeStarTexture(size = 64): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const center = size / 2;

  // Radial gradient: bright white center → fully transparent
  const grad = ctx.createRadialGradient(center, center, 0, center, center, center);
  grad.addColorStop(0.0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.15, 'rgba(255,255,255,0.9)');
  grad.addColorStop(0.4, 'rgba(220,240,255,0.4)');
  grad.addColorStop(0.7, 'rgba(180,210,255,0.1)');
  grad.addColorStop(1.0, 'rgba(0,0,0,0)');

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(center, center, center, 0, Math.PI * 2);
  ctx.fill();

  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. STARFIELD — multiple layers at different depths & sizes
// ─────────────────────────────────────────────────────────────────────────────
interface StarLayerProps {
  count: number;
  spread: number;
  depth: number;
  size: number;
  opacity: number;
  colorPalette: THREE.Color[];
  speed: number;
}

const StarLayer: React.FC<StarLayerProps> = ({ count, spread, depth, size, opacity, colorPalette, speed }) => {
  const ref = useRef<THREE.Points>(null);
  const tex = useMemo(() => makeStarTexture(64), []);

  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sz = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Distribute stars evenly across the full viewport volume
      pos[i * 3]     = (Math.random() - 0.5) * spread;
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * depth;

      const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      col[i * 3]     = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;

      // Vary sizes for realism — most tiny, a few bright large ones
      sz[i] = size * (Math.random() < 0.05 ? 2.8 + Math.random() * 2 : 0.5 + Math.random() * 1.4);
    }
    return { positions: pos, colors: col, sizes: sz };
  }, [count, spread, depth, size, colorPalette]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * speed;
      ref.current.rotation.x = state.clock.getElapsedTime() * speed * 0.3;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={count} array={sizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        map={tex}
        vertexColors
        transparent
        opacity={opacity}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
        alphaTest={0.001}
      />
    </points>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. GALAXY DUST — spiral arms with nebula-style coloring
// ─────────────────────────────────────────────────────────────────────────────
const GalaxyDust: React.FC = () => {
  const ref = useRef<THREE.Points>(null);
  const tex = useMemo(() => makeStarTexture(32), []);

  const { positions, colors } = useMemo(() => {
    const count = 3000;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const radius = 22;
    const branches = 3;
    const spin = 1.2;

    // Color palette: emerald core → cyan mid → slate outer
    const cCore  = new THREE.Color('#10b981');
    const cMid   = new THREE.Color('#38bdf8');
    const cOuter = new THREE.Color('#4a5568');
    const cWarm  = new THREE.Color('#7c3aed');

    for (let i = 0; i < count; i++) {
      const r = Math.pow(Math.random(), 2.0) * radius;
      const branchAngle = ((i % branches) / branches) * Math.PI * 2;
      const spinAngle = r * spin * 0.06;

      const scatter = Math.pow(Math.random(), 2.5) * 3.5;
      const scatterAngle = Math.random() * Math.PI * 2;

      pos[i * 3]     = Math.cos(branchAngle + spinAngle) * r + Math.cos(scatterAngle) * scatter;
      pos[i * 3 + 1] = (Math.random() - 0.5) * (0.5 + r * 0.06);
      pos[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * r + Math.sin(scatterAngle) * scatter - 2;

      // Color: bright at core, fades to muted/warm at edges
      let c: THREE.Color;
      const t = r / radius;
      if (t < 0.3) {
        c = cCore.clone().lerp(cMid, t / 0.3);
      } else if (t < 0.7) {
        c = cMid.clone().lerp(Math.random() > 0.5 ? cWarm : cOuter, (t - 0.3) / 0.4);
      } else {
        c = cOuter.clone().lerp(new THREE.Color('#1a1a2e'), (t - 0.7) / 0.3);
      }

      col[i * 3]     = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return { positions: pos, colors: col };
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.008;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        map={tex}
        vertexColors
        transparent
        opacity={0.45}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
        alphaTest={0.001}
      />
    </points>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. NEBULA CLOUDS — large soft glowing blobs for galaxy atmosphere
// ─────────────────────────────────────────────────────────────────────────────
const NebulaClouds: React.FC = () => {
  const ref = useRef<THREE.Points>(null);
  const tex = useMemo(() => makeStarTexture(128), []);

  const { positions, colors } = useMemo(() => {
    const count = 180;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const palettes = [
      new THREE.Color('#0d4f3c'), // dark emerald
      new THREE.Color('#0c2a4a'), // deep navy
      new THREE.Color('#1a0a2e'), // deep purple
      new THREE.Color('#0f1f3a'), // midnight blue
      new THREE.Color('#061a2e'), // dark teal
    ];

    for (let i = 0; i < count; i++) {
      // Place nebula clouds in loose clusters
      const cluster = Math.floor(Math.random() * 5);
      const clusterX = [-8, 5, -3, 10, -12][cluster];
      const clusterY = [2, -3, 5, 1, -2][cluster];
      const clusterZ = [-8, -12, -6, -10, -14][cluster];

      pos[i * 3]     = clusterX + (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = clusterY + (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = clusterZ + (Math.random() - 0.5) * 6;

      const c = palettes[cluster].clone();
      // Slight variation
      c.r += (Math.random() - 0.5) * 0.05;
      c.g += (Math.random() - 0.5) * 0.08;
      c.b += (Math.random() - 0.5) * 0.06;

      col[i * 3]     = Math.max(0, c.r);
      col[i * 3 + 1] = Math.max(0, c.g);
      col[i * 3 + 2] = Math.max(0, c.b);
    }

    return { positions: pos, colors: col };
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.005;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={4.5}
        map={tex}
        vertexColors
        transparent
        opacity={0.18}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
        alphaTest={0.0}
      />
    </points>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 5. SHOOTING STARS — smooth, subtle, trail-based
// ─────────────────────────────────────────────────────────────────────────────
interface ShootingStarState {
  active: boolean;
  head: THREE.Vector3;
  vel: THREE.Vector3;
  progress: number;
  opacity: number;
  life: number;
}

const ShootingStars: React.FC<{ count?: number }> = ({ count = 3 }) => {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<(THREE.Line | null)[]>([]);

  // Per-star state stored in refs (no re-render needed)
  const stars = useRef<ShootingStarState[]>(
    Array.from({ length: count }, (_, i) => ({
      active: false,
      head: new THREE.Vector3(),
      vel: new THREE.Vector3(),
      progress: 0,
      opacity: 0,
      life: 0,
    }))
  );

  const nextFire = useRef<number[]>(Array.from({ length: count }, (_, i) => 3000 + i * 2800 + Math.random() * 4000));

  const resetStar = (s: ShootingStarState) => {
    // Start from upper right area, travel diagonally down-left
    s.head.set(
      8 + Math.random() * 8,        // far right
      3 + Math.random() * 5,         // above center
      -4 - Math.random() * 6         // mid-depth
    );
    s.vel.set(
      -0.18 - Math.random() * 0.12,  // leftward
      -0.06 - Math.random() * 0.06,  // slight downward
      0
    );
    s.progress = 0;
    s.opacity = 0;
    s.life = 55 + Math.floor(Math.random() * 30); // frames alive
    s.active = true;
  };

  // Build line geometries for each star
  const lineGeos = useMemo(() =>
    Array.from({ length: count }, () => {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3));
      return geo;
    }),
  [count]);

  const lineMats = useMemo(() =>
    Array.from({ length: count }, () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color('#e0f2fe'),
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        linewidth: 1,
      })
    ),
  [count]);

  useFrame((state) => {
    const now = state.clock.getElapsedTime() * 1000;

    stars.current.forEach((s, idx) => {
      const mat = lineMats[idx];
      const geo = lineGeos[idx];

      if (!s.active) {
        mat.opacity = 0;

        // Check if it's time to fire
        if (now > nextFire.current[idx]) {
          resetStar(s);
          nextFire.current[idx] = now + 8000 + Math.random() * 12000; // 8–20s between stars
        }
        return;
      }

      s.progress++;
      const half = s.life / 2;

      // Fade in quickly, hold, fade out gently
      if (s.progress < 8) {
        s.opacity = (s.progress / 8) * 0.55;
      } else if (s.progress < s.life - 12) {
        s.opacity = 0.55;
      } else {
        s.opacity = Math.max(0, 0.55 * (s.life - s.progress) / 12);
      }

      // Move head forward
      s.head.addScaledVector(s.vel, 1);

      // Trail length varies: longer in middle of life
      const trailT = Math.sin((s.progress / s.life) * Math.PI);
      const trailLen = 1.2 + trailT * 2.2;

      const tail = s.head.clone().addScaledVector(s.vel.clone().normalize(), -trailLen);

      const posArr = geo.getAttribute('position') as THREE.BufferAttribute;
      posArr.setXYZ(0, s.head.x, s.head.y, s.head.z);
      posArr.setXYZ(1, tail.x, tail.y, tail.z);
      posArr.needsUpdate = true;

      mat.opacity = s.opacity;

      if (s.progress >= s.life) {
        s.active = false;
        mat.opacity = 0;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: count }, (_, i) => (
        <primitive key={i} object={new THREE.Line(lineGeos[i], lineMats[i])} />
      ))}
    </group>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 6. GENTLE PARALLAX CAMERA
// ─────────────────────────────────────────────────────────────────────────────
const CameraRig: React.FC = () => {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 0.6, 0.018);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.pointer.y * 0.3, 0.018);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
};

// ─────────────────────────────────────────────────────────────────────────────
// 7. SCENE ASSEMBLY
// ─────────────────────────────────────────────────────────────────────────────
const STAR_COLORS_DISTANT = [
  new THREE.Color('#ffffff'),
  new THREE.Color('#e8eeff'),
  new THREE.Color('#ffe8cc'),
  new THREE.Color('#ccddff'),
  new THREE.Color('#ffeedd'),
  new THREE.Color('#ddeeff'),
];

const STAR_COLORS_BRIGHT = [
  new THREE.Color('#ffffff'),
  new THREE.Color('#f0f8ff'),
  new THREE.Color('#fff5e0'),
  new THREE.Color('#e8f4ff'),
];

const Scene: React.FC = () => (
  <>
    <ambientLight intensity={0.02} />

    {/* Nebula atmosphere — deepest layer */}
    <NebulaClouds />

    {/* Background starfield — tiny, faint, numerous */}
    <StarLayer
      count={2800}
      spread={60}
      depth={40}
      size={0.06}
      opacity={0.55}
      colorPalette={STAR_COLORS_DISTANT}
      speed={0.003}
    />

    {/* Mid-field stars — slightly brighter */}
    <StarLayer
      count={900}
      spread={40}
      depth={20}
      size={0.10}
      opacity={0.65}
      colorPalette={STAR_COLORS_DISTANT}
      speed={0.005}
    />

    {/* Foreground bright stars — few but prominent */}
    <StarLayer
      count={120}
      spread={28}
      depth={10}
      size={0.22}
      opacity={0.75}
      colorPalette={STAR_COLORS_BRIGHT}
      speed={0.006}
    />

    {/* Galaxy spiral dust arms */}
    <GalaxyDust />

    {/* Subtle shooting stars */}
    <ShootingStars count={3} />

    {/* Parallax on mouse move */}
    <CameraRig />

    {/* Depth fog to blend far edges */}
    <fog attach="fog" args={['#030712', 20, 55]} />
  </>
);

// ─────────────────────────────────────────────────────────────────────────────
// 8. EXPORT
// ─────────────────────────────────────────────────────────────────────────────
export default function EngineeringCore() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 55 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      dpr={[1, 1.5]}
    >
      <Scene />
    </Canvas>
  );
}
