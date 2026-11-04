import React, { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import IsoObject from '../iso/IsoObject';
import { poseFor, ease, clamp, lerp } from './poses';

/* The home page as a place you move through.

   One tall scroll area holds a sticky stage. On the stage, every room is a panel hung in 3D space (CSS 3D, so
   the text stays real, selectable HTML). Scrolling does two things in turn for each room:
     1. TRAVEL: the camera flies from the previous room to this one (position, pitch, yaw, with a pull-back and a
        swing in the middle so the move reads as a camera move, not a slide).
     2. DWELL:  the camera holds, and the room's own content moves: a tall room scrolls inside its panel, the
        projects strip slides sideways, the tech stack steps through its layers. The next room cannot be reached
        until the dwell is finished.
   Each room gets `progress` (0 to 1 over its dwell) and `near`/`active` flags. */

const RoomCtx = createContext({ goTo: () => {} });
export const useRoom = () => useContext(RoomCtx);

// Flat mode: no camera flight, panels just swap. For reduced motion, and `?flat` in the address as an escape hatch.
const reduced = typeof window !== 'undefined' && (window.matchMedia('(prefers-reduced-motion: reduce)').matches || /[?&]flat\b/.test(window.location.search));

const Panel = React.memo(function Panel({ index, pose, dims, room, active, near, progress, dwellPx, onAutoHeight, children }) {
  const inner = useRef(null);
  const frame = useRef(null);
  const auto = room.dwell === 'auto';

  // Tall rooms: measure the content, and move it up as the dwell progresses
  useLayoutEffect(() => {
    if (!auto || !inner.current) return undefined;
    const el = inner.current;
    const report = () => onAutoHeight(room.id, Math.max(0, el.scrollHeight - dims.ph));
    report();
    const ro = new ResizeObserver(report);
    ro.observe(el);
    return () => ro.disconnect();
  }, [auto, dims.ph, room.id, onAutoHeight]);

  const y = useTransform(progress, (p) => (auto ? -p * dwellPx : 0));

  // Rooms that are not in front cannot be focused or clicked
  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    if (active) el.removeAttribute('inert');
    else el.setAttribute('inert', '');
  }, [active]);

  const transform = `translate3d(${pose.x}px, ${pose.y}px, ${pose.z}px) rotateY(${pose.ry}deg) rotateX(${pose.rx}deg)`;

  return (
    <motion.section
      ref={frame}
      aria-label={room.label}
      aria-hidden={!active}
      style={{
        position: 'absolute',
        left: -dims.pw / 2,
        top: -dims.ph / 2 + 34,
        width: dims.pw,
        height: dims.ph,
        transform,
        // Dimming is a CSS transition between three states, not a per-frame style write: writing opacity on every
        // scroll frame forces the whole 3D layer to be redrawn, which shows up as flicker.
        opacity: active ? 1 : near ? 0.3 : 0,
        transition: 'opacity 0.4s ease',
        visibility: near ? 'visible' : 'hidden',
        pointerEvents: active ? 'auto' : 'none',
        backfaceVisibility: 'hidden',
      }}
      className={
        'space-panel ' +
        (room.bare
          ? ''
          : 'rounded-[28px] border border-white/[0.12] bg-canvas shadow-[0_40px_90px_rgba(0,0,0,0.35)] overflow-hidden')
      }
    >
      {auto ? (
        <motion.div ref={inner} style={{ y, willChange: 'transform' }} className="absolute inset-x-0 top-0">
          {children({ progress, active, near })}
        </motion.div>
      ) : (
        <div ref={inner} className="absolute inset-0">
          {children({ progress, active, near })}
        </div>
      )}
      {/* A soft edge so a tall room fades into its frame instead of being cut */}
      {auto && !room.bare && <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-canvas to-transparent" />}
    </motion.section>
  );
});

