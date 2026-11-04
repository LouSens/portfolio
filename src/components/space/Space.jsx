import React, { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { poseFor, ease, clamp, lerp } from './poses';
import { setActiveRoom } from '../../utils/roomStore';

/* The home page on large screens: a walk through a gallery.

   One tall scroll area holds a sticky stage. On the stage every room is a panel hung in CSS 3D (the text stays real,
   selectable HTML). For each room the scroll does four things in turn:
     1. TRAVEL  the camera flies from the previous room (short, calm, one panel leaves while the next arrives)
     2. SETTLE  the camera has arrived; nothing moves, so you can take the room in
     3. DWELL   the room's own content moves: tall rooms scroll inside the panel, the projects strip slides, the stack
                steps through its layers
     4. REST    the content has finished; nothing moves again before the next flight
   At rest only the current panel is visible: no neighbour is ghosted behind it. During a flight the leaving panel fades
   out as the arriving one fades in. */

const RoomCtx = createContext({ goTo: () => {} });
export const useRoom = () => useContext(RoomCtx);

const TRAVEL = 0.7; // screens of scroll for a flight
const SETTLE = 0.3; // screens held after arriving
const REST = 0.45; // screens held after the content ends

const Panel = React.memo(function Panel({ index, pose, dims, room, shown, active, progress, dwellPx, onAutoHeight, children }) {
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

  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    if (active) el.removeAttribute('inert');
    else el.setAttribute('inert', '');
  }, [active]);

  const transform = `translate3d(${pose.x}px, ${pose.y}px, ${pose.z}px) rotateY(${pose.ry}deg)`;

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
        opacity: shown,
        transition: 'opacity 0.28s ease',
        visibility: shown > 0.01 ? 'visible' : 'hidden',
        pointerEvents: active ? 'auto' : 'none',
        backfaceVisibility: 'hidden',
      }}
      className={
        'space-panel ' +
        (room.bare ? '' : 'rounded-[28px] border border-white/[0.12] bg-canvas shadow-[0_40px_90px_rgba(0,0,0,0.3)] overflow-hidden')
      }
    >
      {auto ? (
        <motion.div ref={inner} style={{ y, willChange: 'transform' }} className="absolute inset-x-0 top-0">
          {children({ progress, active })}
        </motion.div>
      ) : (
        <div ref={inner} className="absolute inset-0">
          {children({ progress, active })}
        </div>
      )}
      {auto && !room.bare && <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-canvas to-transparent" />}
    </motion.section>
  );
});

const RoomPanel = React.memo(function RoomPanel({ index, room, pose, seg, dims, shown, active, yPx, dwellPx, onAutoHeight, onDwell }) {
  const segRef = useRef(seg);
  segRef.current = seg;
  const progress = useTransform(yPx, (y) => clamp((y - segRef.current.dwellStart) / Math.max(1, segRef.current.dwell)));
  return (
    <Panel index={index} pose={pose} dims={dims} room={room} shown={shown} active={active} progress={progress} dwellPx={dwellPx} onAutoHeight={onAutoHeight}>
      {(state) => room.render({ ...state, onDwell, dims })}
    </Panel>
  );
});

function measure() {
  const vw = typeof window === 'undefined' ? 1280 : window.innerWidth;
  const vh = typeof window === 'undefined' ? 800 : window.innerHeight;
  return { vw, vh, pw: Math.min(1180, vw - 96), ph: Math.min(vh - 120, 820) };
}

