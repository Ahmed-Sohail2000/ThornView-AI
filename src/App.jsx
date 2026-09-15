import React, { useState, useEffect, useRef } from 'react';

/* ---------------- Icons (single-color, currentColor, no gradients) ---------------- */
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8.5L6.2 12L13 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const BoltIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8Z" fill="currentColor"/></svg>
);
const ShieldCheckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M12 3l7 3v5c0 5-3.4 8.4-7 10-3.6-1.6-7-5-7-10V6l7-3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    <path d="M9 12.3l2 2 4-4.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const CalendarCheckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="3.5" y="5" width="17" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M3.5 9.5h17" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M8.3 14.3l2 2 4.6-4.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const ClipboardSearchIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="5" y="4" width="14" height="17" rx="2" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M9 3.5h6a1 1 0 011 1V6H8V4.5a1 1 0 011-1Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    <circle cx="10.8" cy="13" r="2.5" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M12.7 14.9L15 17.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);
const DocumentIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M7 3.5h7l4 4V20a1 1 0 01-1 1H7a1 1 0 01-1-1V4.5a1 1 0 011-1Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    <path d="M14 3.5V8h4" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    <path d="M9 12.2h6M9 15.6h6M9 8.8h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);
const WrenchIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M14.9 6.2a4 4 0 00-5.3 5.1l-6.3 6.3 2.4 2.4 6.3-6.3a4 4 0 005.1-5.3l-2.5 2.5-2.2-2.2 2.5-2.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const HeadsetIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M4.5 13.5a7.5 7.5 0 0115 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <rect x="3.2" y="13.5" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
    <rect x="16.8" y="13.5" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M19.3 19.5v.8a2.7 2.7 0 01-2.7 2.7h-1.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);
const CalendarIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M3 9.5H21" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M8 3V6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M16 3V6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <circle cx="8" cy="13.5" r="1.3" fill="currentColor"/>
    <circle cx="12" cy="13.5" r="1.3" fill="currentColor"/>
    <circle cx="16" cy="13.5" r="1.3" fill="currentColor"/>
  </svg>
);

/* ---------------- Booking calendar embed with blocked-frame fallback ----------------
   Browsers that block a cross-origin iframe (X-Frame-Options / CSP, ad blockers,
   corporate network policy) render their own native "broken" page *inside* the
   iframe box — that box still paints real pixels, so a fallback message layered
   behind it via CSS is always hidden underneath. There's no reliable way to detect
   a frame block directly (the iframe is cross-origin, so contentDocument/
   contentWindow access throws for a successful load too). Instead we use a timing
   heuristic: a blocked/refused frame resolves almost instantly, while the real
   Google Calendar booking widget takes noticeably longer to fetch and render. If
   "load" fires suspiciously fast, or never fires at all, we shrink the iframe to
   nothing and show a clean fallback card instead of a big broken box. */
function BookingCalendar({ src }) {
  const [blocked, setBlocked] = useState(false);
  const startRef = useRef(null);
  const timeoutRef = useRef(null);
  const resolvedRef = useRef(false);

  useEffect(() => {
    startRef.current = Date.now();
    timeoutRef.current = setTimeout(() => {
      if (!resolvedRef.current) {
        resolvedRef.current = true;
        setBlocked(true);
      }
    }, 6000);
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const handleLoad = () => {
    if (resolvedRef.current) return;
    resolvedRef.current = true;
    clearTimeout(timeoutRef.current);
    const elapsed = Date.now() - (startRef.current || 0);
    if (elapsed < 900) setBlocked(true);
  };

  return (
    <div className="booking-calendar-frame">
      {blocked && (
        <div className="calendar-fallback-msg">
          <CalendarIcon />
          <span>Your browser or network blocked the embedded calendar preview.<br/>Use the button above to book &mdash; it opens the same live calendar in a new tab.</span>
        </div>
      )}
      <iframe
        src={src}
        title="Book your free assessment"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={handleLoad}
        className={blocked ? 'iframe-hidden' : ''}
      ></iframe>
    </div>
  );
}

/* ---------------- Scroll-reveal + count-up helpers ---------------- */
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') { setInView(true); return; }
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        obs.disconnect();
      }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView(0.15);
  return (
    <div
      ref={ref}
      className={'reveal' + (inView ? ' in-view' : '') + (className ? ' ' + className : '')}
      style={{ transitionDelay: (inView ? delay : 0) + 'ms' }}
    >
      {children}
    </div>
  );
}

