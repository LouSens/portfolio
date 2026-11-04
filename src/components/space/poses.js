/* Where each room hangs in space.

   A room is a flat panel with a pose: position (x right, y down, z toward the viewer, px) and a yaw and pitch
   (degrees). The camera pose that looks at a room head-on is the inverse of that pose, so flying between rooms is a
   straight interpolation of five numbers. The path goes steadily forward, with small alternating turns left and
   right: enough to read as a move through a space, not enough to make a panel hard to read on arrival. */

const X = [0, 300, -300, 300, -300, 300, -300, 300, -300, 0];
const Y = [0, -30, 30, -30, 30, -30, 30, -30, 30, 0];
const YAW = [0, -9, 9, -9, 9, -9, 9, -9, 9, 0];

export function poseFor(i) {
  const k = i % X.length;
  return { x: X[k], y: Y[k], z: -i * 1000, rx: 0, ry: YAW[k] };
}

export const ease = (t) => t * t * (3 - 2 * t);
export const clamp = (n, a = 0, b = 1) => Math.min(b, Math.max(a, n));
export const lerp = (a, b, t) => a + (b - a) * t;
