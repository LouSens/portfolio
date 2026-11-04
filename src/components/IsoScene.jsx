import React, { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '../utils/theme';

/* The building you are walking through.

   A monochrome isometric wireframe: four floors of rooms that lift apart and settle back together on a
   12 second loop, with a scan plane sweeping up through them. It never stops moving, but it is drawn in
   hairlines so it stays behind the text instead of competing with it.

   Scrolling turns the camera around the building (a full turn over the whole page) and eases its
   elevation, so every room of the page is seen from a slightly different angle. */

const LOOP = 12; // seconds for one lift-and-settle cycle
const FLOORS = 4;
const SPAN = 4.4;

// Which of the four rooms on a floor exist: a fixed pattern, so the building looks designed, not random.
const ROOM_PATTERN = [
  [1, 1, 1, 1],
  [1, 1, 0, 1],
  [1, 0, 1, 1],
  [0, 1, 1, 0],
];
const ROOM_POS = [
  [-1.1, -1.1],
  [1.1, -1.1],
  [-1.1, 1.1],
  [1.1, 1.1],
];

const ease = (k) => 0.5 - 0.5 * Math.cos(Math.PI * 2 * k);

function Lines({ geometry, color, opacity, position, scale }) {
  return (
    <lineSegments geometry={geometry} position={position} scale={scale}>
      <lineBasicMaterial color={color} transparent opacity={opacity} depthWrite={false} />
    </lineSegments>
  );
}

function Building({ color, still }) {
  const group = useRef();
  const floorRefs = useRef([]);
  const scan = useRef();
  const target = useRef({ progress: 0, px: 0, py: 0 });
  const state = useRef({ az: 0.6, el: 0.6, px: 0, py: 0 });
  const { camera, size } = useThree();

  const geo = useMemo(() => {
    const e = (w, h, d) => new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, d));
    return {
      slab: e(SPAN, 0.14, SPAN),
      room: e(1.9, 0.95, 1.9),
      column: e(0.1, 1.25, 0.1),
      roof: e(1.3, 0.7, 1.3),
      scan: e(SPAN + 0.8, 0.001, SPAN + 0.8),
      grid: (() => {
        const pts = [];
        for (let i = -8; i <= 8; i++) {
          pts.push(new THREE.Vector3(i, 0, -8), new THREE.Vector3(i, 0, 8), new THREE.Vector3(-8, 0, i), new THREE.Vector3(8, 0, i));
        }
        return new THREE.BufferGeometry().setFromPoints(pts);
      })(),
    };
  }, []);

  useEffect(() => () => Object.values(geo).forEach((g) => g.dispose()), [geo]);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      target.current.progress = max > 0 ? window.scrollY / max : 0;
    };
    const onMove = (e) => {
      target.current.px = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.py = (e.clientY / window.innerHeight) * 2 - 1;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  useFrame((frame, delta) => {
    const t = still ? 0 : frame.clock.elapsedTime;
    const s = state.current;
    const lift = ease((t % LOOP) / LOOP); // 0 = stacked, 1 = fully apart
    const p = target.current.progress;
    const k = Math.min(1, delta * 3);

    // Camera: a quarter turn per "room" of the page, plus a slow idle drift
    const azTarget = Math.PI / 4 + p * Math.PI * 2 + t * 0.05;
    const elTarget = 0.62 + 0.16 * Math.sin(p * Math.PI * 4);
    s.az += (azTarget - s.az) * k;
    s.el += (elTarget - s.el) * k;
    s.px += (target.current.px - s.px) * k;
    s.py += (target.current.py - s.py) * k;

    const r = 14;
    camera.position.set(
      Math.cos(s.az) * Math.cos(s.el) * r,
      Math.sin(s.el) * r + 2.6,
      Math.sin(s.az) * Math.cos(s.el) * r
    );
    camera.zoom = Math.max(30, Math.min(size.width * 0.9, size.height * 1.15) / 12.5);
    camera.lookAt(s.px * -0.4, 2.6 + s.py * 0.3, 0);
    camera.updateProjectionMatrix();

    // Floors: stacked tight at lift 0, drawn apart at lift 1
    floorRefs.current.forEach((f, i) => {
      if (!f) return;
      f.position.y = i * (1.15 + 1.25 * lift);
      f.rotation.y = (i - 1.5) * 0.09 * lift;
    });

    // The scan plane rises through the building twice per loop
    if (scan.current) {
      const q = ((t * 2) % LOOP) / LOOP;
      scan.current.position.y = -0.4 + q * (FLOORS * 1.15 + 1.25 + 0.8);
      scan.current.material.opacity = Math.sin(q * Math.PI) * 0.9;
    }
    if (group.current) group.current.position.y = -1.6;
  });

  const rooms = [];
  for (let f = 0; f < FLOORS; f++) {
    ROOM_PATTERN[f].forEach((on, r) => {
      if (on) rooms.push({ f, r });
    });
  }

  return (
    <group ref={group}>
      {Array.from({ length: FLOORS }).map((_, f) => (
        <group key={f} ref={(el) => (floorRefs.current[f] = el)}>
          <Lines geometry={geo.slab} color={color} opacity={0.85} />
          {ROOM_PATTERN[f].map((on, r) =>
            on ? <Lines key={r} geometry={geo.room} color={color} opacity={0.5} position={[ROOM_POS[r][0], 0.55, ROOM_POS[r][1]]} /> : null
          )}
          {[-1, 1].map((cx) =>
            [-1, 1].map((cz) => (
              <Lines key={`${cx}${cz}`} geometry={geo.column} color={color} opacity={0.35} position={[cx * (SPAN / 2 - 0.05), 0.7, cz * (SPAN / 2 - 0.05)]} />
            ))
          )}
        </group>
      ))}
      {/* Roof pavilion rides on the top floor */}
      <group ref={(el) => (floorRefs.current[FLOORS] = el)}>
        <Lines geometry={geo.roof} color={color} opacity={0.7} position={[0, 0.5, 0]} />
      </group>
      {/* Scan plane */}
      <lineSegments ref={scan} geometry={geo.scan}>
        <lineBasicMaterial color={color} transparent opacity={0} depthWrite={false} />
      </lineSegments>
      {/* Ground grid */}
      <Lines geometry={geo.grid} color={color} opacity={0.1} position={[0, -0.3, 0]} />
    </group>
  );
}

export default function IsoScene({ paused }) {
  const theme = useTheme();
  const color = theme === 'light' ? '#111218' : '#ffffff';
  const still = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  return (
    <Canvas
      orthographic
      frameloop={paused ? 'never' : still ? 'demand' : 'always'}
      camera={{ position: [10, 9, 10], zoom: 70, near: -50, far: 100 }}
      dpr={[1, 2]}
      gl={{ powerPreference: 'high-performance', antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <Building color={color} still={still} />
    </Canvas>
  );
}
