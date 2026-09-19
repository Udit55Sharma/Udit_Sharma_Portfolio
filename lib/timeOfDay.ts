/**
 * The level runs through a day. Scroll progress (0..1) drives the sky and
 * terrain colours, so the player starts at sunrise outside college and
 * arrives at the castle under stars.
 *
 * Only decorative colour is interpolated here — never text or contrast-
 * carrying UI, which stays on the fixed dark arcade palette.
 */

export type Phase = {
  at: number;
  label: string;
  skyTop: string;
  skyMid: string;
  skyLow: string;
  mtn: string;
  hillFar: string;
  hillMid: string;
  hillNear: string;
  grass: string;
  grassDark: string;
  groundFace: string;
  groundDark: string;
  /** How visible the starfield is at this phase. */
  stars: number;
};

export const PHASES: Phase[] = [
  {
    at: 0,
    label: 'dawn',
    skyTop: '#2e5f8f',
    skyMid: '#8a9fc4',
    skyLow: '#f3b98a',
    mtn: '#5b6f93',
    hillFar: '#3f7a52',
    hillMid: '#356b48',
    hillNear: '#28563a',
    grass: '#3f8f4a',
    grassDark: '#276033',
    groundFace: '#9c5626',
    groundDark: '#6b3714',
    stars: 0.35,
  },
  {
    at: 0.14,
    label: 'morning',
    skyTop: '#63b1f0',
    skyMid: '#8fd0fb',
    skyLow: '#c8e9ff',
    mtn: '#6f8fb8',
    hillFar: '#4f9a52',
    hillMid: '#458a48',
    hillNear: '#35703a',
    grass: '#4cb04c',
    grassDark: '#2f7a34',
    groundFace: '#c96a2b',
    groundDark: '#8f4519',
    stars: 0,
  },
  {
    at: 0.52,
    label: 'golden hour',
    skyTop: '#5a84c9',
    skyMid: '#f0a86a',
    skyLow: '#ffd9a0',
    mtn: '#8a7fa0',
    hillFar: '#5f9450',
    hillMid: '#4f8044',
    hillNear: '#3c6437',
    grass: '#59a845',
    grassDark: '#377031',
    groundFace: '#c9702f',
    groundDark: '#8a4519',
    stars: 0,
  },
  {
    at: 0.76,
    label: 'dusk',
    skyTop: '#2b2a5e',
    skyMid: '#6b4a86',
    skyLow: '#d4785f',
    mtn: '#4a4670',
    hillFar: '#3a5c47',
    hillMid: '#2f4c3c',
    hillNear: '#243c30',
    grass: '#35704a',
    grassDark: '#1f4a30',
    groundFace: '#8a4d28',
    groundDark: '#5a2f16',
    stars: 0.55,
  },
  {
    at: 1,
    label: 'night',
    skyTop: '#080d20',
    skyMid: '#131b3a',
    skyLow: '#26305c',
    mtn: '#2a3153',
    hillFar: '#1e3830',
    hillMid: '#182c27',
    hillNear: '#12211e',
    grass: '#1d4a33',
    grassDark: '#123020',
    groundFace: '#4a2c1a',
    groundDark: '#2c1a0f',
    stars: 1,
  },
];

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function mix(a: string, b: string, t: number): string {
  const [r1, g1, b1] = hexToRgb(a);
  const [r2, g2, b2] = hexToRgb(b);
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const bl = Math.round(b1 + (b2 - b1) * t);
  return `rgb(${r},${g},${bl})`;
}

export type SkyState = Record<string, string>;

/** Blend the two phases bracketing `progress` into CSS custom properties. */
export function skyAt(progress: number): SkyState {
  const p = Math.min(1, Math.max(0, progress));

  let lo = PHASES[0];
  let hi = PHASES[PHASES.length - 1];
  for (let i = 0; i < PHASES.length - 1; i += 1) {
    if (p >= PHASES[i].at && p <= PHASES[i + 1].at) {
      lo = PHASES[i];
      hi = PHASES[i + 1];
      break;
    }
  }

  const span = hi.at - lo.at;
  const t = span === 0 ? 0 : (p - lo.at) / span;

  return {
    '--sky-top': mix(lo.skyTop, hi.skyTop, t),
    '--sky-mid': mix(lo.skyMid, hi.skyMid, t),
    '--sky-low': mix(lo.skyLow, hi.skyLow, t),
    '--mtn': mix(lo.mtn, hi.mtn, t),
    '--hill-far': mix(lo.hillFar, hi.hillFar, t),
    '--hill-mid': mix(lo.hillMid, hi.hillMid, t),
    '--hill-near': mix(lo.hillNear, hi.hillNear, t),
    '--grass': mix(lo.grass, hi.grass, t),
    '--grass-dark': mix(lo.grassDark, hi.grassDark, t),
    '--ground-face': mix(lo.groundFace, hi.groundFace, t),
    '--ground-dark': mix(lo.groundDark, hi.groundDark, t),
    '--star-opacity': String(lo.stars + (hi.stars - lo.stars) * t),
  };
}
