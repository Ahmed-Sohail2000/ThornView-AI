import React, { useEffect } from 'react';
import {
  BookingCalendar,
  CASE_STUDY_QUOTES,
  CASE_STUDY_ROADMAP,
  CASE_STUDY_SHOTS,
  CASE_STUDY_SUMMARY,
  Calculator,
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

/* ---------------- Case study detail page ---------------- */
function CaseStudyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <React.Fragment>
      <header>
        <div className="wrap nav-row">
          <a className="brand" href="/">
            <span className="brand-name">ThornView<span className="accent"> AI</span></span>
          </a>
          <nav className="links">
            <a className="btn btn-primary nav-cta" href="/#book">Free Assessment</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero case-detail-hero">
          <div className="hero-glow one" aria-hidden="true"></div>
          <div className="hero-glow two" aria-hidden="true"></div>
          <div className="wrap">
            <a className="case-back-link" href="/">&larr; Back to ThornView AI</a>
            <p className="eyebrow">CASE STUDY</p>
            <h1 className="case-detail-h1">VaultMind: turning retiring staff&rsquo;s knowledge into a cited AI assistant</h1>
            <p className="hero-sub" style={{ margin: '18px 0 0' }}>How a 45-year-old energy-transition education centre captured decades of institutional knowledge before it walked out the door — without a single sensitive document leaving the building.</p>
            <div className="case-detail-hero-frame">
              <div className="case-visual-frame">
                <div className="case-visual-bar"><span></span><span></span><span></span></div>
                <img className="case-visual-shot" src="/vaultmind-hero.png" alt="VaultMind landing page with a live cited example answer" />
              </div>
            </div>
          </div>
        </section>

        <section className="section-alt">
          <div className="wrap">
            <Reveal>
              <div className="section-head">
                <p className="eyebrow">THE ROADMAP</p>
                <h2>From a generational-handover risk to a cited knowledge assistant.</h2>
              </div>
            </Reveal>
            <div className="roadmap">
              {CASE_STUDY_ROADMAP.map((step, i) => (
                <Reveal delay={i * 90} key={step.label}>
                  <div className="roadmap-step">
                    <div className="roadmap-num mono">0{i + 1}</div>
                    <div>
                      <p className="eyebrow">{step.label}</p>
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="wrap">
            <Reveal>
              <div className="section-head">
                <p className="eyebrow">INSIDE THE APP</p>
                <h2>What it looks like day to day.</h2>
              </div>
            </Reveal>
            <div className="shot-gallery">
              {CASE_STUDY_SHOTS.map((s, i) => (
                <Reveal delay={i * 90} key={s.src}>
                  <figure className="shot-card">
                    <div className="case-visual-frame">
                      <div className="case-visual-bar"><span></span><span></span><span></span></div>
                      <img className="case-visual-shot" src={s.src} alt={s.alt} />
                    </div>
                    <figcaption>{s.caption}</figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonial" className="section-alt">
          <div className="wrap">
            <Reveal>
              <div className="section-head">
                <p className="eyebrow">THE OUTCOME</p>
                <h2>What the client wrote, in their own letter of reference.</h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="testimonial-card">
                {CASE_STUDY_QUOTES.map((q, i) => (
                  <blockquote key={i} className="testimonial-quote">&ldquo;{q}&rdquo;</blockquote>
                ))}
                <div className="testimonial-sig">
                  <p className="about-name">Wilfried Walther &amp; Uwe Brockmann</p>
                  <p className="about-role">Chair of the Board &amp; Managing Director, Energie- und Umweltzentrum am Deister e.V.</p>
                  <p className="about-role">Co-signed by Susanne Rodemann-Kalkan, Managing Director, futurlabor</p>
                </div>
                <a className="btn btn-secondary" href="/testimonial-letter.pdf" target="_blank" rel="noopener">Read the full letter of reference (PDF) &rarr;</a>
              </div>
            </Reveal>
          </div>
        </section>

        <section>
          <div className="wrap" style={{ textAlign: 'center' }}>
            <Reveal>
              <p className="eyebrow">WANT SOMETHING LIKE THIS?</p>
              <h2 style={{ marginTop: '12px' }}>Let&rsquo;s find where your team&rsquo;s knowledge — or your leads — are leaking.</h2>
              <div className="hero-ctas">
                <a className="btn btn-primary" href="/#book">Book a Free Assessment</a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <div className="footer-row">
            <div className="footer-brand">
              <span className="brand-name">ThornView<span className="accent"> AI</span></span>
              <span className="footer-tagline">We Find the Thorns. AI Clears Them.</span>
            </div>
            <div className="footer-links">
              <a href="/">Home</a>
              <a href="mailto:ahmed@thornviewai.com">ahmed@thornviewai.com</a>
            </div>
          </div>
          <p className="footer-copy">&copy; 2026 ThornView AI. thornviewai.com</p>
        </div>
      </footer>
    </React.Fragment>
  );
}

/* ---------------- App ---------------- */
function App() {
  const isCaseStudy = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('view') === 'case-study';

  // Links from the case study page (e.g. "/#book") land here via a full page
  // load, so the browser tries to scroll to the hash before React has
  // rendered the target section and the scroll silently fails. Retry once
  // mounted, and for #book jump straight to the Calendly widget itself
  // rather than the top of the (tall) section.
  useEffect(() => {
    if (isCaseStudy || !window.location.hash) return;
    const id = window.location.hash.slice(1);
    const el = (id === 'book' && document.querySelector('.booking-wrap')) || document.getElementById(id);
    if (el) el.scrollIntoView();
  }, [isCaseStudy]);

  if (isCaseStudy) return <CaseStudyPage />;

  return (
    <React.Fragment>
      <header>
        <div className="wrap nav-row">
          <a className="brand" href="#top">
            <span className="brand-name">ThornView<span className="accent"> AI</span></span>
          </a>
          <nav className="links">
            <a href="#calculator" className="hide-mobile">Calculator</a>
            <a href="#services" className="hide-mobile">Services</a>
            <a href="#faq" className="hide-mobile">FAQ</a>
            <a className="btn btn-primary nav-cta" href="#book">Free Assessment</a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-glow one" aria-hidden="true"></div>
          <div className="hero-glow two" aria-hidden="true"></div>
          <div className="wrap hero-inner">
            <p className="eyebrow">AI AUTOMATION FOR SOLAR COMPANIES</p>
            <h1>Get every solar lead contacted, qualified, and booked automatically &mdash; in <span className="money">under 5 minutes</span>.</h1>
            <p className="hero-sub">No more slow follow-up costing you $115K&ndash;$234K a year. Every new lead gets an instant text and email reply, gets qualified, and lands on your calendar — before your team even sees the notification.</p>
            <div className="hero-ctas">
              <a className="btn btn-primary" href="#book">Book Your Free Assessment</a>
              <a className="btn btn-secondary" href="#the-cost">See the Data</a>
            </div>
            <p className="hero-note">30-minute call. We look at your actual funnel — no generic pitch deck.</p>
          </div>
        </section>

        <section id="the-cost">
          <div className="wrap">
            <Reveal>
              <div className="section-head">
                <p className="eyebrow">THE COST OF A SLOW RESPONSE</p>
                <h2>This isn't a sales problem. It's an operations problem.</h2>
                <p>Every one of these numbers describes something fully inside your company's control — not permitting, not the grid, not the market.</p>
              </div>
            </Reveal>
            <div className="stat-grid">
              {STATS.map((s, i) => (
                <Reveal delay={i * 90} key={i}>
                  <div className={'stat-card' + (s.primary ? ' stat-primary' : '') + (s.minor ? ' stat-minor' : '')}>
                    <div className="stat-num mono">{s.count ? <CountUp end={s.end} suffix={s.suffix} /> : s.text}</div>
                    <p className="stat-label">{s.label}</p>
                    <p className="stat-source">{s.source}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="calculator" className="section-alt">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">RUN YOUR OWN NUMBERS</p>
              <h2>What are unqualified site visits costing you?</h2>
              <p>Drag the sliders to match your team. This uses the same 30&ndash;40% unqualified-visit rate and $150&ndash;$300 per-visit cost cited industry-wide.</p>
            </div>
            <Calculator />
          </div>
        </section>

        <section id="demo">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">SEE IT IN ACTION</p>
              <h2>Watch a lead go from submitted to booked.</h2>
              <p>This is the exact sequence a new lead triggers once the Instant Response system is live — no rep has to be at their desk for any of it. Scroll into view and it plays automatically.</p>
            </div>
            <DemoSimulator />
          </div>
        </section>

        <section id="case-study">
          <div className="wrap case-study-grid">
            <Reveal className="case-study-visual case-study-visual-spaced">
              <div className="case-visual-frame">
                <div className="case-visual-bar"><span></span><span></span><span></span></div>
                <img className="case-visual-shot" src="/vaultmind-hero.png" alt="VaultMind landing page, showing the &ldquo;organizational memory&rdquo; hero and a cited example answer" />
              </div>
            </Reveal>
            <Reveal delay={90} className="case-study-copy">
              <p className="eyebrow">PROOF OF WORK</p>
              <h2>Case study: VaultMind, a private AI knowledge assistant</h2>
              <p>Built for a company facing a generational handover, with long-serving staff retiring and institutional knowledge at risk of leaving with them.</p>
              <div className="roadmap-vertical">
                {CASE_STUDY_SUMMARY.map((step, i) => (
                  <div className="roadmap-vstep" key={step.title}>
                    <div className="roadmap-vnode-col">
                      <div className="roadmap-vnode mono">{i + 1}</div>
                      {i < CASE_STUDY_SUMMARY.length - 1 && <div className="roadmap-vline" aria-hidden="true"></div>}
                    </div>
                    <div className="roadmap-vtext">
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <a className="btn btn-secondary" href="/?view=case-study#top">View case study in detail &rarr;</a>
            </Reveal>
          </div>
        </section>

        <section id="services" className="section-alt">
          <div className="wrap">
            <Reveal>
              <div className="section-head">
                <p className="eyebrow">THE QUOTE-TO-CONTRACT BLUEPRINT</p>
                <h2>Three systems. One faster path from lead to signed contract.</h2>
                <p>Built on top of the tools you already use — no CRM migration, no new software your team has to learn from scratch.</p>
              </div>
            </Reveal>
            <div className="service-grid">
              {SERVICES.map((s, i) => (
                <Reveal delay={i * 90} key={i}>
                  <div className="service-card">
                    <div className={'service-icon ' + s.tint}><s.Icon /></div>
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                    <p className="service-benefit">{s.benefit}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="process">
          <div className="wrap">
            <Reveal>
              <div className="section-head">
                <p className="eyebrow">HOW AN ENGAGEMENT RUNS</p>
                <h2>Three stages, start to finish.</h2>
              </div>
            </Reveal>
            <div className="process-list">
              {PROCESS.map((s, i) => (
                <Reveal delay={i * 90} key={i}>
                  <div className="process-item">
                    <div className="process-num mono">{s.num}</div>
                    <div>
                      <h3>{s.title}</h3>
                      <p>{s.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="included" className="section-alt">
          <div className="wrap">
            <Reveal>
              <div className="section-head">
                <p className="eyebrow">WHAT YOU WALK AWAY WITH</p>
                <h2>Four concrete deliverables. Not a vague retainer.</h2>
                <p>Every engagement ends with things you can point to — not just advice.</p>
              </div>
            </Reveal>
            <div className="grid-2x2">
              {INCLUDED.map((s, i) => (
                <Reveal delay={i * 90} key={i}>
                  <div className="service-card">
                    <div className={'service-icon ' + s.tint}><s.Icon /></div>
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="about">
          <div className="wrap about-grid">
            <Reveal>
              <div className="about-photo">
                <img src={FOUNDER_PHOTO} alt="Ahmed Sohail, Founder of ThornView AI" />
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="about-copy">
                <p className="eyebrow">WHO'S BEHIND THIS</p>
                <p style={{ marginTop: '12px', fontSize: '1.05rem' }}>I've watched good sales teams lose winnable deals for a dumb reason: a hot lead sat untouched for two days while the rep was busy elsewhere. Not bad selling — bad timing. That's the problem ThornView AI exists to kill.</p>
                <p>My focus is narrow and deliberate: the AI systems that close the gap between a lead coming in and a rep actually reaching them. Every engagement starts with a real assessment of your funnel, not a generic package — you get a system built around how your team actually sells and the tools you already use.</p>
                <p className="about-name">Ahmed Sohail</p>
                <p className="about-role">Founder, ThornView AI</p>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="faq" className="section-alt">
          <div className="wrap">
            <Reveal>
              <div className="section-head">
                <p className="eyebrow">BEFORE YOU BOOK</p>
                <h2>Common questions.</h2>
              </div>
            </Reveal>
            <FAQ />
          </div>
        </section>

        <section id="book">
          <div className="wrap-book book-inner">
            <p className="eyebrow">READY WHEN YOU ARE</p>
            <h2 className="book-heading">Ready to see where your leads are leaking?</h2>
            <p className="book-sub">Book a 30-minute free assessment call below. No pitch deck — just a look at your current funnel and where the Quote-to-Contract Blueprint would plug in.</p>
            <Reveal delay={80} className="booking-wrap-outer">
            <div className="booking-wrap">
              <div className="booking-icon"><CalendarIcon /></div>
              <div>
                <h3 className="booking-title">Free Solar Funnel Assessment &mdash; 30 min</h3>
                <p className="booking-desc">Tap below to open the live calendar and pick a time &mdash; takes about 30 seconds.</p>
              </div>
              <a className="btn btn-primary book-cta-btn" href="https://calendly.com/ahmed-thornviewai/30min" target="_blank" rel="noopener">Choose a Time &rarr;</a>
              <p className="booking-or">Or pick a time right here:</p>
              <BookingCalendar src="https://calendly.com/ahmed-thornviewai/30min" />
              <div className="booking-fallback">
                <span>Prefer email? Reach out directly at <a href="mailto:ahmed@thornviewai.com" style={{ textDecoration: 'underline' }}>ahmed@thornviewai.com</a></span>
              </div>
            </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <div className="footer-row">
            <div className="footer-brand">
              <span className="brand-name">ThornView<span className="accent"> AI</span></span>
              <span className="footer-tagline">We Find the Thorns. AI Clears Them.</span>
            </div>
            <div className="footer-links">
              <a href="#services">Services</a>
              <a href="#about">About</a>
              <a href="mailto:ahmed@thornviewai.com">ahmed@thornviewai.com</a>
            </div>
          </div>
          <p className="footer-copy">&copy; 2026 ThornView AI. thornviewai.com</p>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default App;
