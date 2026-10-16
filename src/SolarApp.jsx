import React, { useState, useEffect } from 'react';
import {
  BoltIcon,
  BookingCalendar,
  CASE_STUDY_QUOTES,
  CASE_STUDY_ROADMAP,
  CASE_STUDY_SHOTS,
  CASE_STUDY_SUMMARY,
  Calculator,
  CalendarCheckIcon,
  CalendarIcon,
  CountUp,
  DemoSimulator,
  FAQ,
  FOUNDER_PHOTO,
  INCLUDED,
  PROCESS,
  Reveal,
  SERVICES,
  STATS
} from './shared.jsx';

/* Solar-themed variant of the landing page (served from solar.html).
   Same copy, data and interactive pieces as App.jsx, restyled around a
   sunset palette and a full-bleed "house with rooftop solar" hero card. */

const BOOKING_URL = 'https://calendly.com/ahmed-thornviewai/30min';
// This variant lives at /solar.html, so every in-site link stays inside it
// rather than falling back to the original landing page at "/".
const SOLAR_HOME = '/solar.html';

/* ---------------- Small glyphs ---------------- */
const SunGlyph = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <circle cx="24" cy="24" r="9" fill="currentColor"/>
    {Array.from({ length: 8 }, (_, i) => (
      <rect key={i} x="22.6" y="3" width="2.8" height="8" rx="1.4" fill="currentColor" transform={`rotate(${i * 45} 24 24)`}/>
    ))}
  </svg>
);

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ---------------- Hero illustration: house with a rooftop array ----------------
   Panel geometry is computed from the roof trapezoid so the modules sit in
   perspective on the tiles. viewBox is 1200 x 520. */
const ROOF_TOP = 120, ROOF_BOTTOM = 318;
const roofX = (side, v) => (side === 'l' ? 250 - 210 * v : 950 + 210 * v);
function roofPoint(u, v) {
  const l = roofX('l', v), r = roofX('r', v);
  return [l + u * (r - l), ROOF_TOP + v * (ROOF_BOTTOM - ROOF_TOP)];
}
const pts = (arr) => arr.map(p => p.map(n => n.toFixed(1)).join(',')).join(' ');

function buildArray() {
  const cols = 5, rows = 2;
  const u0 = 0.07, u1 = 0.93, v0 = 0.1, v1 = 0.84, gapU = 0.008, gapV = 0.035;
  const modW = (u1 - u0 - gapU * (cols - 1)) / cols;
  const modH = (v1 - v0 - gapV * (rows - 1)) / rows;
  const modules = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const ua = u0 + c * (modW + gapU), ub = ua + modW;
      const va = v0 + r * (modH + gapV), vb = va + modH;
      const outline = [roofPoint(ua, va), roofPoint(ub, va), roofPoint(ub, vb), roofPoint(ua, vb)];
      let cells = '';
      for (let i = 1; i < 4; i++) {
        const u = ua + (modW * i) / 4;
        const [x1, y1] = roofPoint(u, va), [x2, y2] = roofPoint(u, vb);
        cells += `M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`;
      }
      for (let j = 1; j < 3; j++) {
        const v = va + (modH * j) / 3;
        const [x1, y1] = roofPoint(ua, v), [x2, y2] = roofPoint(ub, v);
        cells += `M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`;
      }
      modules.push({ key: `${r}-${c}`, outline: pts(outline), cells });
    }
  }
  return modules;
}
const ARRAY_MODULES = buildArray();

function tileRows() {
  const rows = [];
  for (let y = ROOF_TOP + 14; y < ROOF_BOTTOM; y += 15) {
    const v = (y - ROOF_TOP) / (ROOF_BOTTOM - ROOF_TOP);
    rows.push({ y, x1: roofX('l', v), x2: roofX('r', v) });
  }
  return rows;
}
const TILE_ROWS = tileRows();

