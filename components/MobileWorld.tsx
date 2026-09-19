import Image from 'next/image';
import { checkpoints, profile, projects } from '@/content/profile';

/**
 * Narrow screens get a plain, fast, readable page instead of the game:
 * no pinning, no horizontal scroll, no parallax. Same arcade palette so it
 * still reads as the same product.
 */
export default function MobileWorld() {
  const links = [
    { label: 'Email', href: `mailto:${profile.email}`, bg: 'var(--coin)', fg: '#0f172a' },
    { label: 'LinkedIn', href: profile.linkedin, bg: 'var(--secondary)', fg: '#fff' },
    { label: 'GitHub', href: profile.github, bg: 'var(--card-2)', fg: '#fff' },
    { label: 'LeetCode', href: profile.leetcode, bg: 'var(--coin)', fg: '#0f172a' },
    { label: 'HackerRank', href: profile.hackerrank, bg: 'var(--accent)', fg: '#0f172a' },
  ];

  const accents = ['var(--secondary)', 'var(--coin)', 'var(--primary)', 'var(--accent)', 'var(--primary)'];

  return (
    <main className="min-h-screen bg-[var(--bg)] px-5 py-12 lg:hidden">
      <header>
        <Image
          src="/assets/udit.png"
          alt=""
          width={164}
          height={480}
          priority
          className="mb-6 h-44 w-auto"
        />
        <div className="font-display text-[9px] text-[var(--coin)]">
          A SIDE-SCROLLING PORTFOLIO
        </div>
        <h1
          className="font-display neon mt-4 text-xl leading-[1.7] text-white"
          style={{ '--neon-color': 'var(--secondary)' } as React.CSSProperties}
        >
          {profile.name.toUpperCase()}
        </h1>
        <p className="font-display mt-4 text-[10px] text-white">{profile.role}</p>
        <p className="mt-4 text-[19px] leading-relaxed text-[var(--muted-fg)]">
          College, Amazon ML Summer School, and building AI-powered enterprise software.
        </p>
        <p className="mt-3 text-[17px] text-[var(--muted-fg)] opacity-80">
          Open this on a laptop for the full side-scrolling version.
        </p>
      </header>

      <div className="mt-10 space-y-6">
        {checkpoints.map((cp, i) => (
          <article
            key={cp.id}
            className="arcade-panel p-6"
            style={{ '--panel-accent': accents[i % accents.length] } as React.CSSProperties}
          >
            <div
              className="font-display text-[9px]"
              style={{ color: accents[i % accents.length] }}
            >
              WORLD {cp.world}
            </div>
            <h2 className="font-display mt-3 text-[13px] leading-snug text-white">{cp.title}</h2>
            <p className="mt-3 text-[21px] font-bold leading-snug text-white">{cp.org}</p>
            <p className="mt-0.5 text-[17px] text-[var(--muted-fg)]">
              {cp.period}
              {cp.location ? ` · ${cp.location}` : ''}
            </p>

            {cp.intro && (
              <p className="mt-3 text-[18px] leading-relaxed text-[var(--muted-fg)]">{cp.intro}</p>
            )}

            {cp.bullets.length > 0 && (
              <ul className="mt-3 space-y-2.5">
                {cp.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex gap-3 text-[17px] leading-[1.5] text-[var(--muted-fg)]"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2.5 size-2 shrink-0"
                      style={{ background: accents[i % accents.length] }}
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}

            {cp.powerUps.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {cp.powerUps.map((p) => (
                  <span key={p} className="chip">
                    {p}
                  </span>
                ))}
              </div>
            )}

            {cp.stats.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-3">
                {cp.stats.map((s) => (
                  <div key={s.label} className="score-tile px-3.5 py-2">
                    <div className="font-display text-[8px] opacity-80">
                      {s.label.toUpperCase()}
                    </div>
                    <div className="font-display mt-1.5 text-xs">{s.value}</div>
                  </div>
                ))}
              </div>
            )}

            {cp.outro && (
              <p
                className="mt-4 border-t-2 border-dashed pt-4 text-[18px] font-semibold text-white"
                style={{ borderColor: 'var(--border)' }}
              >
                {cp.outro}
              </p>
            )}
          </article>
        ))}
      </div>

      <h2 className="font-display mt-12 text-[11px] text-[var(--accent)]">PROJECTS</h2>

      <div className="mt-5 space-y-6">
        {projects.map((p) => (
          <article
            key={p.id}
            className="arcade-panel p-6"
            style={{ '--panel-accent': 'var(--accent)' } as React.CSSProperties}
          >
            <h3 className="font-display text-[12px] leading-snug text-white">{p.title}</h3>
            <p className="mt-2 text-[17px] text-[var(--muted-fg)]">{p.period}</p>
            <ul className="mt-3 space-y-2.5">
              {p.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-[17px] leading-[1.5] text-[var(--muted-fg)]">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 size-2 shrink-0 bg-[var(--accent)]"
                  />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <footer className="mt-12 flex flex-wrap gap-2.5 pb-6">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target={l.href.startsWith('mailto:') ? undefined : '_blank'}
            rel="noreferrer"
            className="pixel-edge font-display px-3 py-2.5 text-[8px]"
            style={{ background: l.bg, color: l.fg }}
          >
            {l.label.toUpperCase()}
          </a>
        ))}
      </footer>
    </main>
  );
}
