'use client';

import { useEffect, useRef, useState } from 'react';
import { coinTargets, profile } from '@/content/profile';

/**
 * Arcade HUD. Coins tally toward his LeetCode count as the player moves
 * right, so the number lands on 500 at the end of the world, and the
 * counter pops each time it ticks over.
 */
export default function Hud({
  progress,
  world,
  title,
  phase,
}: {
  progress: number;
  world: string;
  title: string;
  phase: string;
}) {
  const coins = Math.round(progress * coinTargets.leetcode);

  // Retrigger the pop animation whenever the displayed value changes.
  const [pop, setPop] = useState(0);
  const last = useRef(coins);
  useEffect(() => {
    if (coins !== last.current) {
      last.current = coins;
      setPop((n) => n + 1);
    }
  }, [coins]);

  return (
    // The bar itself ignores pointer events so it never blocks scrolling;
    // only the resume button opts back in.
    <div className="pointer-events-none fixed inset-x-0 top-0 z-40 px-5 pt-5 sm:px-8 sm:pt-6">
      <div className="flex items-start justify-between gap-6">
        {/* player */}
        <div className="hud-plate font-display text-outline text-white">
          <div className="text-sm sm:text-lg">{profile.name.toUpperCase()}</div>
          <div className="mt-2 text-[9px] opacity-90 sm:text-[10px]">{profile.role}</div>
        </div>

        <div className="flex items-start gap-4 sm:gap-6">
          {/* level */}
          <div className="hud-plate font-display text-outline max-w-[300px] text-right text-white">
            <div className="text-[10px] sm:text-xs">WORLD {world}</div>
            <div className="mt-2 text-[9px] leading-relaxed opacity-95">{title}</div>
            <div className="mt-2 text-[8px] uppercase" style={{ color: 'var(--coin)' }}>
              {phase}
            </div>
          </div>

          {/* score */}
          <div className="hud-plate font-display text-outline text-white">
            <div className="flex items-center justify-end gap-2.5">
              <span
                className="coin-spin inline-block size-4 rounded-full border-[3px]"
                style={{ background: 'var(--coin)', borderColor: 'var(--coin-dark)' }}
              />
              <span
                key={pop}
                className="score-pop inline-block text-sm tabular-nums sm:text-base"
                style={{ color: 'var(--coin)' }}
              >
                {String(coins).padStart(3, '0')}
              </span>
            </div>
            <div className="mt-2 text-right text-[8px] opacity-80">LEETCODE SOLVED</div>
          </div>

          {/* resume — same plate, but this one is a real control */}
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className="hud-plate hud-action font-display text-outline pointer-events-auto block cursor-pointer text-white"
            aria-label={`Open ${profile.name}'s resume as a PDF in a new tab`}
          >
            <div className="flex items-center justify-end gap-2.5">
              {/* page-with-fold mark, drawn rather than an emoji */}
              <svg
                viewBox="0 0 12 14"
                width="14"
                height="16"
                aria-hidden="true"
                shapeRendering="crispEdges"
                className="shrink-0"
              >
                <path d="M0 0h8l4 4v10H0z" fill="var(--accent)" />
                <path d="M8 0l4 4H8z" fill="#0f172a" opacity=".45" />
                <path d="M2 6h8v1H2zM2 8h8v1H2zM2 10h5v1H2z" fill="#0f172a" opacity=".65" />
              </svg>
              <span className="text-sm sm:text-base" style={{ color: 'var(--accent)' }}>
                RESUME
              </span>
            </div>
            <div className="mt-2 text-right text-[8px] opacity-80">VIEW PDF</div>
          </a>
        </div>
      </div>
    </div>
  );
}
