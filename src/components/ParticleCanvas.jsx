import React, { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

/* The hero's particle sphere. Lives in its own file so three.js is loaded lazily, after the
   page has painted, instead of blocking first render. */
function ParticleField() {
  const ref = useRef();
  const prefersReducedMotion = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  const positions = useMemo(() => {
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 800 : 2000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = (isMobile ? 13 : 15) * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  // Pointer position (-1..1) so the sphere leans toward the cursor. The canvas wrapper ignores
  // pointer events, so listen on the window instead.
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const move = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);

  useFrame((state, delta) => {
    if (ref.current && !prefersReducedMotion) {
      ref.current.rotation.y -= delta * 0.035;
      ref.current.rotation.x -= delta * 0.012;
      ref.current.position.x += (pointer.current.x * 1.1 - ref.current.position.x) * Math.min(1, delta * 2);
      ref.current.position.y += (-pointer.current.y * 0.7 - ref.current.position.y) * Math.min(1, delta * 2);
    }
  });

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial transparent color="#FF5A36" size={0.045} sizeAttenuation depthWrite={false} opacity={0.35} />
    </points>
  );
}

export default function ParticleCanvas({ paused }) {
  return (
    <Canvas
      frameloop={paused ? 'never' : 'always'}
      camera={{ position: [0, 0, 15] }}
      dpr={[1, 1.5]}
      gl={{ powerPreference: 'high-performance', antialias: false }}
    >
      <ParticleField />
    </Canvas>
  );
}
