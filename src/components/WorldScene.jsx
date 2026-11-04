import React, { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '../utils/theme';
import { KINDS } from './iso/kinds';

/* The website as a place.

   Every section of the page is a room in one continuous building drawn in hairlines. A winding, rising
   corridor links the rooms, and the camera flies along it as you scroll: scroll position is mapped
   section by section onto the path, so a long section (the projects gallery) is a long walk and a short
   one is a short step. Each room holds a looping isometric sculpture beside the path.

   The page text is laid over the world as normal HTML; the world only supplies depth, direction and
   motion. Monochrome throughout, with fog so distant rooms fade out. */

// Order must match the sections on the page.
const ROOMS = [
  { id: 'top', kind: 'layers' },
  { id: 'about', kind: 'match' },
  { id: 'work', kind: 'cluster' },
  { id: 'stack', kind: 'database' },
  { id: 'activity', kind: 'bars' },
  { id: 'moments', kind: 'reel' },
  { id: 'awards', kind: 'ingots' },
  { id: 'inquire', kind: 'books' },
];

const UP = new THREE.Vector3(0, 1, 0);
const clamp = (n, a, b) => Math.min(b, Math.max(a, n));

/* A spiral that climbs: each room is a turn to the right and a little higher than the last. */
function buildPath() {
  const R = 26;
  const pts = ROOMS.map((_, i) => {
    const a = i * 0.6;
    return new THREE.Vector3(R * (1 - Math.cos(a)), i * 2.1, -R * Math.sin(a));
  });
  const curve = new THREE.CatmullRomCurve3(pts, false, 'centripetal');
  // Where along the curve (0..1, by length) each room sits
  const samples = 900;
  const roomU = pts.map((p) => {
    let best = 0;
    let bd = Infinity;
    for (let s = 0; s <= samples; s++) {
      const d = curve.getPointAt(s / samples).distanceToSquared(p);
      if (d < bd) { bd = d; best = s / samples; }
    }
    return best;
  });
  return { curve, roomU };
}

/* The corridor: rectangular ribs every few units, wider and taller at each room, joined by long edges. */
function buildCorridor(curve, roomU) {
  const N = 150;
  const verts = [];
  const prev = [];
  for (let k = 0; k <= N; k++) {
    const u = k / N;
    const p = curve.getPointAt(u);
    const t = curve.getTangentAt(u);
    const right = new THREE.Vector3().crossVectors(t, UP).normalize();
    let f = 0;
    roomU.forEach((ru) => { f += Math.exp(-(((u - ru) / 0.03) ** 2)); });
    f = Math.min(1, f);
    const w = (6.2 + 6.5 * f) / 2;
    const h = (4.2 + 2.8 * f) / 2;
    const c = [
      p.clone().addScaledVector(right, -w).addScaledVector(UP, -h),
      p.clone().addScaledVector(right, w).addScaledVector(UP, -h),
      p.clone().addScaledVector(right, w).addScaledVector(UP, h),
      p.clone().addScaledVector(right, -w).addScaledVector(UP, h),
    ];
    for (let i = 0; i < 4; i++) verts.push(c[i], c[(i + 1) % 4]);
    if (prev.length) for (let i = 0; i < 4; i++) verts.push(prev[i], c[i]);
    prev.length = 0;
    prev.push(...c);
  }
  return new THREE.BufferGeometry().setFromPoints(verts);
}

function Sculpture({ kind, position, color, index }) {
  const group = useRef();
  const boxes = KINDS[kind];
  const edge = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 1)), []);
  const refs = useRef([]);
  useEffect(() => () => edge.dispose(), [edge]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = t * 0.18 + index;
    refs.current.forEach((m, i) => {
      if (!m) return;
      const o = boxes[i];
      m.position.y = o.z + o.h / 2 + o.amp * (0.5 + 0.5 * Math.sin(t * 1.15 + o.ph * 2.3));
    });
  });

  return (
    <group ref={group} position={position} scale={0.62}>
      <group position={[-2, 0, -2]}>
        {boxes.map((o, i) => (
          <lineSegments
            key={i}
            ref={(el) => (refs.current[i] = el)}
            geometry={edge}
            position={[o.x + o.w / 2, o.z + o.h / 2, o.y + o.d / 2]}
            scale={[o.w, o.h, o.d]}
          >
            <lineBasicMaterial color={color} transparent opacity={0.85} />
          </lineSegments>
        ))}
      </group>
    </group>
  );
}