function HouseScene() {
  return (
    <svg className="hero-scene" viewBox="0 0 1200 520" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      <defs>
        <linearGradient id="sv-roof" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#B4410F"/>
          <stop offset="1" stopColor="#D2581A"/>
        </linearGradient>
        <linearGradient id="sv-panel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#22345C"/>
          <stop offset="0.55" stopColor="#1A2747"/>
          <stop offset="1" stopColor="#2B3F6B"/>
        </linearGradient>
        <linearGradient id="sv-shine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFE7A8" stopOpacity="0"/>
          <stop offset="0.5" stopColor="#FFE7A8" stopOpacity="0.55"/>
          <stop offset="1" stopColor="#FFE7A8" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="sv-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFD27A"/>
          <stop offset="1" stopColor="#E9782C"/>
        </linearGradient>
        <linearGradient id="sv-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFF1DE"/>
          <stop offset="1" stopColor="#F6DFC0"/>
        </linearGradient>
        <clipPath id="sv-array-clip">
          {ARRAY_MODULES.map(m => <polygon key={m.key} points={m.outline}/>)}
        </clipPath>
      </defs>

      {/* Roof */}
      <polygon points={`250,${ROOF_TOP} 950,${ROOF_TOP} 1160,${ROOF_BOTTOM} 40,${ROOF_BOTTOM}`} fill="url(#sv-roof)"/>
      {TILE_ROWS.map(r => (
        <line key={r.y} x1={r.x1} y1={r.y} x2={r.x2} y2={r.y} stroke="#8E300B" strokeOpacity="0.55" strokeWidth="2"/>
      ))}
      <line x1="246" y1={ROOF_TOP} x2="954" y2={ROOF_TOP} stroke="#7A2808" strokeWidth="7" strokeLinecap="round"/>

      {/* Solar array */}
      <g>
        {ARRAY_MODULES.map(m => (
          <g key={m.key}>
            <polygon points={m.outline} fill="url(#sv-panel)" stroke="#C9D3E6" strokeWidth="2.4" strokeLinejoin="round"/>
            <path d={m.cells} stroke="#8FA3C8" strokeOpacity="0.55" strokeWidth="1.3"/>
          </g>
        ))}
        <g clipPath="url(#sv-array-clip)">
          <rect className="panel-shine" x="-260" y={ROOF_TOP} width="240" height={ROOF_BOTTOM - ROOF_TOP} fill="url(#sv-shine)" transform="skewX(-18)"/>
        </g>
      </g>

      {/* Fascia + walls */}
      <rect x="36" y={ROOF_BOTTOM} width="1128" height="16" rx="3" fill="#FFF8EC"/>
      <rect x="100" y="334" width="1000" height="200" fill="url(#sv-wall)"/>
      <rect x="100" y="334" width="1000" height="14" fill="#7A3A12" fillOpacity="0.14"/>

      {/* Windows */}
      {[180, 800].map(x => (
        <g key={x}>
          <rect x={x} y="382" width="220" height="130" rx="4" fill="#FFF8EC"/>
          <rect x={x + 10} y="392" width="200" height="128" fill="url(#sv-glass)"/>
          <path d={`M${x + 76} 392V520M${x + 143} 392V520`} stroke="#FFF8EC" strokeWidth="6"/>
          <path d={`M${x + 20} 400L${x + 60} 400`} stroke="#FFF3D6" strokeOpacity="0.7" strokeWidth="3" strokeLinecap="round"/>
        </g>
      ))}

      {/* Porch + door */}
      <rect x="520" y="352" width="160" height="180" fill="#4A2A14"/>
      <rect x="566" y="404" width="68" height="128" rx="3" fill="#8A4F23"/>
      <circle cx="622" cy="470" r="3.4" fill="#FFD27A"/>
      <rect x="500" y="348" width="22" height="184" fill="#FFF8EC"/>
      <rect x="678" y="348" width="22" height="184" fill="#FFF8EC"/>

      {/* Shrubs */}
      <g fill="#5E5A22">
        <ellipse cx="70" cy="510" rx="90" ry="46"/>
        <ellipse cx="150" cy="520" rx="70" ry="34"/>
        <ellipse cx="1130" cy="508" rx="96" ry="50"/>
        <ellipse cx="1050" cy="522" rx="64" ry="30"/>
      </g>
      <g fill="#7A742C">
        <ellipse cx="60" cy="496" rx="48" ry="24"/>
        <ellipse cx="1140" cy="492" rx="52" ry="26"/>
      </g>
    </svg>
  );
}

/* ---------------- Floating pill nav (appears once the hero scrolls away) ---------------- */
function useScrolledPast(px) {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > px);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [px]);
  return past;
}

function NavLinks() {
  return (
    <React.Fragment>
      <a href="#calculator">Calculator</a>
      <a href="#demo">Demo</a>
      <a href="#services">Services</a>
      <a href="#faq">FAQ</a>
    </React.Fragment>
  );
}