function CountUp({ end, suffix = '', duration = 1300 }) {
  const [ref, inView] = useInView(0.4);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = null;
    let frame;
    function step(ts) {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(end * eased));
      if (progress < 1) frame = requestAnimationFrame(step);
    }
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, end, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ---------------- Calculator ---------------- */
function Calculator() {
  const [reps, setReps] = useState(5);
  const [visits, setVisits] = useState(12);
  const UNQUALIFIED_RATE = 0.35;
  const COST_PER_VISIT = 200;

  const monthlyVisits = reps * visits;
  const yearlyVisits = monthlyVisits * 12;
  const wastedCost = yearlyVisits * UNQUALIFIED_RATE * COST_PER_VISIT;
  const formatted = '$' + Math.round(wastedCost).toLocaleString('en-US');

  return (
    <div className="calc-panel">
      <div className="calc-inputs">
        <div className="field">
          <label htmlFor="reps">Sales reps <span className="field-value mono">{reps}</span></label>
          <input type="range" id="reps" min="1" max="20" step="1" value={reps} onChange={e => setReps(Number(e.target.value))}/>
        </div>
        <div className="field">
          <label htmlFor="visits">Site visits per rep, per month <span className="field-value mono">{visits}</span></label>
          <input type="range" id="visits" min="2" max="30" step="1" value={visits} onChange={e => setVisits(Number(e.target.value))}/>
        </div>
      </div>
      <div className="calc-output">
        <p className="calc-out-label">ESTIMATED WASTED SPEND PER YEAR</p>
        <div className="calc-out-num mono">{formatted}</div>
        <p className="calc-out-sub">Based on {monthlyVisits} visits/mo &middot; 35% unqualified &middot; $200 avg. cost per wasted visit</p>
      </div>
    </div>
  );
}

/* ---------------- Demo simulator (auto-plays on scroll, two-person message thread) ---------------- */
const DEMO_STEPS = [
  { cls: 'lead', sender: 'Sarah M.', text: 'Requesting a quote for solar panels.', time: '2:14 PM' },
  { cls: 'ai', sender: 'ThornView AI', text: "Hi Sarah! Thanks for reaching out about solar for your home — I can get you a quick estimate. Mind sharing your average monthly electric bill?", time: '2:14 PM · 38s later' },
  { cls: 'system', text: 'Pre-qualified — roof condition confirmed, bill over $150/mo, homeowner verified', time: '' },
  { cls: 'ai', sender: 'ThornView AI', text: "Great news — you're a strong fit. I've got Thursday at 10:00 AM open for a site visit. Want me to book it?", time: '2:16 PM' },
  { cls: 'system', text: 'Booked — confirmation and reminder sequence sent automatically', time: '' }
];

function DemoRow({ cls, sender, text, time }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setShow(true));
    return () => cancelAnimationFrame(id);
  }, []);
  if (cls === 'system') {
    return (
      <div className={'demo-row system' + (show ? ' show' : '')}>
        <div className="demo-bubble">{text}</div>
      </div>
    );
  }
  return (
    <div className={'demo-row ' + cls + (show ? ' show' : '')}>
      <span className="demo-meta">{sender} &middot; {time}</span>
      <div className="demo-bubble">{text}</div>
    </div>
  );
}

function DemoSimulator() {
  const [visibleCount, setVisibleCount] = useState(0);
  const timeouts = useRef([]);
  const [wrapRef, inView] = useInView(0.35);

  useEffect(() => {
    if (!inView) return;
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
    DEMO_STEPS.forEach((_, i) => {
      const id = setTimeout(() => setVisibleCount(i + 1), 500 + i * 900);
      timeouts.current.push(id);
    });
    return () => timeouts.current.forEach(clearTimeout);
  }, [inView]);

  return (
    <div ref={wrapRef} className="demo-panel">
      <div className="demo-thread">
        {visibleCount === 0 ? (
          <div className="demo-waiting">Waiting for a new lead&hellip;</div>
        ) : (
          DEMO_STEPS.slice(0, visibleCount).map((s, i) => <DemoRow key={i} {...s} />)
        )}
      </div>
    </div>
  );
}