export default function Space({ rooms, sculptures = [], forceFlat = false }) {
  const sectionRef = useRef(null);
  const [dims, setDims] = useState(() => measure());
  const [heights, setHeights] = useState({}); // dwell distance reported by each room (px)
  const [current, setCurrent] = useState(0);
  const mode = useMemo(() => ({ compact: dims.vw < 768, flat: reduced || forceFlat }), [dims.vw, forceFlat]);

  function measure() {
    const vw = typeof window === 'undefined' ? 1280 : window.innerWidth;
    const vh = typeof window === 'undefined' ? 800 : window.innerHeight;
    return { vw, vh, pw: Math.min(1180, vw * 0.94), ph: Math.min(vh - 104, 840) };
  }
  useEffect(() => {
    // Resize events can arrive in bursts (DevTools docking, a phone's address bar): take the last one per frame,
    // and ignore it if nothing changed, so a burst can never become a chain of renders.
    let frame = 0;
    const on = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const next = measure();
        setDims((d) => (Math.abs(d.vw - next.vw) < 2 && Math.abs(d.vh - next.vh) < 2 ? d : next));
      });
    };
    window.addEventListener('resize', on);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', on);
    };
  }, []);

  // Rooms report how far they need to scroll from layout effects and resize observers. Collect the reports and apply
  // them once per frame, with a tolerance, so reports can never trigger each other in a synchronous chain.
  const pending = useRef({});
  const flush = useRef(0);
  const onAutoHeight = useCallback((id, h) => {
    pending.current[id] = h;
    if (flush.current) return;
    flush.current = requestAnimationFrame(() => {
      flush.current = 0;
      const batch = pending.current;
      pending.current = {};
      setHeights((s) => {
        let next = s;
        Object.entries(batch).forEach(([k, v]) => {
          if (Math.abs((s[k] ?? 0) - v) >= 4) next = { ...next, [k]: v };
        });
        return next;
      });
    });
  }, []);
  useEffect(() => () => cancelAnimationFrame(flush.current), []);
  const onDwell = useCallback((id) => (h) => onAutoHeight(id, h), [onAutoHeight]);

  // The scroll timeline: for each room, a travel segment then a dwell segment
  const layout = useMemo(() => {
    const travelLen = (i) => (i === 0 ? 0 : dims.vh * (mode.flat ? 0.25 : 0.75));
    const poses = rooms.map((_, i) => poseFor(i, mode));
    const segs = [];
    let at = 0;
    rooms.forEach((r, i) => {
      const t = travelLen(i);
      const d = Math.max(dims.vh * 0.18, heights[r.id] ?? 0);
      segs.push({ travelStart: at, dwellStart: at + t, dwellEnd: at + t + d, travel: t, dwell: d });
      at += t + d;
    });
    return { poses, segs, total: at };
  }, [rooms, dims, heights, mode]);

  const layoutRef = useRef(layout);
  layoutRef.current = layout;
  useLayoutEffect(() => {
    if (sectionRef.current) sectionRef.current.style.height = `${layout.total + dims.vh}px`;
  }, [layout.total, dims.vh]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const yPx = useTransform(scrollYProgress, (p) => p * layoutRef.current.total);

  // Which room (as a float: 2.4 means 40% of the way from room 2 to room 3)
  const roomFloat = useTransform(yPx, (y) => {
    const { segs } = layoutRef.current;
    for (let i = 0; i < segs.length; i++) {
      const s = segs[i];
      if (y < s.dwellStart) return i - 1 + (s.travel ? clamp((y - s.travelStart) / s.travel) : 1);
      if (y <= s.dwellEnd) return i;
    }
    return segs.length - 1;
  });
  // Only switch rooms once clearly past the halfway point, so a scroll resting near it cannot flip back and forth
  useMotionValueEvent(roomFloat, 'change', (r) => setCurrent((c) => (Math.abs(r - c) > 0.62 ? Math.round(r) : c)));

  // The camera: interpolate the pose, with a pull-back and a swing in the middle of each move
  const camera = useTransform(yPx, (y) => {
    const { segs, poses } = layoutRef.current;
    let i = 0;
    while (i < segs.length - 1 && y > segs[i].dwellEnd) i++;
    const s = segs[i];
    let pose = poses[i];
    let t = 0;
    let dir = 1;
    if (y < s.dwellStart && i > 0) {
      t = ease(clamp((y - s.travelStart) / s.travel));
      const a = poses[i - 1];
      const b = poses[i];
      pose = { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t), z: lerp(a.z, b.z, t), rx: lerp(a.rx, b.rx, t), ry: lerp(a.ry, b.ry, t) };
      dir = Math.sign(b.x - a.x) || 1;
    }
    const arc = Math.sin(Math.PI * t);
    const pull = mode.flat ? 0 : arc * (mode.compact ? 260 : 460);
    const swing = mode.flat ? 0 : arc * 9 * dir * (mode.compact ? 0.5 : 1);
    const roll = mode.flat ? 0 : arc * -1.6 * dir;
    return `translateZ(${-pull}px) rotateZ(${roll}deg) rotateX(${-pose.rx}deg) rotateY(${-pose.ry + swing}deg) translate3d(${-pose.x}px, ${-pose.y}px, ${-pose.z}px)`;
  });

  // Anchors so the navbar and the dots can jump to a room by id
  const goTo = useCallback((id, p = 0) => {
    const i = rooms.findIndex((r) => r.id === id);
    const s = layoutRef.current.segs[i];
    if (!s || !sectionRef.current) return;
    const top = sectionRef.current.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + s.dwellStart + p * s.dwell, behavior: 'smooth' });
  }, [rooms]);
  const ctx = useMemo(() => ({ goTo }), [goTo]);

  return (
    <RoomCtx.Provider value={ctx}>
      <div ref={sectionRef} className="relative">
        <div className="sticky top-0 h-[100svh] overflow-hidden" style={{ perspective: mode.compact ? 900 : 1500, perspectiveOrigin: '50% 46%' }}>
          <motion.div style={{ position: 'absolute', left: '50%', top: '50%', width: 0, height: 0, transformStyle: 'preserve-3d', transform: camera, willChange: 'transform' }}>
            {/* Sculptures hung between rooms: seen in passing as the camera flies by */}
            {!mode.flat &&
              sculptures.map((s, i) => (
                <div
                  key={i}
                  aria-hidden="true"
                  className="sculpture"
                  data-live={Math.abs(Math.round(-s.z / (mode.compact ? 900 : 1150)) - current) <= 1 ? 'true' : 'false'}
                  style={{
                    willChange: 'transform',
                    position: 'absolute',
                    left: -s.size / 2,
                    top: -s.size / 2,
                    width: s.size * (mode.compact ? 0.6 : 1),
                    height: s.size * (mode.compact ? 0.6 : 1),
                    transform: `translate3d(${s.x * (mode.compact ? 0.4 : 1)}px, ${s.y}px, ${s.z * (mode.compact ? 0.78 : 1)}px) rotateY(${s.ry ?? 0}deg)`,
                    opacity: 0.9,
                  }}
                >
                  <IsoObject kind={s.kind} className="w-full h-full" />
                </div>
              ))}

            {rooms.map((room, i) => (
              <RoomPanel
                key={room.id}
                index={i}
                room={room}
                pose={layout.poses[i]}
                seg={layout.segs[i]}
                dims={dims}
                active={current === i}
                near={Math.abs(current - i) <= 1}
                yPx={yPx}
                dwellPx={heights[room.id] ?? 0}
                onAutoHeight={onAutoHeight}
                onDwell={onDwell(room.id)}
              />
            ))}
          </motion.div>
        </div>

        {/* Invisible markers at the start of each room's dwell: ids the rest of the site already jumps to */}
        {rooms.map((r, i) => (
          <div key={r.id} id={r.id === 'hero' ? 'top-room' : r.id} aria-hidden="true" style={{ position: 'absolute', left: 0, top: layout.segs[i].dwellStart, width: 1, height: 1 }} />
        ))}
      </div>
    </RoomCtx.Provider>
  );
}