function World({ color, bg, still }) {
  const { camera } = useThree();
  const { curve, roomU } = useMemo(buildPath, []);
  const corridor = useMemo(() => buildCorridor(curve, roomU), [curve, roomU]);
  useEffect(() => () => corridor.dispose(), [corridor]);

  const sculptures = useMemo(
    () =>
      ROOMS.map((r, i) => {
        const p = curve.getPointAt(roomU[i]);
        const t = curve.getTangentAt(roomU[i]);
        const right = new THREE.Vector3().crossVectors(t, UP).normalize();
        // Beside the path, a little below eye level, so the text column stays clear
        return { ...r, pos: p.clone().addScaledVector(right, 3.4).add(new THREE.Vector3(0, -1.5, 0)) };
      }),
    [curve, roomU]
  );

  const ys = useRef([]);
  const lastMeasure = useRef(-1);
  const st = useRef({ u: 0, px: 0, py: 0, target: 0 });
  const m4 = useMemo(() => new THREE.Matrix4(), []);
  const q = useMemo(() => new THREE.Quaternion(), []);

  useEffect(() => {
    const onMove = (e) => {
      st.current.px = (e.clientX / window.innerWidth) * 2 - 1;
      st.current.py = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  // Where on the path the page currently is: section by section, so long sections are long walks
  const pathPosition = () => {
    const y = window.scrollY;
    const pos = ys.current;
    if (pos.length < 2) return 0;
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    let i = 0;
    for (let k = 0; k < pos.length; k++) if (pos[k].y <= y + 1) i = k;
    const start = pos[i].y;
    const end = i + 1 < pos.length ? pos[i + 1].y : max;
    const f = clamp((y - start) / Math.max(1, end - start), 0, 1);
    const a = roomU[pos[i].room];
    const b = i + 1 < pos.length ? roomU[pos[i + 1].room] : 1;
    return a + (b - a) * f;
  };

  useFrame((state, delta) => {
    const now = state.clock.elapsedTime;
    if (now - lastMeasure.current > 0.4) {
      lastMeasure.current = now;
      ys.current = ROOMS.map((r, room) => {
        const el = document.getElementById(r.id);
        return el ? { room, y: r.id === 'top' ? 0 : el.getBoundingClientRect().top + window.scrollY } : null;
      }).filter(Boolean);
    }
    const s = st.current;
    s.target = pathPosition();
    s.u += (s.target - s.u) * Math.min(1, (still ? 1 : delta * 3.5));
    const u = clamp(s.u, 0, 0.9995);

    const p = curve.getPointAt(u);
    const t = curve.getTangentAt(u);
    const right = new THREE.Vector3().crossVectors(t, UP).normalize();
    const sway = still ? 0 : Math.sin(now * 0.35) * 0.12;
    const eye = p.clone().add(new THREE.Vector3(0, 0.3 + sway * 0.4, 0));
    const aim = eye.clone().addScaledVector(t, 7).addScaledVector(right, s.px * 1.4 + sway).addScaledVector(UP, -s.py * 0.7 - 0.15);
    camera.position.copy(eye);
    m4.lookAt(eye, aim, UP);
    q.setFromRotationMatrix(m4);
    camera.quaternion.slerp(q, still ? 1 : Math.min(1, delta * 5));
  });

  return (
    <>
      <fog attach="fog" args={[bg, 9, 52]} />
      <lineSegments geometry={corridor}>
        <lineBasicMaterial color={color} transparent opacity={0.42} />
      </lineSegments>
      {sculptures.map((r, i) => (
        <Sculpture key={r.id} kind={r.kind} position={r.pos} color={color} index={i} />
      ))}
    </>
  );
}

export default function WorldScene({ paused }) {
  const theme = useTheme();
  const color = theme === 'light' ? '#111218' : '#ffffff';
  const bg = theme === 'light' ? '#f6f5f1' : '#050508';
  const still = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const phone = useMemo(() => window.matchMedia('(max-width: 767px)').matches, []);
  return (
    <Canvas
      frameloop={paused ? 'never' : 'always'}
      camera={{ fov: phone ? 70 : 58, near: 0.1, far: 140, position: [0, 0.3, 0] }}
      dpr={phone ? 1 : [1, 2]}
      gl={{ powerPreference: 'high-performance', antialias: !phone, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <World color={color} bg={bg} still={still} />
    </Canvas>
  );
}