/* ---------------- Data-driven grids ---------------- */
const STATS = [
  { text: '$115K–$234K', label: 'Wasted per year on unqualified site visits, for a typical 5-rep sales team', source: 'Touchstone BPO', count: false, primary: true },
  { end: 78, suffix: '%', label: 'Of solar sales go to whichever company responds to the lead first', source: 'AgentZap, 2026', count: true },
  { end: 47, suffix: ' hrs', label: 'Average time a solar company takes to respond to a new inquiry', source: 'AgentZap, 2026', count: true, minor: true }
];

const SERVICES = [
  { Icon: BoltIcon, tint: 'icon-teal', title: 'Instant Response', desc: 'Every new lead gets a personalized text and email reply within minutes — any hour, any day — before a competitor gets the chance to.', benefit: 'Turns 47 hours into under 5 minutes.' },
  { Icon: ShieldCheckIcon, tint: 'icon-blue', title: 'Real Qualification', desc: 'Automated screening on roof condition, utility bill, HOA status, and credit — before anyone drives out for a site visit.', benefit: 'Cuts wasted visits, not booked ones.' },
  { Icon: CalendarCheckIcon, tint: 'icon-teal', title: 'Automated Booking', desc: 'Calendar booking, confirmation, and re-engagement sequences run themselves, so reps only show up to real appointments.', benefit: 'Fewer no-shows, more signed contracts.' }
];

const INCLUDED = [
  { Icon: ClipboardSearchIcon, tint: 'icon-blue', title: 'Full Funnel Assessment', desc: 'We map your entire lead-to-appointment funnel and pinpoint exactly where deals go cold — with real data pulled from your own numbers.' },
  { Icon: DocumentIcon, tint: 'icon-teal', title: 'Written Automation Roadmap', desc: 'A concrete, jargon-free plan naming the specific response, qualification, and booking systems to build first, and why.' },
  { Icon: WrenchIcon, tint: 'icon-amber', title: 'Hands-On Build Session', desc: 'We build the highest-impact piece of the roadmap with your team, wired directly into the tools you already use.' },
  { Icon: HeadsetIcon, tint: 'icon-blue', title: '30-Day Support', desc: 'Direct access to us for a month after launch to tune the system against real leads and answer questions as they come up.' }
];

const PROCESS = [
  { num: '01', title: 'Assess', desc: 'We map your current lead funnel end to end and find exactly where deals are leaking — with real numbers, not guesses.' },
  { num: '02', title: 'Build', desc: 'We build and connect the automation into your existing tools — response, qualification, and booking — no new CRM required.' },
  { num: '03', title: 'Launch', desc: 'You go live with a faster funnel, and we monitor the first 30 days with you to tune it against real leads.' }
];

/* ---------------- FAQ ---------------- */
const FAQ_ITEMS = [
  { q: 'Do I need to replace my CRM or booking tools?', a: "No. Everything is built on top of what you already use for lead intake, calendars, and messaging. The assessment tells us what's already working so we only add what's missing." },
  { q: 'How long does the assessment take?', a: "Typically one week from the first call to a written funnel breakdown, without disrupting your team's day-to-day sales activity." },
  { q: 'What if we already have some automation in place?', a: "We assess what's already running first. Most teams have partial automation with real gaps — we fix the gaps rather than rebuilding everything from scratch." },
  { q: 'Is this a long-term contract?', a: "No. Engagements are scoped per project — an assessment, then a build — not a subscription you're locked into." },
  { q: "I'm not a solar company — does this still apply?", a: 'Solar is the current focus area, but the same instant-response, qualification, and booking systems apply to any appointment-based, high-intent sales process. Ask on the call.' }
];

function FAQ() {
  return (
    <div className="faq-list">
      {FAQ_ITEMS.map((item, i) => (
        <Reveal delay={i * 70} key={i}>
          <details className="faq-item">
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        </Reveal>
      ))}
    </div>
  );
}

/* ---------------- App ---------------- */
function App() {
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
                <img src="data:image/jpeg;base64,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" alt="Ahmed Sohail, Founder of ThornView AI" />
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
                <p className="booking-desc">Pick a time below, or tap the button if the calendar doesn't load.</p>
              </div>
              <a className="btn btn-primary book-cta-btn" href="https://calendar.app.google/uSLhbaCFLZWS9QnY6" target="_blank" rel="noopener">Choose a Time &rarr;</a>
              <BookingCalendar src="https://calendar.app.google/uSLhbaCFLZWS9QnY6" />
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