const RoomPanel = React.memo(function RoomPanel({ index, room, pose, seg, dims, active, near, yPx, dwellPx, onAutoHeight, onDwell }) {
  const segRef = useRef(seg);
  segRef.current = seg;
  const progress = useTransform(yPx, (y) => clamp((y - segRef.current.dwellStart) / Math.max(1, segRef.current.dwell)));
  return (
    <Panel index={index} pose={pose} dims={dims} room={room} active={active} near={near} progress={progress} dwellPx={dwellPx} onAutoHeight={onAutoHeight}>
      {(state) => room.render({ ...state, onDwell, dims })}
    </Panel>
  );
});

/* If anything in the space ever throws, fall back to the flat version (no camera flight) instead of a blank page. */
export class SpaceGuard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { failures: 0 };
  }

  static getDerivedStateFromError() {
    return null;
  }

  componentDidCatch() {
    this.setState((s) => ({ failures: s.failures + 1 }));
  }

  render() {
    const { failures } = this.state;
    if (failures >= 2) {
      return <div className="min-h-[60svh] flex items-center justify-center text-sm text-white/60 px-6 text-center">Something went wrong loading this page. Please refresh.</div>;
    }
    return <Space key={failures} {...this.props} forceFlat={failures > 0} />;
  }
}
