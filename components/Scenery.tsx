'use client';

/**
 * Background dressing, split into depth layers. A seeded PRNG keeps every
 * element in the same place on each render so server and client markup agree.
 *
 * Layer speeds follow the standard parallax breakdown — far silhouettes at
 * ~20% of camera speed, mid terrain ~40-55%, near detail ~70%, and a
 * foreground band that outruns the world at ~115%. Speeds are applied in
 * GameWorld; this file only draws.
 */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Starfield. Held at opacity 0 by day and faded up toward night. */
export function Stars({ width }: { width: number }) {
  const rand = mulberry32(4242);
  const count = Math.ceil(width / 90);

  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const size = rand() < 0.16 ? 4 : 2;
        return (
          <div
            key={i}
            className="star"
            style={{
              left: i * 90 + rand() * 70,
              top: 20 + rand() * 340,
              width: size,
              height: size,
            }}
          />
        );
      })}
    </>
  );
}

/** Slowest layer: distant mountain silhouettes, low detail. */
export function Mountains({ width }: { width: number }) {
  const rand = mulberry32(777);
  const step = 460;
  const count = Math.ceil(width / step) + 2;

  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const w = 340 + rand() * 300;
        const h = 190 + rand() * 170;
        return (
          <div
            key={i}
            className="mountain"
            style={{ left: i * step + rand() * 160 - 200, width: w, height: h }}
          />
        );
      })}
    </>
  );
}

/** Mid layer: rolling hills in two tones for a bit of internal depth. */
export function Hills({ width }: { width: number }) {
  const rand = mulberry32(90210);
  const step = 430;
  const count = Math.ceil(width / step) + 2;

  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const w = 300 + rand() * 340;
        const h = 110 + rand() * 120;
        const far = rand() < 0.5;
        return (
          <div
            key={i}
            className="hill"
            style={{
              left: i * step + rand() * 180 - 150,
              width: w,
              height: h,
              background: far ? 'var(--hill-far)' : 'var(--hill-mid)',
              boxShadow: 'inset 0 -14px 0 rgba(0,0,0,0.12)',
            }}
          />
        );
      })}
    </>
  );
}

/** Near layer: trees and bushes with visible silhouettes. */
export function Trees({ width }: { width: number }) {
  const rand = mulberry32(31337);
  const step = 300;
  const count = Math.ceil(width / step) + 2;

  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const left = i * step + rand() * 140 - 100;
        const scale = 0.75 + rand() * 0.6;
        const trunkH = 54 * scale;
        const topW = 112 * scale;
        const topH = 96 * scale;
        const isBush = rand() < 0.38;

        if (isBush) {
          const w = 130 * scale;
          return (
            <div
              key={i}
              className="hill"
              style={{
                left,
                width: w,
                height: w * 0.44,
                background: 'var(--hill-near)',
              }}
            />
          );
        }

        return (
          <div key={i}>
            <div
              className="tree-trunk"
              style={{ left: left + topW / 2 - 9 * scale, width: 18 * scale, height: trunkH }}
            />
            <div
              className="tree-top"
              style={{
                left,
                bottom: `calc(var(--ground-h) + ${trunkH - 12}px)`,
                width: topW,
                height: topH,
                position: 'absolute',
                background: 'var(--hill-near)',
                boxShadow: 'inset -10px -12px 0 rgba(0,0,0,0.14)',
              }}
            />
          </div>
        );
      })}
    </>
  );
}

/** Foreground band. Runs faster than the world, which sells the depth. */
export function Foreground({ width }: { width: number }) {
  const rand = mulberry32(555);
  const step = 190;
  const count = Math.ceil(width / step) + 2;

  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const w = 90 + rand() * 120;
        return (
          <div
            key={i}
            className="tuft"
            style={{ left: i * step + rand() * 90 - 80, width: w, height: 30 + rand() * 26 }}
          />
        );
      })}
    </>
  );
}

/** Drifting clouds, sized in three lobes. */
export function Clouds({ width }: { width: number }) {
  const rand = mulberry32(1337);
  const step = 430;
  const count = Math.ceil(width / step) + 2;

  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const left = i * step + rand() * 220;
        const top = 30 + rand() * 210;
        const scale = 0.7 + rand() * 0.8;
        const w = 130 * scale;
        const h = 42 * scale;

        return (
          <div key={i} style={{ position: 'absolute', left, top, opacity: 0.95 }}>
            <div className="cloud" style={{ width: w, height: h }} />
            <div
              className="cloud"
              style={{ width: w * 0.6, height: h * 0.95, left: w * 0.13, top: -h * 0.45 }}
            />
            <div
              className="cloud"
              style={{ width: w * 0.46, height: h * 0.78, left: w * 0.56, top: -h * 0.26 }}
            />
          </div>
        );
      })}
    </>
  );
}
