'use client';

import Image from 'next/image';
import type { Checkpoint } from '@/content/profile';

/** Gap between the ground and the bottom of the card — clears the character. */
const CARD_LIFT = 104;

/** Each level gets its own accent so the world reads as distinct stages. */
const ACCENTS: Record<string, string> = {
  glbajaj: 'var(--secondary)',
  amazon: 'var(--coin)',
  'maq-intern': 'var(--primary)',
  'maq-se1': 'var(--accent)',
};

/**
 * One level of the world: a dark arcade panel on the left, the
 * organisation's signboard planted on the ground to the right, and
 * floating coins overhead.
 */
export default function CheckpointPanel({ checkpoint }: { checkpoint: Checkpoint }) {
  const { id, world, title, org, period, location, logo, intro, bullets, powerUps, stats } =
    checkpoint;

  // Two columns once there is enough to say — keeps tall cards off the HUD.
  const twoCol = bullets.length > 2;
  const accent = ACCENTS[id] ?? 'var(--secondary)';

  return (
    <section
      className="relative h-full shrink-0"
      style={{ width: 'clamp(1040px, 94vw, 1460px)' }}
      aria-label={`${org} — ${period}`}
      data-world={world}
      data-title={org}
    >
      {/* Signboard and card travel together as one unit, so the space
          between them is a fixed gap rather than whatever is left over
          between two opposite panel edges. */}
      <div
        className="absolute flex items-end gap-10"
        style={{ left: '14%', bottom: 'var(--ground-h)' }}
      >
        {/* signboard on a post, standing on the ground */}
        {logo && (
          <div className="flex shrink-0 flex-col items-center" data-reveal="sign">
            <div className="signboard">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={520}
                height={120}
                unoptimized
                className="h-14 w-auto max-w-[320px] object-contain"
              />
            </div>
            <div className="sign-post h-36" />
          </div>
        )}

        {/* content card, floated clear of the ground */}
        <article
          className="arcade-panel p-6"
          style={
            {
              marginBottom: `${CARD_LIFT}px`,
              width: twoCol ? 'min(58vw, 800px)' : 'min(44vw, 620px)',
              '--panel-accent': accent,
            } as React.CSSProperties
          }
          data-reveal="card"
        >
        <div className="font-display text-[10px]" style={{ color: accent }}>
          WORLD {world}
        </div>

        <h2
          className="font-display neon mt-2.5 text-base leading-snug"
          style={{ '--neon-color': accent } as React.CSSProperties}
        >
          {title}
        </h2>

        <p className="mt-2.5 text-[20px] font-bold leading-snug text-[var(--fg)]">{org}</p>
        <p className="mt-0.5 text-[17px] text-[var(--muted-fg)]">
          {period}
          {location ? ` · ${location}` : ''}
        </p>

        {intro && (
          <p className="mt-2.5 text-[18px] leading-[1.45] text-[var(--muted-fg)]">{intro}</p>
        )}

        {bullets.length > 0 && (
          <ul className={`mt-3 ${twoCol ? 'columns-2 gap-x-6' : ''}`}>
            {bullets.map((b) => (
              <li
                key={b}
                className="flex break-inside-avoid gap-2.5 pb-2 text-[17px] leading-[1.45] text-[var(--muted-fg)]"
              >
                <span
                  aria-hidden="true"
                  className="mt-2.5 size-2 shrink-0"
                  style={{ background: accent }}
                />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}

        {(powerUps.length > 0 || stats.length > 0) && (
          <div
            className="mt-4 border-t-2 border-dashed pt-3.5"
            style={{ borderColor: 'var(--border)' }}
          >
            {powerUps.length > 0 && (
              <>
                <div className="font-display text-[8px] text-[var(--muted-fg)]">COLLECTED</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {powerUps.map((p) => (
                    <span key={p} className="chip">
                      {p}
                    </span>
                  ))}
                </div>
              </>
            )}

            {stats.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-3">
                {stats.map((s) => (
                  <div key={s.label} className="score-tile px-3.5 py-2">
                    <div className="font-display text-[8px] opacity-80">
                      {s.label.toUpperCase()}
                    </div>
                    <div className="font-display mt-1.5 text-xs">{s.value}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        </article>
      </div>
    </section>
  );
}