function Brand({ href = '#top' }) {
  return (
    <a className="sv-brand" href={href}>
      <span className="sv-brand-mark"><SunGlyph /></span>
      <span>ThornView <span className="sv-brand-ai">AI</span></span>
    </a>
  );
}

function SectionLabel({ children }) {
  return <p className="sv-label"><span className="sv-label-dot" aria-hidden="true"></span>{children}</p>;
}

/* ---------------- Page ---------------- */
function SolarLanding() {
  const scrolled = useScrolledPast(560);

  // Same deep-link fix as App.jsx: retry the hash scroll once React has rendered.
  useEffect(() => {
    if (!window.location.hash) return;
    const id = window.location.hash.slice(1);
    const el = (id === 'book' && document.querySelector('.booking-wrap')) || document.getElementById(id);
    if (el) el.scrollIntoView();
  }, []);

  return (
    <div className="sv" id="top">
      <div className={'float-nav' + (scrolled ? ' show' : '')} aria-hidden={!scrolled}>
        <Brand />
        <nav className="float-links"><NavLinks /></nav>
        <a className="pill pill-solid" href="#book" tabIndex={scrolled ? 0 : -1}>Free Assessment</a>
      </div>

      {/* ---------- Hero card ---------- */}
      <header className="hero-card">
        <div className="hero-sky" aria-hidden="true">
          <div className="hero-rays"></div>
          <div className="hero-sun"></div>
          <span className="cloud c1"></span>
          <span className="cloud c2"></span>
        </div>

        <div className="hero-nav">
          <Brand />
          <nav className="hero-links"><NavLinks /></nav>
          <div className="hero-nav-ctas">
            <a className="pill pill-ghost hide-sm" href="#case-study">Case Study</a>
            <a className="pill pill-ghost" href="#book">Free Assessment</a>
          </div>
        </div>

        <div className="hero-copy">
          <p className="hero-kicker">AI automation for solar companies</p>
          <h1>
            Every Solar Lead Answered<br/>
            &amp; B<span className="sun-o" aria-hidden="true"><SunGlyph /></span><span className="sr-only">o</span>oked in Under 5 Minutes
          </h1>
          <p className="hero-lede">Instant text and email replies, real qualification, and automatic booking &mdash; before your team even sees the notification. Slow follow-up is costing a typical 5-rep team $115K&ndash;$234K a year.</p>
          <div className="hero-actions">
            <a className="cta-pill" href="#book">
              Book Your Free Assessment
              <span className="cta-pill-arrow"><ArrowIcon /></span>
            </a>
            <a className="pill pill-ghost pill-lg" href="#the-cost">See the Data</a>
          </div>
        </div>

        <div className="hero-chip chip-left">
          <span className="chip-icon"><BoltIcon /></span>
          <span><strong>New lead replied</strong><small>38 seconds after the form</small></span>
        </div>
        <div className="hero-chip chip-right">
          <span className="chip-icon"><CalendarCheckIcon /></span>
          <span><strong>Site visit booked</strong><small>Thu &middot; 10:00 AM &middot; pre-qualified</small></span>
        </div>

        <HouseScene />

        <a className="scroll-cue" href="#the-cost">
          <span className="scroll-mouse" aria-hidden="true"><span></span></span>
          Scroll
        </a>
      </header>

      <main>
        {/* ---------- Stats ---------- */}
        <section id="the-cost" className="sv-section">
          <div className="sv-wrap">
            <Reveal>
              <div className="sv-head split">
                <div>
                  <SectionLabel>The cost of a slow response</SectionLabel>
                  <h2>This isn&rsquo;t a sales problem. It&rsquo;s an operations problem.</h2>
                </div>
                <p>Every one of these numbers describes something fully inside your company&rsquo;s control &mdash; not permitting, not the grid, not the market.</p>
              </div>
            </Reveal>
            <div className="stat-row">
              {STATS.map((s, i) => (
                <Reveal delay={i * 90} key={i}>
                  <div className={'stat' + (s.primary ? ' stat-hot' : '')}>
                    <div className="stat-num">{s.count ? <CountUp end={s.end} suffix={s.suffix} /> : s.text}</div>
                    <p className="stat-label">{s.label}</p>
                    <p className="stat-source">Source: {s.source}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Calculator ---------- */}
        <section id="calculator" className="sv-section tint">
          <div className="sv-wrap">
            <div className="sv-head">
              <SectionLabel>Run your own numbers</SectionLabel>
              <h2>What are unqualified site visits costing you?</h2>
              <p>Drag the sliders to match your team. This uses the same 30&ndash;40% unqualified-visit rate and $150&ndash;$300 per-visit cost cited industry-wide.</p>
            </div>
            <Calculator />
          </div>
        </section>

        {/* ---------- Demo ---------- */}
        <section id="demo" className="sv-section">
          <div className="sv-wrap demo-grid">
            <div className="demo-copy">
              <SectionLabel>See it in action</SectionLabel>
              <h2>Watch a lead go from submitted to booked.</h2>
              <p>This is the exact sequence a new lead triggers once the Instant Response system is live &mdash; no rep has to be at their desk for any of it. Scroll it into view and it plays automatically.</p>
              <ol className="demo-steps">
                <li><span>1</span>Lead submits a quote request</li>
                <li><span>2</span>AI replies by text and email in under a minute</li>
                <li><span>3</span>Roof, bill and homeowner status are qualified</li>
                <li><span>4</span>A site visit lands on your rep&rsquo;s calendar</li>
              </ol>
            </div>
            <div className="phone">
              <div className="phone-bar"><span className="phone-dot"></span>New lead &middot; Sarah M.</div>
              <DemoSimulator />
            </div>
          </div>
        </section>

        {/* ---------- Case study ---------- */}
        <section id="case-study" className="sv-section tint">
          <div className="sv-wrap case-grid">
            <Reveal className="case-shot">
              <div className="browser">
                <div className="browser-bar"><span></span><span></span><span></span></div>
                <img src="/vaultmind-hero.png" alt="VaultMind landing page, showing the organizational memory hero and a cited example answer" />
              </div>
            </Reveal>
            <Reveal delay={90} className="case-copy">
              <SectionLabel>Proof of work</SectionLabel>
              <h2>Case study: VaultMind, a private AI knowledge assistant</h2>
              <p>Built for an energy-transition education centre facing a generational handover, with long-serving staff retiring and institutional knowledge at risk of leaving with them.</p>
              <ol className="case-steps">
                {CASE_STUDY_SUMMARY.map((step, i) => (
                  <li key={step.title}>
                    <span className="case-node">{i + 1}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <a className="pill pill-outline" href="/solar.html?view=case-study">View case study in detail <ArrowIcon /></a>
            </Reveal>
          </div>
        </section>

        {/* ---------- Services ---------- */}
        <section id="services" className="sv-section">
          <div className="sv-wrap">
            <Reveal>
              <div className="sv-head split">
                <div>
                  <SectionLabel>The Quote-to-Contract Blueprint</SectionLabel>
                  <h2>Three systems. One faster path from lead to signed contract.</h2>
                </div>
                <p>Built on top of the tools you already use &mdash; no CRM migration, no new software your team has to learn from scratch.</p>
              </div>
            </Reveal>
            <div className="card-grid three">
              {SERVICES.map((s, i) => (
                <Reveal delay={i * 90} key={s.title}>
                  <article className={'sv-card' + (i === 0 ? ' sv-card-hot' : '')}>
                    <div className="sv-card-top">
                      <span className="sv-icon"><s.Icon /></span>
                      <span className="sv-card-idx">0{i + 1}</span>
                    </div>
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                    <p className="sv-card-benefit"><SunGlyph className="tiny-sun" />{s.benefit}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Process ---------- */}
        <section id="process" className="sv-section tint">
          <div className="sv-wrap">
            <Reveal>
              <div className="sv-head center">
                <SectionLabel>How an engagement runs</SectionLabel>
                <h2>Three stages, sunrise to full power.</h2>
              </div>
            </Reveal>
            <ol className="arc-steps">
              {PROCESS.map((s, i) => (
                <Reveal delay={i * 110} key={s.num} className="arc-step-wrap">
                  <li className="arc-step">
                    <span className={'arc-node n' + i}>{s.num}</span>
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------- Included ---------- */}
        <section id="included" className="sv-section">
          <div className="sv-wrap">
            <Reveal>
              <div className="sv-head">
                <SectionLabel>What you walk away with</SectionLabel>
                <h2>Four concrete deliverables. Not a vague retainer.</h2>
                <p>Every engagement ends with things you can point to &mdash; not just advice.</p>
              </div>
            </Reveal>
            <div className="card-grid two">
              {INCLUDED.map((s, i) => (
                <Reveal delay={i * 90} key={s.title}>
                  <article className="sv-card row">
                    <span className="sv-icon"><s.Icon /></span>
                    <div>
                      <h3>{s.title}</h3>
                      <p>{s.desc}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- About ---------- */}
        <section id="about" className="sv-section tint">
          <div className="sv-wrap about">
            <Reveal className="about-photo-wrap">
              <div className="about-photo">
                <img src={FOUNDER_PHOTO} alt="Ahmed Sohail, Founder of ThornView AI" />
                <span className="about-badge"><SunGlyph />Founder</span>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="about-copy">
                <SectionLabel>Who&rsquo;s behind this</SectionLabel>
                <p className="about-lead">I&rsquo;ve watched good sales teams lose winnable deals for a dumb reason: a hot lead sat untouched for two days while the rep was busy elsewhere. Not bad selling &mdash; bad timing. That&rsquo;s the problem ThornView AI exists to kill.</p>
                <p>My focus is narrow and deliberate: the AI systems that close the gap between a lead coming in and a rep actually reaching them. Every engagement starts with a real assessment of your funnel, not a generic package &mdash; you get a system built around how your team actually sells and the tools you already use.</p>
                <p className="about-name">Ahmed Sohail</p>
                <p className="about-role">Founder, ThornView AI</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------- FAQ ---------- */}
        <section id="faq" className="sv-section">
          <div className="sv-wrap faq-grid">
            <Reveal>
              <div className="sv-head">
                <SectionLabel>Before you book</SectionLabel>
                <h2>Common questions.</h2>
                <p>Anything else? Email <a href="mailto:ahmed@thornviewai.com">ahmed@thornviewai.com</a>.</p>
              </div>
            </Reveal>
            <FAQ />
          </div>
        </section>

        {/* ---------- Booking (sunset bookend) ---------- */}
        <section id="book" className="sv-section book-section">
          <div className="sunset-card">
            <div className="hero-sky" aria-hidden="true">
              <div className="hero-rays"></div>
              <div className="hero-sun low"></div>
            </div>
            <div className="book-head">
              <p className="hero-kicker">Ready when you are</p>
              <h2>Ready to see where your leads are leaking?</h2>
              <p>Book a 30-minute free assessment call below. No pitch deck &mdash; just a look at your current funnel and where the Quote-to-Contract Blueprint would plug in.</p>
            </div>
            <Reveal delay={80} className="booking-wrap-outer">
              <div className="booking-wrap">
                <div className="booking-top">
                  <div className="booking-icon"><CalendarIcon /></div>
                  <div>
                    <h3 className="booking-title">Free Solar Funnel Assessment &mdash; 30 min</h3>
                    <p className="booking-desc">Tap below to open the live calendar and pick a time &mdash; takes about 30 seconds.</p>
                  </div>
                  <a className="cta-pill dark" href={BOOKING_URL} target="_blank" rel="noopener">
                    Choose a Time
                    <span className="cta-pill-arrow"><ArrowIcon /></span>
                  </a>
                </div>
                <p className="booking-or">Or pick a time right here:</p>
                <BookingCalendar src={BOOKING_URL} />
                <p className="booking-fallback">Prefer email? Reach out directly at <a href="mailto:ahmed@thornviewai.com">ahmed@thornviewai.com</a></p>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="sv-footer">
        <div className="sv-wrap footer-row">
          <div>
            <Brand />
            <p className="footer-tagline">We Find the Thorns. AI Clears Them.</p>
          </div>
          <nav className="footer-links">
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="mailto:ahmed@thornviewai.com">ahmed@thornviewai.com</a>
          </nav>
        </div>
        <p className="sv-wrap footer-copy">&copy; 2026 ThornView AI. thornviewai.com</p>
      </footer>
    </div>
  );
}

/* ---------------- Case study detail page (solar theme) ---------------- */
function SolarCaseStudyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="sv">
      <header className="hero-card case-hero">
        <div className="hero-sky" aria-hidden="true">
          <div className="hero-rays"></div>
          <div className="hero-sun"></div>
        </div>

        <div className="hero-nav">
          <Brand href={SOLAR_HOME} />
          <span></span>
          <div className="hero-nav-ctas">
            <a className="pill pill-ghost" href={SOLAR_HOME + '#book'}>Free Assessment</a>
          </div>
        </div>

        <div className="case-hero-copy sv-wrap">
          <a className="case-back" href={SOLAR_HOME + '#case-study'}><span aria-hidden="true">&larr;</span> Back to ThornView AI</a>
          <p className="hero-kicker">Case study</p>
          <h1>VaultMind: turning retiring staff&rsquo;s knowledge into a cited AI assistant</h1>
          <p className="hero-lede">How a 45-year-old energy-transition education centre captured decades of institutional knowledge before it walked out the door &mdash; without a single sensitive document leaving the building.</p>
          <div className="browser case-hero-shot">
            <div className="browser-bar"><span></span><span></span><span></span></div>
            <img src="/vaultmind-hero.png" alt="VaultMind landing page with a live cited example answer" />
          </div>
        </div>
      </header>

      <main>
        <section className="sv-section">
          <div className="sv-wrap">
            <Reveal>
              <div className="sv-head">
                <SectionLabel>The roadmap</SectionLabel>
                <h2>From a generational-handover risk to a cited knowledge assistant.</h2>
              </div>
            </Reveal>
            <ol className="roadmap-list">
              {CASE_STUDY_ROADMAP.map((step, i) => (
                <Reveal delay={i * 90} key={step.label}>
                  <li className="roadmap-item">
                    <span className="case-node big">0{i + 1}</span>
                    <div className="sv-card">
                      <SectionLabel>{step.label}</SectionLabel>
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <section className="sv-section tint">
          <div className="sv-wrap">
            <Reveal>
              <div className="sv-head">
                <SectionLabel>Inside the app</SectionLabel>
                <h2>What it looks like day to day.</h2>
              </div>
            </Reveal>
            <div className="shot-grid">
              {CASE_STUDY_SHOTS.map((s, i) => (
                <Reveal delay={i * 90} key={s.src}>
                  <figure className="shot">
                    <div className="browser">
                      <div className="browser-bar"><span></span><span></span><span></span></div>
                      <img src={s.src} alt={s.alt} />
                    </div>
                    <figcaption>{s.caption}</figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonial" className="sv-section">
          <div className="sv-wrap">
            <Reveal>
              <div className="sv-head center">
                <SectionLabel>The outcome</SectionLabel>
                <h2>What the client wrote, in their own letter of reference.</h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="quote-card">
                {CASE_STUDY_QUOTES.map((q, i) => (
                  <blockquote key={i} className="quote">&ldquo;{q}&rdquo;</blockquote>
                ))}
                <div className="quote-sig">
                  <p className="about-name">Wilfried Walther &amp; Uwe Brockmann</p>
                  <p className="about-role">Chair of the Board &amp; Managing Director, Energie- und Umweltzentrum am Deister e.V.</p>
                  <p className="about-role">Co-signed by Susanne Rodemann-Kalkan, Managing Director, futurlabor</p>
                </div>
                <a className="pill pill-outline" href="/testimonial-letter.pdf" target="_blank" rel="noopener">Read the full letter of reference (PDF) <ArrowIcon /></a>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="sv-section book-section">
          <div className="sunset-card">
            <div className="hero-sky" aria-hidden="true">
              <div className="hero-rays"></div>
              <div className="hero-sun low"></div>
            </div>
            <div className="book-head">
              <p className="hero-kicker">Want something like this?</p>
              <h2>Let&rsquo;s find where your team&rsquo;s knowledge &mdash; or your leads &mdash; are leaking.</h2>
              <div className="hero-actions">
                <a className="cta-pill" href={SOLAR_HOME + '#book'}>
                  Book a Free Assessment
                  <span className="cta-pill-arrow"><ArrowIcon /></span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="sv-footer">
        <div className="sv-wrap footer-row">
          <div>
            <Brand href={SOLAR_HOME} />
            <p className="footer-tagline">We Find the Thorns. AI Clears Them.</p>
          </div>
          <nav className="footer-links">
            <a href={SOLAR_HOME}>Home</a>
            <a href="mailto:ahmed@thornviewai.com">ahmed@thornviewai.com</a>
          </nav>
        </div>
        <p className="sv-wrap footer-copy">&copy; 2026 ThornView AI. thornviewai.com</p>
      </footer>
    </div>
  );
}

/* ---------------- Router: /solar.html?view=case-study shows the detail page ---------------- */
export default function SolarApp() {
  const isCaseStudy = new URLSearchParams(window.location.search).get('view') === 'case-study';
  return isCaseStudy ? <SolarCaseStudyPage /> : <SolarLanding />;
}
