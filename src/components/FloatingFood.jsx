import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Environment, Stars, Trail } from '@react-three/drei';
import * as THREE from 'three';

/* ──────────────────────────────────────────────
   BURGER  →  stacked torus rings
────────────────────────────────────────────── */
function Burger({ pos }) {
  const g = useRef();
  useFrame(({ clock }) => {
    if (!g.current) return;
    g.current.rotation.y = clock.elapsedTime * 0.28;
  });
  return (
    <Float speed={1.6} floatIntensity={1.6} rotationIntensity={0.4}>
      <group ref={g} position={pos}>
        {/* bun top – dome = distorted sphere */}
        <mesh position={[0, 0.55, 0]} scale={[1, 0.55, 1]}>
          <sphereGeometry args={[0.72, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <MeshDistortMaterial color="#c8691a" roughness={0.3} metalness={0.4} distort={0.18} speed={2} />
        </mesh>
        {/* patty – flat cylinder */}
        <mesh position={[0, 0.16, 0]}>
          <cylinderGeometry args={[0.68, 0.7, 0.18, 32]} />
          <meshStandardMaterial color="#5c2900" roughness={0.55} metalness={0.2} />
        </mesh>
        {/* cheese – thin yellow disc */}
        <mesh position={[0, 0.27, 0]} rotation={[0.06, 0, 0.04]}>
          <cylinderGeometry args={[0.76, 0.78, 0.06, 32]} />
          <meshStandardMaterial color="#f5c518" roughness={0.4} metalness={0.1} />
        </mesh>
        {/* bun bottom */}
        <mesh position={[0, -0.1, 0]} scale={[1, 0.4, 1]}>
          <sphereGeometry args={[0.72, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
          <meshStandardMaterial color="#d4882a" roughness={0.35} metalness={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

/* ──────────────────────────────────────────────
   PIZZA  →  flat cone + slice wedges
────────────────────────────────────────────── */
function Pizza({ pos }) {
  const g = useRef();
  useFrame(({ clock }) => {
    if (!g.current) return;
    g.current.rotation.y = clock.elapsedTime * 0.22;
    g.current.rotation.x = Math.sin(clock.elapsedTime * 0.5) * 0.12;
  });
  const slices = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 8; i++) {
      arr.push({ angle: (i / 8) * Math.PI * 2, col: i % 2 === 0 ? '#e8360a' : '#c8270a' });
    }
    return arr;
  }, []);
  return (
    <Float speed={1.3} floatIntensity={1.4} rotationIntensity={0.5}>
      <group ref={g} position={pos} rotation={[0.3, 0, 0]}>
        {/* base */}
        <mesh>
          <cylinderGeometry args={[1, 1, 0.1, 32]} />
          <meshStandardMaterial color="#d4a054" roughness={0.6} metalness={0.1} />
        </mesh>
        {/* sauce layer */}
        <mesh position={[0, 0.06, 0]}>
          <cylinderGeometry args={[0.88, 0.88, 0.04, 32]} />
          <meshStandardMaterial color="#c0230a" roughness={0.7} />
        </mesh>
        {/* cheese blobs */}
        {slices.map((s, i) => (
          <mesh key={i} position={[Math.cos(s.angle) * 0.52, 0.1, Math.sin(s.angle) * 0.52]}>
            <sphereGeometry args={[0.14, 10, 10]} />
            <meshStandardMaterial color="#f5e8a0" roughness={0.5} metalness={0.05} />
          </mesh>
        ))}
        {/* crust ring */}
        <mesh position={[0, 0.07, 0]}>
          <torusGeometry args={[0.96, 0.1, 8, 40]} />
          <meshStandardMaterial color="#c4812a" roughness={0.55} metalness={0.15} />
        </mesh>
      </group>
    </Float>
  );
}

/* ──────────────────────────────────────────────
   COFFEE  →  cylinder cup + foam disc
────────────────────────────────────────────── */
function Coffee({ pos }) {
  const g = useRef();
  useFrame(({ clock }) => {
    if (!g.current) return;
    g.current.rotation.y = clock.elapsedTime * -0.2;
  });
  return (
    <Float speed={1.8} floatIntensity={2} rotationIntensity={0.35}>
      <group ref={g} position={pos}>
        {/* cup body */}
        <mesh>
          <cylinderGeometry args={[0.52, 0.38, 1.1, 32]} />
          <MeshWobbleMaterial color="#1a0a04" roughness={0.25} metalness={0.7} factor={0.08} speed={1} />
        </mesh>
        {/* coffee liquid */}
        <mesh position={[0, 0.46, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.08, 32]} />
          <meshStandardMaterial color="#3d1a00" roughness={0.1} metalness={0.05} />
        </mesh>
        {/* foam / latte art */}
        <mesh position={[0, 0.52, 0]}>
          <cylinderGeometry args={[0.46, 0.46, 0.06, 32]} />
          <meshStandardMaterial color="#e8d5b0" roughness={0.8} />
        </mesh>
        {/* handle ring */}
        <mesh position={[0.62, -0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.26, 0.07, 8, 24]} />
          <MeshWobbleMaterial color="#1a0a04" roughness={0.25} metalness={0.7} factor={0.05} speed={1} />
        </mesh>
        {/* saucer */}
        <mesh position={[0, -0.64, 0]}>
          <cylinderGeometry args={[0.72, 0.68, 0.1, 32]} />
          <meshStandardMaterial color="#d4c0a0" roughness={0.4} metalness={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

/* ──────────────────────────────────────────────
   DESSERT  →  layered cake
────────────────────────────────────────────── */
function Dessert({ pos }) {
  const g = useRef();
  useFrame(({ clock }) => {
    if (!g.current) return;
    g.current.rotation.y = clock.elapsedTime * 0.25;
  });
  return (
    <Float speed={1.5} floatIntensity={1.9} rotationIntensity={0.5}>
      <group ref={g} position={pos}>
        {/* bottom tier */}
        <mesh position={[0, -0.35, 0]}>
          <cylinderGeometry args={[0.78, 0.78, 0.5, 32]} />
          <meshStandardMaterial color="#f4a7b9" roughness={0.45} metalness={0.15} />
        </mesh>
        {/* frosting bottom */}
        <mesh position={[0, -0.08, 0]}>
          <cylinderGeometry args={[0.82, 0.82, 0.06, 32]} />
          <meshStandardMaterial color="#fff0f5" roughness={0.6} />
        </mesh>
        {/* middle tier */}
        <mesh position={[0, 0.28, 0]}>
          <cylinderGeometry args={[0.58, 0.58, 0.5, 32]} />
          <meshStandardMaterial color="#e87a9a" roughness={0.45} metalness={0.15} />
        </mesh>
        {/* frosting mid */}
        <mesh position={[0, 0.55, 0]}>
          <cylinderGeometry args={[0.62, 0.62, 0.06, 32]} />
          <meshStandardMaterial color="#fff0f5" roughness={0.6} />
        </mesh>
        {/* top tier */}
        <mesh position={[0, 0.82, 0]}>
          <cylinderGeometry args={[0.36, 0.36, 0.38, 32]} />
          <meshStandardMaterial color="#f4a7b9" roughness={0.45} metalness={0.15} />
        </mesh>
        {/* cherry on top */}
        <mesh position={[0, 1.08, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <MeshDistortMaterial color="#cc1a2a" roughness={0.2} metalness={0.4} distort={0.25} speed={3} />
        </mesh>
        {/* stem */}
        <mesh position={[0.05, 1.22, 0]} rotation={[0, 0, 0.3]}>
          <cylinderGeometry args={[0.02, 0.02, 0.22, 8]} />
          <meshStandardMaterial color="#2a5c10" roughness={0.7} />
        </mesh>
      </group>
    </Float>
  );
}

/* ──────────────────────────────────────────────
   AMBIENT PARTICLES
────────────────────────────────────────────── */
function Particles({ count = 160 }) {
  const geo = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r     = 4 + Math.random() * 7;
      positions[i * 3]     = Math.cos(theta) * r;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = Math.sin(theta) * r * 0.6;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return g;
  }, [count]);

  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.025;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color="#ffb830" size={0.045} transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

/* ──────────────────────────────────────────────
   FULL SCENE
────────────────────────────────────────────── */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 8, 5]}   intensity={2.5} color="#ffe8a0" />
      <pointLight      position={[-6, -4, -3]} intensity={1.4} color="#ff8c00" />
      <pointLight      position={[6,  6,  3]}  intensity={1.0} color="#38bdf8" />
      <spotLight
        position={[0, 12, 4]}
        angle={0.35}
        penumbra={1}
        intensity={4}
        color="#fff4cc"
        castShadow
      />

      <Burger   pos={[-3.8,  0.5,  0]}  />
      <Pizza    pos={[ 3.6,  0.2, -0.5]}/>
      <Coffee   pos={[-1.2, -1.6,  1.5]}/>
      <Dessert  pos={[ 1.4,  1.4,  0.8]}/>

      <Particles />
      <Stars radius={50} depth={60} count={700} factor={2} saturation={0} fade speed={0.5} />
      <Environment preset="night" />
    </>
  );
}

/* ──────────────────────────────────────────────
   EXPORTED CANVAS
────────────────────────────────────────────── */
export default function FloatingFood() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 46 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Scene />
    </Canvas>
  );
}
