'use client';

import { profile } from '@/content/profile';

/** Opening screen — the arcade title card before the world starts. */
export function TitlePanel() {
  return (
    <section
      className="relative h-full shrink-0"
      style={{
        // Must cover the whole first screen so World 1-1 — and the GL Bajaj
        // signboard in particular — stays off-stage until you scroll. The
        // world renders at WORLD_SCALE (0.9), so the layout viewport is
        // 100/0.9 = 111.1vw; 115vw leaves a margin on top of that.
        width: 'max(1120px, 115vw)',
      }}
      aria-label="Start"
      data-world="0-0"
      data-title="Press scroll to start"
    >
      {/* Lifted clear of the character, who stands at 20% of the panel. */}
      <div
        className="absolute left-[9%] w-[min(82%,660px)]"
        style={{ bottom: 'calc(var(--ground-h) + 196px)' }}
      >
        <h1
          className="font-display neon text-outline mt-5 text-2xl leading-[1.7] text-white sm:text-4xl"
          style={{ '--neon-color': 'var(--secondary)' } as React.CSSProperties}
        >
          {profile.name.toUpperCase()}
        </h1>

        <p className="text-outline mt-6 max-w-xl text-[19px] leading-relaxed text-white">
          Four years of Information Technology, a summer learning machine learning from Amazon
          scientists, and now building AI into enterprise software that people actually use.
          Keep scrolling to walk it.
        </p>

        <div className="pixel-edge mt-7 inline-block bg-[var(--primary)] px-5 py-4">
          <p className="font-display blink text-[10px] leading-relaxed text-white">
            SCROLL TO START
          </p>
        </div>
      </div>
    </section>
  );
}

/** A single line, alone on screen, as the player leaves a level. */
export function OutroPanel({ text }: { text: string }) {
  return (
    <section
      className="relative h-full shrink-0"
      style={{ width: 'clamp(820px, 68vw, 1160px)' }}
      aria-hidden="true"
    >
      {/* Pushed well right of the panel edge so the line gets clear air
          after the SE-1 card rather than crowding straight up against it. */}
      <div
        className="absolute left-[26%] w-[70%]"
        style={{ bottom: 'calc(var(--ground-h) + 140px)' }}
        data-reveal="outro"
      >
        <p
          className="font-display neon text-outline text-sm leading-[2] text-white sm:text-lg"
          style={{ '--neon-color': 'var(--primary)' } as React.CSSProperties}
        >
          {text}
        </p>
      </div>
    </section>
  );
}

/** End of the world: flagpole, castle, and the ways to reach him. */
export function CastlePanel() {
  const links = [
    { label: 'EMAIL', href: `mailto:${profile.email}`, bg: 'var(--coin)', fg: '#0f172a' },
    { label: 'LINKEDIN', href: profile.linkedin, bg: 'var(--secondary)', fg: '#fff' },
    { label: 'GITHUB', href: profile.github, bg: 'var(--card-2)', fg: '#fff' },
    { label: 'LEETCODE', href: profile.leetcode, bg: 'var(--coin)', fg: '#0f172a' },
    { label: 'HACKERRANK', href: profile.hackerrank, bg: 'var(--accent)', fg: '#0f172a' },
  ];

  return (
    <section
      className="relative h-full shrink-0"
      style={{ width: 'clamp(1220px, 92vw, 1480px)' }}
      aria-label="What comes next, and contact"
      data-world="5-1"
      data-title="The castle"
    >
      {/* flagpole */}
      <div
        className="absolute left-[13%] flex flex-col items-center"
        style={{ bottom: 'var(--ground-h)' }}
        data-reveal="flag"
      >
        <div
          className="size-5 rounded-full border-[3px] border-black"
          style={{ background: 'var(--coin)', boxShadow: '0 0 20px rgba(255,212,59,.6)' }}
        />
        <div className="relative flex">
          <div className="flagpole h-72" />
          <div
            className="absolute left-2 top-3 h-11 w-20 border-[3px] border-black"
            style={{
              background: 'var(--primary)',
              clipPath: 'polygon(0 0, 100% 50%, 0 100%)',
            }}
          />
        </div>
      </div>

      {/* Card and castle travel together, so they can never overlap. */}
      <div
        className="absolute flex items-end gap-12"
        style={{ left: '20%', bottom: 'var(--ground-h)' }}
      >
        {/* content */}
        <article
          className="arcade-panel p-7"
          style={
            {
              marginBottom: '104px',
              width: 'min(38vw, 470px)',
              '--panel-accent': 'var(--primary)',
            } as React.CSSProperties
          }
          data-reveal="card"
        >
          <CastleCard links={links} />
        </article>

        {/* castle, lit from within */}
        <div className="flex shrink-0 flex-col items-center" data-reveal="castle">
        <div className="flex items-end gap-2">
          <Battlement h={78} />
          <Battlement h={112} />
          <Battlement h={78} />
        </div>
        <div
          className="relative flex h-48 w-80 items-end justify-center border-[3px] border-black"
          style={{
            background:
              'repeating-linear-gradient(90deg,#6b4030 0 46px,#4f2e22 46px 50px),' +
              'repeating-linear-gradient(0deg,transparent 0 30px,rgba(0,0,0,.18) 30px 34px)',
          }}
        >
          {/* lit windows */}
          <span
            className="absolute left-9 top-8 size-7 border-[3px] border-black"
            style={{ background: 'var(--coin)', boxShadow: '0 0 20px rgba(255,212,59,.6)' }}
          />
          <span
            className="absolute right-9 top-8 size-7 border-[3px] border-black"
            style={{ background: 'var(--coin)', boxShadow: '0 0 20px rgba(255,212,59,.6)' }}
          />
          <div className="h-28 w-24 rounded-t-full border-[3px] border-black bg-[#0b1020]" />
        </div>
        </div>
      </div>
    </section>
  );
}

/** Body of the castle card, split out to keep the layout above readable. */
function CastleCard({
  links,
}: {
  links: { label: string; href: string; bg: string; fg: string }[];
}) {
  return (
    <>
      <div className="font-display text-[10px] text-[var(--primary)]">WORLD 5-1</div>
      <h2
        className="font-display neon mt-3 text-lg leading-snug"
        style={{ '--neon-color': 'var(--primary)' } as React.CSSProperties}
      >
        The castle
      </h2>
      <p className="mt-4 text-[19px] leading-relaxed text-[var(--muted-fg)]">
        This level is still being built. More soon.
      </p>

      <div
        className="mt-6 border-t-2 border-dashed pt-5"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="font-display text-[9px] text-[var(--muted-fg)]">SAY HELLO</div>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('mailto:') ? undefined : '_blank'}
              rel="noreferrer"
              className="pixel-edge font-display cursor-pointer px-3 py-2.5 text-[8px] transition-transform hover:-translate-y-1"
              style={{ background: l.bg, color: l.fg }}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

function Battlement({ h }: { h: number }) {
  return (
    <div
      className="w-16 border-[3px] border-b-0 border-black"
      style={{
        height: h,
        background: 'repeating-linear-gradient(90deg,#6b4030 0 28px,#4f2e22 28px 32px)',
        clipPath:
          'polygon(0 14%,14% 14%,14% 0,38% 0,38% 14%,62% 14%,62% 0,86% 0,86% 14%,100% 14%,100% 100%,0 100%)',
      }}
    />
  );
}
