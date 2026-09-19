'use client';

import Image from 'next/image';

export type HeroState = 'idle' | 'run';

/** On-screen height of the character, in px. */
export const HERO_HEIGHT = 140;

/**
 * Udit himself, cut out of the supplied render.
 *
 * It's a single front-facing pose, so there is no leg cycle to drive. Motion
 * is carried by a bob, a lean in the direction of travel, dust kicked up at
 * the feet, and a contact shadow that tightens as he rises.
 */
export default function Character({
  state = 'idle',
  facing = 1,
  className = '',
}: {
  state?: HeroState;
  facing?: 1 | -1;
  className?: string;
}) {
  return (
    <div
      className={`hero ${className}`}
      data-state={state}
      style={
        {
          '--lean': `${facing * 7}deg`,
          // Dust trails behind him, so it follows travel direction.
          '--dir': String(facing),
        } as React.CSSProperties
      }
    >
      {/* dust puffs, staggered */}
      <span className="dust" aria-hidden="true" />
      <span className="dust" aria-hidden="true" />
      <span className="dust" aria-hidden="true" />

      <div className="hero-shadow" aria-hidden="true" />
      <div className="hero-lean">
        <div className="hero-bob">
          <Image
            src="/assets/udit.png"
            alt="Udit Sharma"
            width={164}
            height={480}
            priority
            className="block w-auto select-none"
            style={{
              height: HERO_HEIGHT,
              // A rim light so he doesn't go flat against the night sky.
              filter: 'drop-shadow(0 0 1px rgba(0,0,0,.6))',
            }}
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