export default function Space({ rooms }) {
  const sectionRef = useRef(null);
  const [dims, setDims] = useState(measure);
  const [heights, setHeights] = useState({});
  // Where the camera is between rooms, in eighths: the panels cross-fade in a few steps, so nothing writes styles every frame
  const [pos, setPos] = useState(0);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    // Resize events can arrive in bursts: take the last one per frame and ignore it if nothing changed
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

  // Rooms report how far they need to scroll. Reports are applied once per frame, with a tolerance, so they cannot
  // trigger each other in a chain.
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
  const dwellers = useMemo(() => Object.fromEntries(rooms.map((r) => [r.id, (h) => onAutoHeight(r.id, h)])), [rooms, onAutoHeight]);

  // The scroll timeline
  const layout = useMemo(() => {
    const vh = dims.vh;
    const poses = rooms.map((_, i) => poseFor(i));
    const segs = [];
    let at = 0;
    rooms.forEach((r, i) => {
      const travel = i === 0 ? 0 : vh * TRAVEL;
      const dwell = Math.max(0, heights[r.id] ?? 0);
      const arrive = at + travel;
      const dwellStart = arrive + vh * SETTLE;
      const dwellEnd = dwellStart + dwell;
      const end = dwellEnd + vh * REST;
      segs.push({ travelStart: at, arrive, dwellStart, dwellEnd, travel, dwell, end });
      at = end;
    });
    return { poses, segs, total: at };
  }, [rooms, dims.vh, heights]);

  const layoutRef = useRef(layout);
  layoutRef.current = layout;
  useLayoutEffect(() => {
    if (sectionRef.current) sectionRef.current.style.height = `${layout.total + dims.vh}px`;
  }, [layout.total, dims.vh]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const yPx = useTransform(scrollYProgress, (p) => p * layoutRef.current.total);

  // Which room, as a float: 2.4 is 40% of the way from room 2 to room 3
  const roomFloat = useTransform(yPx, (y) => {
    const { segs } = layoutRef.current;
    for (let i = 0; i < segs.length; i++) {
      const s = segs[i];
      if (y < s.arrive) return i - 1 + (s.travel ? clamp((y - s.travelStart) / s.travel) : 1);
      if (y <= s.end) return i;
    }
    return segs.length - 1;
  });
  useMotionValueEvent(roomFloat, 'change', (r) => {
    const q = Math.round(r * 8) / 8;
    setPos((p) => (p === q ? p : q));
    setCurrent((c) => (Math.abs(r - c) > 0.55 ? Math.round(r) : c));
  });
  useEffect(() => {
    setActiveRoom(rooms[current]?.id || 'hero');
  }, [current, rooms]);

  // The camera
  const camera = useTransform(yPx, (y) => {
    const { segs, poses } = layoutRef.current;
    let i = 0;
    while (i < segs.length - 1 && y > segs[i].end) i++;
    const s = segs[i];
    let pose = poses[i];
    let t = 0;
    let dir = 1;
    if (y < s.arrive && i > 0) {
      t = ease(clamp((y - s.travelStart) / s.travel));
      const a = poses[i - 1];
      const b = poses[i];
      pose = { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t), z: lerp(a.z, b.z, t), rx: 0, ry: lerp(a.ry, b.ry, t) };
      dir = Math.sign(b.x - a.x) || 1;
    }
    const arc = Math.sin(Math.PI * t);
    return `translateZ(${-arc * 200}px) rotateZ(${arc * -0.7 * dir}deg) rotateY(${-pose.ry + arc * 3 * dir}deg) translate3d(${-pose.x}px, ${-pose.y}px, ${-pose.z}px)`;
  });

  const goTo = useCallback(
    (id) => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
    []
  );
  const ctx = useMemo(() => ({ goTo }), [goTo]);

  return (
    <RoomCtx.Provider value={ctx}>
      <div ref={sectionRef} className="relative">
        <div className="sticky top-0 h-[100svh] overflow-hidden" style={{ perspective: 1400, perspectiveOrigin: '50% 46%' }}>
          <motion.div style={{ position: 'absolute', left: '50%', top: '50%', width: 0, height: 0, transformStyle: 'preserve-3d', transform: camera, willChange: 'transform' }}>
            {rooms.map((room, i) => (
              <RoomPanel
                key={room.id}
                index={i}
                room={room}
                pose={layout.poses[i]}
                seg={layout.segs[i]}
                dims={dims}
                shown={clamp(1 - Math.abs(pos - i) * 1.7)}
                active={pos === i}
                yPx={yPx}
                dwellPx={heights[room.id] ?? 0}
                onAutoHeight={onAutoHeight}
                onDwell={dwellers[room.id]}
              />
            ))}
          </motion.div>
        </div>

        {/* Markers at the start of each room's settle: the ids the navbar and links jump to */}
        {rooms.map((r, i) => (
          <div key={r.id} id={r.id === 'hero' ? 'top-room' : r.id} aria-hidden="true" style={{ position: 'absolute', left: 0, top: layout.segs[i].arrive, width: 1, height: 1 }} />
        ))}
      </div>
    </RoomCtx.Provider>
  );
}

/* If anything in the space ever throws, hand over to the light page instead of leaving a blank screen. */
export class SpaceGuard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    const { fallback, ...rest } = this.props;
    return this.state.failed ? fallback : <Space {...rest} />;
  }
}
