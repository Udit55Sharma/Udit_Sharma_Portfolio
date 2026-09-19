'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { Project } from '@/content/profile';

/**
 * Projects live in a floating "?" block instead of a pipe. A pipe promises
 * a second underground level; a block promises an item, which is what a
 * project card actually is.
 *
 * The block is a TRIGGER ZONE, not a button: GameWorld watches the world
 * scroll past and sets `active` when Udit draws level with the block. Walking
 * into it strikes it — bump, camera kick, burst ring — and the project opens
 * on its own. Scrolling onward closes it again.
 */
export default function ProjectBlock({
  project,
  active = false,
  onHit,
}: {
  project: Project;
  /** True while the character is level with this block. */
  active?: boolean;
  /** Lets the world shake the camera when the block is struck. */
  onHit?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [bumping, setBumping] = useState(false);
  const [spent, setSpent] = useState(false);

  // Set when the visitor closes the card by hand. Stops it from immediately
  // springing back open while they are still standing in the trigger zone.
  const dismissed = useRef(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (active) {
      if (dismissed.current) return;

      // Strike the block the first time he reaches it.
      setSpent((wasSpent) => {
        if (!wasSpent) {
          setBumping(true);
          onHit?.();
          window.setTimeout(() => setBumping(false), 440);
        }
        return true;
      });
      setOpen(true);
    } else {
      // Left the zone — reset so a second pass triggers it again.
      dismissed.current = false;
      setOpen(false);
    }
  }, [active, onHit]);

  // Escape closes it. Note there is deliberately NO scroll lock: the card
  // opens and closes as you move, so trapping the page would strand you.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dismissed.current = true;
        setOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const closeByHand = () => {
    dismissed.current = true;
    setOpen(false);
  };

  return (
    <section
      className="relative h-full shrink-0"
      style={{ width: 'clamp(300px, 22vw, 400px)' }}
      aria-label={`Project: ${project.title}`}
      data-project={project.id}
    >
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{ bottom: 'calc(var(--ground-h) + 190px)' }}
      >
        <div data-reveal="block" className="flex flex-col items-center">
          <div className="font-display mb-3 text-[9px] text-white text-outline">
            {project.shortLabel}
          </div>

          <div className="relative">
            {bumping && (
              <span
                aria-hidden="true"
                className="burst pointer-events-none absolute inset-0 rounded-full border-4 border-[var(--coin)]"
              />
            )}

            <span
              className={[
                'qblock block',
                bumping ? 'bumping' : '',
                spent ? 'qblock-spent' : '',
              ].join(' ')}
              style={{ width: 76, height: 76, fontSize: 30 }}
              aria-hidden="true"
            >
              {spent ? '·' : '?'}
            </span>
          </div>

          <div className="mt-2 w-1.5 bg-black/25" style={{ height: 150 }} aria-hidden="true" />
        </div>
      </div>

      {/* Portalled to body: the track is transformed, and position:fixed
          inside a transformed ancestor anchors to that ancestor. */}
      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="false"
            aria-label={project.title}
            className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-5"
          >
            <div
              className="arcade-panel pointer-events-auto max-h-[86vh] w-full max-w-2xl p-8"
              style={{ '--panel-accent': 'var(--accent)' } as React.CSSProperties}
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="font-display text-[9px] text-[var(--accent)]">ITEM GET</div>
                  <h2
                    className="font-display neon mt-3 text-base leading-snug sm:text-lg"
                    style={{ '--neon-color': 'var(--accent)' } as React.CSSProperties}
                  >
                    {project.title}
                  </h2>
                  <p className="mt-2 text-[17px] text-[var(--muted-fg)]">{project.period}</p>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={closeByHand}
                  className="pixel-edge font-display shrink-0 cursor-pointer bg-[var(--primary)] px-3 py-2.5 text-[9px] text-white"
                >
                  EXIT
                </button>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>

              <ul className="mt-6 space-y-3">
                {project.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex gap-3 text-[18px] leading-relaxed text-[var(--muted-fg)]"
                  >
                    <span aria-hidden="true" className="mt-2.5 size-2 shrink-0 bg-[var(--accent)]" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex items-center gap-4">
                {project.href && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="pixel-edge font-display inline-block bg-[var(--accent)] px-4 py-3 text-[9px] text-[#0f172a]"
                  >
                    VIEW PROJECT
                  </a>
                )}
                <span className="font-display text-[8px] text-[var(--muted-fg)]">
                  KEEP SCROLLING TO CONTINUE
                </span>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
}
