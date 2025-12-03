import { useState, useRef, useEffect } from 'react';
import type { SyntheticEvent } from 'react';
import './App.css';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  const fitRotatedVideo = () => {
    const v = heroVideoRef.current;
    const c = heroRef.current;
    if (!v || !c) return;
    const cw = c.clientWidth;
    const ch = c.clientHeight;
    const vw = v.videoWidth;
    const vh = v.videoHeight;
    if (!vw || !vh) return;
    const k = Math.max(cw / vh, ch / vw);
    v.style.width = `${vw * k}px`;
    v.style.height = `${vh * k}px`;
    v.style.left = '50%';
    v.style.top = '50%';
    v.style.right = 'auto';
    v.style.bottom = 'auto';
    v.style.transform = 'translate(-50%, -50%) rotate(90deg)';
    v.style.transformOrigin = 'center';
  };

  const handleHeroVideoLoaded = (e: SyntheticEvent<HTMLVideoElement>) => {
    const v = e.currentTarget;
    const portrait = v.videoHeight > v.videoWidth;
    if (portrait) {
      v.classList.add('rotate-90');
      fitRotatedVideo();
    } else {
      v.classList.remove('rotate-90');
      v.style.width = '100%';
      v.style.height = '100%';
      v.style.left = '0';
      v.style.top = '0';
      v.style.transform = 'none';
    }
  };

  useEffect(() => {
    const onResize = () => {
      const v = heroVideoRef.current;
      if (!v) return;
      const portrait = v.videoHeight > v.videoWidth;
      if (portrait) {
        fitRotatedVideo();
      } else {
        v.style.width = '100%';
        v.style.height = '100%';
        v.style.left = '0';
        v.style.top = '0';
        v.style.right = '0';
        v.style.bottom = '0';
        v.style.transform = 'none';
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  };

  const toolkitItems = [
    { id: 1, label: 'PDF · Printable · Letter/A4', title: 'Full Printable KPI Logs', description: 'Track weekly sessions, match outcomes, and key stats over the 8 weeks. See your progress in real numbers.', file: 'Full Printable KPI Logs.pdf' },
    { id: 2, label: 'PDF · Printable · Letter/A4', title: '8-Week Progress Planner (Single Weeks)', description: 'Schedule short, focused sessions week by week, aligned with the progression. Make practice fit your real life.', file: '8-Week Progress Planner SINGLE WEEKS.pdf' },
    { id: 3, label: 'PDF · Printable · Letter/A4', title: 'Partner Communication Templates', description: 'Quick prompts and templates to align with your partner on roles, stacking basics, and coverage.', file: 'Partner Communication Templates.pdf' },
    { id: 4, label: 'PDF · Printable · Letter/A4', title: 'Edge Case Reference Cards', description: 'Simple decision helpers for tricky rules and scoring edge cases. Stop guessing, play confidently.', file: 'Edge Case Reference Cards.pdf' },
    { id: 5, label: 'PDF · Printable · Letter/A4', title: 'Pre-Match Warm-Up Gear', description: 'Fast, practical checklist and routine to get ready safely before playing.', file: 'Pre-Match Warm-Up Gear.pdf' },
    { id: 6, label: 'PDF · Printable · Letter/A4', title: 'Post-Game Recovery Notes', description: 'Short recovery notes and prompts to reinforce what you learned and protect your body.', file: 'Post-Game Recovery Notes.pdf' },
    { id: 7, label: 'PDF · Printable · Letter/A4', title: 'Injury-Smart Mobility', description: 'A realistic mobility guide focused on prevention for shoulders, elbows, and knees.', file: 'Injury-Smart Mobility.pdf' }
  ];

  const steps = [
    { number: 1, title: 'Before Each Week Starts', description: 'Open the 8-Week Session Planner and schedule realistic sessions around work and family. Aim for short, focused blocks instead of ‘perfect’ long practices. Pick drills from the book that match that week\'s focus, and be honest about how much time you actually have.' },
    { number: 2, title: 'During Each Session', description: 'Bring the drill tracking sheets and diagrams. Work on a small number of focused drills. Mark reps, success rates, or rally counts. Avoid random hitting. Quality beats quantity.' },
    { number: 3, title: 'After You Play', description: 'Log matches and notes in the KPI logs. Track patterns like errors in transition, losing to bangers, or NVZ mistakes. Use these data points to choose which drills to emphasize next week.' }
  ];


  const strategies = [
    {
      title: 'How to Handle Bangers Without Changing Your Whole Game',
      content: 'You do not need to become a banger to beat bangers. Focus on these adjustments:\n• Slightly close your paddle angle to redirect pace downward instead of popping it up.\n• Make contact in front of your body so you can control the ball instead of reacting late.\n• Soften your grip slightly to absorb pace rather than meeting force with force.\n• Use resets to bring the ball down softly into the kitchen. Do not panic and drive it back hard.\n\nPractice these patterns in your drill sessions so they feel automatic during matches. Track your reset success rate in your KPI logs.'
    },
    {
      title: 'Smart Doubles Positioning and Stacking Basics',
      content: 'Good doubles positioning keeps you and your partner connected as you move forward together:\n• Stay side by side as much as possible. Avoid one player at the NVZ and one at the baseline.\n• Move together toward the kitchen after the serve and return. Do not leave your partner stranded.\n• Basic stacking lets both players protect their strong forehands. Start simple: stack only on one side if you are new to it.\n• Communicate clearly before the point starts so both players know who covers which side.\n\nThe Third-Shot & Reset Pattern Diagrams PDF shows these movements visually. Review them before your session.'
    },
    {
      title: 'Court Etiquette on Crowded Public Courts',
      content: 'Public courts can be busy. Here is how to play well with others:\n• Rotate in and out fairly. If courts are packed, play one game and let the next group on.\n• Communicate with new partners before the point. Keep it simple: "I will take the middle" or "You serve first."\n• Handle mixed-level games respectfully. If you are the stronger player, focus on placement and consistency instead of overpowering weaker players.\n• Return stray balls quickly and call "ball on court" loudly if a ball rolls onto your court during a point.\n\nGood etiquette makes everyone want to play with you again. That means more reps and faster progress.'
    },
    {
      title: 'When to Push for 3.5 — and How to Know You\'re Ready',
      content: 'Use objective signs instead of gut feeling to know when you are ready for 3.5:\n• Consistency of serve and return: you can place 8 out of 10 serves deep and hit 8 out of 10 returns past the NVZ.\n• Ability to execute third-shot patterns: you can drop or drive intentionally and move forward together with your partner.\n• Reset success: you can absorb pace and bring the ball down softly at least 6 out of 10 times under pressure.\n• NVZ control: you can dink patiently, recognize attackable balls, and avoid unforced errors at the kitchen line.\n• Match outcomes: you win consistently against typical 3.0 players and compete closely with 3.5 players.\n\nReview your KPI logs after week 8. If your numbers show consistent improvement in these areas, you are ready.'
    }
  ];

  const faqs = [
    { q: 'Is this toolkit really free?', a: 'Yes. If you bought the book, you get full access to these resources at no extra cost. No hidden fees, no subscriptions.' },
    { q: 'Do I have to create an account to download the PDFs?', a: 'No. You can download them directly from this page. Optionally, you may join the email list at the bottom of the page for future updates, but it is not required to access the toolkit.' },
    { q: 'Can I use this toolkit without the book?', a: 'You will get some value from the drill sheets and diagrams on their own, but they are designed to work best alongside the explanations and week-by-week structure in the book. The book provides the context and progression that makes these tools most effective.' },
    { q: 'Is this medical or rehab advice?', a: 'No. The warm-up and injury-smart content is general educational information only and is not a substitute for professional medical advice, diagnosis, or treatment. If you have pain or a specific injury, consult a qualified healthcare provider before starting any exercise program.' }
  ];

  return (
    <div className="landing-page">
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">Pickleball Progress Pack</div>
            <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle navigation menu">☰</button>
            <nav className={mobileMenuOpen ? 'active' : ''}>
              <ul>
                <li><a href="#toolkit" onClick={(e) => { e.preventDefault(); scrollToSection('toolkit'); }}>Toolkit</a></li>
                <li><a href="#how-it-works" onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }}>How It Works</a></li>
                <li><a href="#videos" onClick={(e) => { e.preventDefault(); scrollToSection('videos'); }}>Videos</a></li>
                <li><a href="#strategy-hub" onClick={(e) => { e.preventDefault(); scrollToSection('strategy-hub'); }}>Strategy Hub</a></li>
                <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a></li>
                <li><a href="#faq" onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }}>FAQ</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main>
        <section className="hero" ref={heroRef}>
          <video
            className="hero-video"
            ref={heroVideoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            controls={false}
            controlsList="nodownload noplaybackrate nofullscreen"
            onLoadedMetadata={handleHeroVideoLoaded}
            poster="images/pexels-lindsey-flynn-494668519-19642670.jpg"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
          >
            <source src="videos/hero_1080p.mp4" type="video/mp4" />
          </video>
          <div className="hero-mobile-image" aria-hidden="true">
            <img src="images/hero-mobile.jpg" alt="Pickleball mobile background" />
          </div>
          <div className="container">
            <div className="hero-content">
              <div className="hero-text" style={{
                background: 'rgba(16, 42, 67, 0.55)',
                padding: '24px',
                borderRadius: '12px',
                backdropFilter: 'saturate(1.05) brightness(0.95)',
                color: '#FFFFFF',
                textShadow: '0 3px 12px rgba(0,0,0,0.55)'
              }}>
                <h1 style={{ color: '#FFFFFF' }}>Your 8-Week Pickleball Progress Pack</h1>
                <p className="subheadline" style={{ color: 'rgba(255,255,255,0.92)' }}>Free printable PDFs, KPI logs, and video-backed drills that help you go from 2.5 to 3.5 playing smarter, not harder.</p>
                <p style={{ color: 'rgba(255,255,255,0.90)' }}>If you bought the book, this is where you turn pages into real on-court progress. Plan sessions, track KPIs, use diagrams, and reinforce key patterns with tools built to fit your busy schedule.</p>
                <div className="hero-cta">
                  <button className="btn" onClick={() => scrollToSection('toolkit')}>Download Your Free Toolkit</button>
                  <button className="btn btn-secondary" onClick={() => scrollToSection('how-it-works')}>Explore the Resources</button>
                </div>
                <p className="hero-note" style={{ color: 'rgba(255,255,255,0.85)' }}>No spam. No upsells. Just practical tools to help you improve, week by week.</p>
              </div>
              {/* Video di sfondo attivo; box testo semitrasparente per contrasto */}
            </div>
          </div>
        </section>

        <section id="toolkit">
          <div className="container">
            <h2>What's Inside Your Free Toolkit</h2>
            <p className="section-intro">Every resource is designed to work with the 8-week plan: printable, practical, and easy to use right after a session.</p>
            <div className="toolkit-grid">
              {toolkitItems.map((item) => (
                <div key={item.id} className="toolkit-card">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <a href={`pdfs/${encodeURIComponent(item.file)}`} className="btn" download target="_blank" rel="noopener noreferrer" aria-label={`Download: ${item.title}`}>Download PDF</a>
                </div>
              ))}
            </div>
            <p className="toolkit-note">You can print these pages or fill them on a tablet. Use whatever fits your routine best.</p>
          </div>
        </section>

        <section id="how-it-works" className="how-it-works">
          <div className="container">
            <h2>How to Use This Toolkit With Your 8-Week Plan</h2>
            <p className="section-intro">The toolkit is built to plug directly into the book's week-by-week progression.</p>
            <div className="steps-grid">
              {steps.map((step) => (
                <div key={step.number} className="step">
                  <div className="step-number">{step.number}</div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
            <div className="closing-note">
              <p>Small, consistent, measured improvements across 8 weeks are how many 2.5 players progress toward a confident 3.0 to 3.5. Trust the process.</p>
            </div>
          </div>
        </section>

        <section id="videos" className="videos">
          <div className="container">
            <h2>On-Court Video Library</h2>
            <p className="section-intro">These short clips make key skills easier to understand visually and complement the drills and diagrams from the book.</p>
            <div className="video-grid">
              {/* 1) Serve & Return Fundamentals */}
              <div className="video-card">
                <div className="video-wrapper">
                  <iframe
                     src="https://www.youtube.com/embed/Kh0f3HH2yNY"
                     title="Pickleball serve and return fundamentals video"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowFullScreen
                     loading="lazy"
                   ></iframe>
                </div>
                <div className="video-info">
                  <h3>Serve & Return Fundamentals</h3>
                  <p>Learn how to place your serves and returns with better depth and positioning, so you and your partner start each point on the front foot instead of scrambling.</p>
                </div>
              </div>

              {/* 2) Third-Shot Drop Basics */}
              <div className="video-card">
                <div className="video-wrapper">
                  <iframe
                     src="https://www.youtube.com/embed/xu6pukeV32w"
                     title="Pickleball third-shot drop basics video"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowFullScreen
                     loading="lazy"
                   ></iframe>
                </div>
                <div className="video-info">
                  <h3>Third-Shot Drop Basics</h3>
                  <p>A clear breakdown of the third-shot drop for adult recreational players. Focus on contact point, arc, and target zones so you can move safely from the baseline to the non-volley zone.</p>
                </div>
              </div>

              {/* 3) Third-Shot Drop Drills */}
              <div className="video-card">
                <div className="video-wrapper">
                  <iframe
                     src="https://www.youtube.com/embed/aLBgoxT5cIY"
                     title="Pickleball third-shot drop drills video"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowFullScreen
                     loading="lazy"
                   ></iframe>
                </div>
                <div className="video-info">
                  <h3>Third-Shot Drop Drills</h3>
                  <p>Simple, repeatable drills you can plug into your sessions to turn the third-shot drop from a guess into a reliable pattern that supports your 8-week progress plan.</p>
                </div>
              </div>

              {/* 4) Partner Positioning on Serve & Return */}
              <div className="video-card">
                <div className="video-wrapper">
                  <iframe
                     src="https://www.youtube.com/embed/jhcCdDS1lFU"
                     title="Pickleball partner positioning on serve and return video"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowFullScreen
                     loading="lazy"
                   ></iframe>
                </div>
                <div className="video-info">
                  <h3>Partner Positioning on Serve & Return</h3>
                  <p>How you and your partner should stand and move on serve and return so you stay connected, cover the right spaces, and stop giving away free points.</p>
                </div>
              </div>

              {/* 5) Injury-Smart Warm-Up for Pickleball */}
              <div className="video-card">
                <div className="video-wrapper">
                  <iframe
                     src="https://www.youtube.com/embed/P9f1EPrAM2c"
                     title="Prevent Pickleball Injuries With These 7 Dynamic Warm-Ups"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowFullScreen
                     loading="lazy"
                   ></iframe>
                </div>
                <div className="video-info">
                  <h3>Injury-Smart Warm-Up for Pickleball</h3>
                  <p>A practical, pickleball-specific warm-up that helps you protect your joints and muscles before you play. Use these dynamic movements to reduce injury risk and feel ready to move faster on court.</p>
                </div>
              </div>

              {/* 6) How to Beat Bangers (Hard-Hitting Players) */}
              <div className="video-card">
                <div className="video-wrapper">
                  <iframe
                     src="https://www.youtube.com/embed/7Od22lpHul4"
                     title="You Will Beat Bangers EASILY if You Follow This Process"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowFullScreen
                     loading="lazy"
                   ></iframe>
                </div>
                <div className="video-info">
                  <h3>How to Beat Bangers (Hard-Hitting Players)</h3>
                  <p>Step-by-step ideas to handle hard-hitting players without changing your whole game. Learn how to stay calm, control the pace, and turn their power into mistakes instead of free points.</p>
                </div>
              </div>
            </div>
            <p className="video-note">Watch these before or after sessions to reinforce the week’s focus.</p>
          </div>
        </section>

        <section id="strategy-hub" className="strategy-hub">
          <div className="container">
            <h2>Strategy & Tips Hub</h2>
            <p className="section-intro">Quick, practical answers to common problems between 2.5 and 3.5, especially around doubles play and bangers.</p>
            <div className="strategy-grid">
              {strategies.map((strategy, idx) => (
                <details key={idx} className="strategy-item">
                  <summary>{strategy.title}</summary>
                  <div className="strategy-content">
                    {strategy.content.split('\n').map((line, i) =>
                      line.trim().startsWith('•') ?
                        <div key={i} className="bullet-item">{line.replace('•', '').trim()}</div> :
                        line.trim() && <p key={i}>{line}</p>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="about">
          <div className="container">
            <img src="images/pexels-davidgari-17333854.jpg" alt="Pickleball court detail" style={{ width: '100%', borderRadius: 8, marginBottom: 24, boxShadow: 'var(--shadow)' }} loading="lazy" decoding="async" />
            <h2>About the Book</h2>
            <p>This companion site supports the book "Pickleball 2.5 to 3.5 in 8 Weeks," a practical, zero-fluff playbook for adult recreational players who want measurable progress without living on the courts.</p>
            <p>The book provides:</p>
            <ul>
              <li>A clear 8-week roadmap with week-by-week focus areas and realistic session lengths.</li>
              <li>Drill progressions tied to real match skills: serve, return, third-shot, resets, and dinks.</li>
              <li>Modern doubles strategies including how to handle bangers, basic stacking, and smart positioning.</li>
              <li>KPIs and tracking tools so you measure progress instead of guessing.</li>
              <li>Injury-smart routines that help prevent common overuse issues in shoulders, elbows, and knees. This is prevention-oriented guidance, not medical treatment.</li>
              <li>Technique breakdowns in plain language with visual diagrams, not jargon.</li>
            </ul>
            <p>The approach is simple: play smarter, not just harder. Focus on measurable improvements in the skills that matter most in doubles. Build a sustainable practice routine that fits your real life.</p>
          </div>
        </section>

        <section id="faq" className="faq">
          <div className="container">
            <h2>FAQ</h2>
            <div className="faq-grid">
              {faqs.map((faq, idx) => (
                <details key={idx} className="faq-item">
                  <summary>{faq.q}</summary>
                  <div className="faq-content">
                    <p>{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-info">
              <h3>Pickleball Progress Pack</h3>
              <p>A companion resource for readers of "Pickleball 2.5 to 3.5 in 8 Weeks."</p>
              <p>Questions? Email us at <a href="mailto:pickleball2.5to3.5@gmail.com">pickleball2.5to3.5@gmail.com</a></p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Pickleball 2.5 to 3.5 in 8 Weeks. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
