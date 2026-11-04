/* Where each room hangs in space, and how the camera frames it.

   Every room is a flat panel. Its pose is a position (x right, y down, z toward the viewer, in px) and a yaw and
   pitch (degrees). The camera pose that looks at a room head-on is the inverse of that pose, so flying from one
   room to the next is a straight interpolation of five numbers: x, y, z, pitch, yaw. The path winds left and
   right and up and down, and every panel is turned a little differently, so each arrival is a new angle. */

const X = [0, 640, -560, 520, -620, 600, -480, 440, -380, 0];
const Y = [0, -110, 80, -120, 70, -90, 100, -60, 60, 0];
const YAW = [0, -26, 22, -20, 24, -22, 18, -16, 14, 0];
const PITCH = [0, 4, -3, 5, -4, 3, -4, 3, -2, 0];

export function poseFor(i, { compact, flat }) {
  if (flat) return { x: 0, y: 0, z: 0, rx: 0, ry: 0 };
  const k = i % X.length;
  // On a narrow screen the sideways offsets and angles shrink, so the panel stays readable and centred
  const s = compact ? 0.28 : 1;
  const gap = compact ? 900 : 1150;
  return { x: X[k] * s, y: Y[k] * (compact ? 0.5 : 1), z: -i * gap, rx: PITCH[k] * (compact ? 0.5 : 1), ry: YAW[k] * (compact ? 0.45 : 1) };
}

export const ease = (t) => t * t * (3 - 2 * t);
export const clamp = (n, a = 0, b = 1) => Math.min(b, Math.max(a, n));
export const lerp = (a, b, t) => a + (b - a) * t;
