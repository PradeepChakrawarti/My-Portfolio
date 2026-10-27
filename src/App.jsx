import React, { useState, useEffect, useRef } from "react";

// ---------- Scroll Reveal Hook ----------
function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); obs.unobserve(el); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, shown];
}

function Reveal({ children, delay = 0, style }) {
  const [ref, shown] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: shown ? 1 : 0,
      transform: shown ? "translateY(0)" : "translateY(40px)",
      transition: `all 0.7s cubic-bezier(.2,.7,.3,1) ${delay}s`,
      ...style,
    }}>{children}</div>
  );
}

// ---------- Animated Office Scene ----------
function OfficeScene() {
  return (
    <div className="scene">
      {["⚙️","🧪","</>","🤖","✓","{ }"].map((t, i) => (
        <span key={i} className={`bubble b${i}`}>{t}</span>
      ))}

      <div className="monitor">
        <div className="screen">
          <div className="screen-top">
            <span className="dot red" /><span className="dot yel" /><span className="dot grn" />
          </div>
          <div className="bars">
            <div className="bar bar1" />
            <div className="bar bar2" />
            <div className="bar bar3" />
            <div className="bar bar4" />
          </div>
          <div className="codeline l1" />
          <div className="codeline l2" />
          <div className="codeline l3" />
          <div className="pass">✓ 248 TESTS PASSED</div>
        </div>
        <div className="stand" />
        <div className="base" />
      </div>

      <div className="desk" />

      <div className="coffee">
        <span className="steam s1" />
        <span className="steam s2" />
      </div>

      <div className="person">
        <div className="head" />
        <div className="body" />
        <div className="arm" />
      </div>
      <div className="chair">
        <div className="chair-back" />
        <div className="chair-seat" />
        <div className="chair-pole" />
        <div className="chair-legs" />
      </div>
    </div>
  );
}

function Hero({ onNav }) {
  return (
    <section className="hero" id="root-top">
      <div className="hero-left">
        <div className="badge">✦ Available for opportunities</div>
        <h1>Hi, I'm <span className="grad-text">Pradeep Chakrawarti</span></h1>
        <h2 className="role">Automation Test Engineer <span className="amp">&</span> Front End Developer</h2>
        <p className="hero-desc">
          2.6 years crafting bug-free, high-quality software for global pharma
          leaders like Roche &amp; GSK. I turn complex testing challenges into
          elegant, automated solutions.
        </p>
        <div className="btn-row">
          <button className="btn primary" onClick={() => onNav("projects")}>🚀 View My Work</button>
          <button className="btn ghost" onClick={() => onNav("contact")}>Let's Talk</button>
        </div>
      </div>
      <div className="hero-right">
        <OfficeScene />
      </div>
    </section>
  );
}

function Section({ id, title, kicker, children }) {
  return (
    <section id={id} className="section">
      <Reveal>
        {kicker && <div className="kicker">{kicker}</div>}
        <h2 className="sec-title">{title}</h2>
        <div className="underline" />
      </Reveal>
      {children}
    </section>
  );
}

function About() {
  const stats = [["2.6+","Years Experience"],["100%","Bug-Free Delivery"],["2","Global Pharma Clients"]];
  return (
    <Section id="about" kicker="GET TO KNOW ME" title="About Me">
      <div className="about">
        <Reveal delay={0.1} style={{ flex: "1 1 340px" }}>
          <p>
            I'm an <strong>SDET</strong> at a multinational company in the pharma
            &amp; production domain, serving established global partners like
            <strong> Roche</strong> and <strong>GSK</strong>. I build robust
            automation frameworks that catch bugs before anyone else sees them.
          </p>
          <p>
            Beyond testing, I love crafting clean, responsive
            <strong> front-end interfaces</strong> — blending quality engineering
            with a developer's eye for detail.
          </p>
        </Reveal>
        <Reveal delay={0.2} style={{ flex: "1 1 260px" }}>
          <div className="stats">
            {stats.map(([n,l]) => (
              <div className="stat-box" key={l}>
                <div className="stat-num grad-text">{n}</div>
                <div className="stat-label">{l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function Skills() {
  const automation = ["Selenium","Java","JavaScript","API Testing","Android Testing","Manual QA"];
  const tools = ["CI/CD","Jenkins","AEM","Cucumber","Chai","Mocha","VEEVA Vault","Salesforce"];
  const Card = ({ icon, title, items, delay }) => (
    <Reveal delay={delay} style={{ flex: "1 1 320px" }}>
      <div className="glass-card">
        <div className="card-icon">{icon}</div>
        <h3>{title}</h3>
        <div className="chips">
          {items.map((s) => <span key={s} className="chip">{s}</span>)}
        </div>
      </div>
    </Reveal>
  );
  return (
    <Section id="skills" kicker="WHAT I DO" title="Skills & Tech Stack">
      <div className="flex-wrap">
        <Card icon="🧪" title="Test Automation & QA" items={automation} delay={0.1} />
        <Card icon="⚙️" title="Tools & Platforms" items={tools} delay={0.2} />
      </div>
    </Section>
  );
}

function Projects() {
  const projects = [
    { icon:"💊", title:"Pharma Automation Suite", tag:"SDET", desc:"End-to-end Selenium + Java framework for a global pharma client with Cucumber BDD reporting." },
    { icon:"🔗", title:"API Regression Framework", tag:"SDET", desc:"Scalable API suite using Chai & Mocha, integrated into Jenkins CI/CD pipelines." },
    { icon:"🗂️", title:"VEEVA Vault Validation", tag:"SDET", desc:"Automated validation flows for VEEVA Vault & Salesforce, ensuring compliance-ready delivery." },
    { icon:"🎨", title:"Responsive Web UI", tag:"Frontend", desc:"Clean, responsive front-end interfaces built with JavaScript and modern CSS." },
  ];
  return (
    <Section id="projects" kicker="MY WORK" title="Featured Projects">
      <div className="projects-grid">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.1}>
            <div className="glass-card project">
              <div className="proj-top">
                <span className="proj-icon">{p.icon}</span>
                <span className={`tag ${p.tag === "SDET" ? "tag-sdet" : "tag-fe"}`}>{p.tag}</span>
              </div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Experience() {
  return (
    <Section id="experience" kicker="MY JOURNEY" title="Experience">
      <Reveal delay={0.1}>
        <div className="glass-card exp">
          <div className="exp-glow" />
          <h3>SDET / Automation Test Engineer</h3>
          <div className="company">WPP Production · 2.6 Years · Present</div>
          <p>
            Working in a multinational company in the pharma &amp; production domain,
            serving well-established global business partners like <strong>Roche</strong> and
            <strong> GSK</strong>. Delivered bug-free projects using Selenium, Java, API testing,
            and CI/CD pipelines with Jenkins.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}

function Education() {
  const edu = [
    {
      degree: "Bachelor of Arts (BA) — English Literature",
      school: "Rani Durgavati International Univercity",
      period: "2018 –2020 ",
      desc: "English Literature specialization — mastered English through Shakespeare's classics, poetry, and prose, with a keen interest in Economics."
    },
    {
      degree: "Higher Secondary (12th)",
      school: "Your School",
      period: "2013 – 2017",
      desc: "A curious mind across Music, Math & Biology — exploring instruments and their endless learning curve, the thrill of cracking math theorems, and how chemical reactions shape real life and medicine."
    },
  ];
  return (
    <Section id="education" kicker="MY BACKGROUND" title="Education">
      <div className="flex-wrap">
        {edu.map((e, i) => (
          <Reveal key={e.degree} delay={i * 0.12} style={{ flex: "1 1 320px" }}>
            <div className="glass-card edu">
              <div className="edu-icon">🎓</div>
              <h3>{e.degree}</h3>
              <div className="company">{e.school} · {e.period}</div>
              <p>{e.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Hobbies() {
  const hobbies = [["🎵","Music"],["✍️","Writing"],["🚗","Driving"],["✈️","Travel"],["🎸","Instruments"]];
  return (
    <Section id="hobbies" kicker="BEYOND WORK" title="Hobbies & Interests">
      <div className="hobbies-grid">
        {hobbies.map(([icon, name], i) => (
          <Reveal key={name} delay={i * 0.08}>
            <div className="glass-card hobby">
              <div className="hobby-icon">{icon}</div>
              <div className="hobby-name">{name}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);

  const socials = [
    { name: "LinkedIn", href: "https://www.linkedin.com/in/pradeep-chakrawarti-4a279b245/" },
    { name: "GitHub", href: "https://github.com/pradeepchakrawarti/" },
    { name: "Email", href: "mailto:pk3898097@gmail.com" },
    { name: "Call", href: "tel:+910000000000" },
  ];

  return (
    <Section id="contact" kicker="SAY HELLO" title="Get In Touch">
      <Reveal delay={0.1}>
        <div className="contact glass-card">
          <p>Have a project or role in mind? Let's build something great together!</p>
          <input placeholder="Your Name" />
          <input placeholder="Your Email" />
          <textarea placeholder="Your Message" rows={4} />
          <button className="btn primary" onClick={() => setSent(true)}>
            {sent ? "✓ Message Sent!" : "Send Message ✈️"}
          </button>
          <div className="socials">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

function Navbar({ active, onNav, menuOpen, setMenuOpen }) {
  const links = ["home","about","skills","projects","experience","education","hobbies","contact"];
  return (
    <nav className="navbar">
      <div className="logo"><span className="grad-text">&lt;/&gt;</span> DevQA</div>
      <button className="hamburger" onClick={()=>setMenuOpen(!menuOpen)}>☰</button>
      <ul className={`navlinks ${menuOpen ? "open" : ""}`}>
        {links.map((l)=>(
          <li key={l}>
            <a href={`#${l}`} className={active===l?"active":""}
              onClick={(e)=>{e.preventDefault();onNav(l);setMenuOpen(false);}}>{l}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function App() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const handleNav = (id) => {
    setActive(id);
    const el = document.getElementById(id === "home" ? "root-top" : id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="app">
      <Navbar active={active} onNav={handleNav} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero onNav={handleNav} />
      <About /><Skills /><Projects /><Experience /><Education /><Hobbies /><Contact />
      <footer>© 2026 Your Name · Designed & Built with React ⚛️</footer>
      <style>{css}</style>
    </div>
  );
}

const css = `
* { margin:0; padding:0; box-sizing:border-box; }

/* FIX: overflow-x moved here (NOT on .app) so the fixed navbar works */
html, body { overflow-x:hidden; }

.app {
  font-family:'Segoe UI', system-ui, sans-serif;
  background:#0a0612;
  color:#e9e4f5; line-height:1.6;
  position:relative;
}
.app::before {
  content:""; position:fixed; inset:0; z-index:0;
  background:
    radial-gradient(600px circle at 15% 10%, rgba(124,58,237,0.25), transparent 50%),
    radial-gradient(500px circle at 85% 30%, rgba(236,72,153,0.18), transparent 50%),
    radial-gradient(500px circle at 50% 90%, rgba(56,189,248,0.15), transparent 50%);
  pointer-events:none;
}
.grad-text {
  background:linear-gradient(135deg,#a78bfa,#ec4899,#38bdf8);
  -webkit-background-clip:text; background-clip:text; color:transparent;
}

/* ===== NAVBAR — FIXED TO TOP ===== */
.navbar {
  position:fixed;
  top:0; left:0; right:0; width:100%;
  z-index:1000;
  display:flex; justify-content:space-between; align-items:center;
  padding:16px 6vw; background:rgba(10,6,18,0.85);
  backdrop-filter:blur(14px); border-bottom:1px solid rgba(255,255,255,0.08);
}
.logo { font-weight:800; font-size:20px; letter-spacing:0.5px; }
.hamburger { display:none; background:none; border:none; color:#fff; font-size:26px; cursor:pointer; }
.navlinks { display:flex; gap:4px; list-style:none; }
.navlinks a {
  text-decoration:none; padding:8px 12px; border-radius:10px;
  color:#a79cc2; font-weight:600; text-transform:capitalize; font-size:14px;
  transition:all .25s;
}
.navlinks a:hover { color:#fff; background:rgba(255,255,255,0.06); }
.navlinks a.active { color:#fff; background:linear-gradient(135deg,rgba(167,139,250,0.3),rgba(236,72,153,0.25)); }

/* HERO — extra top padding so content isn't hidden under the fixed navbar */
.hero {
  position:relative; z-index:1;
  display:flex; align-items:center; gap:40px; flex-wrap:wrap;
  padding:110px 6vw 70px;
  min-height:88vh;
}
.hero-left { flex:1 1 440px; }
.hero-right { flex:1 1 400px; display:flex; justify-content:center; }
.badge {
  display:inline-block; padding:7px 16px; border-radius:30px; font-size:13px;
  font-weight:600; color:#c4b5fd; margin-bottom:22px;
  background:rgba(167,139,250,0.12); border:1px solid rgba(167,139,250,0.3);
  animation:pulse 2.5s infinite;
}
@keyframes pulse { 50% { box-shadow:0 0 18px rgba(167,139,250,0.4); } }
.hero h1 { font-size:clamp(36px,6vw,62px); font-weight:800; line-height:1.1; }
.role { font-size:clamp(17px,2.6vw,24px); font-weight:600; color:#cbb5f5; margin:14px 0 20px; }
.amp { color:#ec4899; }
.hero-desc { max-width:520px; color:#a79cc2; font-size:17px; margin-bottom:30px; }
.btn-row { display:flex; gap:14px; flex-wrap:wrap; }
.btn {
  padding:13px 26px; border-radius:12px; font-weight:700; font-size:15px;
  cursor:pointer; border:none; transition:all .25s;
}
.btn.primary {
  color:#fff; background:linear-gradient(135deg,#7c3aed,#ec4899);
  box-shadow:0 8px 24px rgba(124,58,237,0.4);
}
.btn.primary:hover { transform:translateY(-3px); box-shadow:0 12px 30px rgba(236,72,153,0.5); }
.btn.ghost { color:#e9e4f5; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.15); }
.btn.ghost:hover { background:rgba(255,255,255,0.12); transform:translateY(-3px); }

/* ===== OFFICE SCENE ANIMATION ===== */
.scene {
  position:relative; width:380px; height:360px; max-width:90vw;
  animation:floatScene 6s ease-in-out infinite;
}
@keyframes floatScene { 50% { transform:translateY(-14px); } }
.monitor { position:absolute; top:20px; left:90px; }
.screen {
  width:200px; height:130px; border-radius:12px; padding:10px;
  background:linear-gradient(160deg,#1b1030,#120a24);
  border:2px solid rgba(167,139,250,0.5);
  box-shadow:0 0 40px rgba(124,58,237,0.5), inset 0 0 20px rgba(167,139,250,0.15);
  position:relative; overflow:hidden;
}
.screen-top { display:flex; gap:5px; margin-bottom:8px; }
.dot { width:8px; height:8px; border-radius:50%; }
.dot.red{background:#ff5f56;} .dot.yel{background:#ffbd2e;} .dot.grn{background:#27c93f;}
.bars { display:flex; align-items:flex-end; gap:8px; height:46px; margin-bottom:8px; }
.bar { width:20px; border-radius:4px 4px 0 0; background:linear-gradient(#a78bfa,#ec4899); }
.bar1{animation:grow 1.8s ease-in-out infinite;}
.bar2{animation:grow 1.8s ease-in-out infinite .3s;}
.bar3{animation:grow 1.8s ease-in-out infinite .6s;}
.bar4{animation:grow 1.8s ease-in-out infinite .9s;}
@keyframes grow { 0%,100%{height:30%;} 50%{height:100%;} }
.codeline { height:5px; border-radius:3px; margin:5px 0; background:rgba(255,255,255,0.15); }
.l1{width:80%;} .l2{width:55%;} .l3{width:68%;}
.pass {
  position:absolute; bottom:8px; left:10px; font-size:9px; font-weight:800;
  color:#27c93f; letter-spacing:0.5px; animation:blink 2s infinite;
}
@keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0.4;} }
.stand { width:14px; height:26px; background:#2a1d45; margin:0 auto; }
.base { width:70px; height:10px; border-radius:6px; background:#2a1d45; margin:0 auto; }
.desk {
  position:absolute; bottom:70px; left:40px; width:300px; height:16px;
  border-radius:8px; background:linear-gradient(#3a2a5c,#241a3d);
  box-shadow:0 10px 25px rgba(0,0,0,0.5);
}
.coffee {
  position:absolute; bottom:86px; left:60px; width:22px; height:18px;
  border-radius:0 0 8px 8px; background:#ec4899;
}
.coffee::after {
  content:""; position:absolute; right:-8px; top:3px; width:8px; height:8px;
  border:2px solid #ec4899; border-radius:50%;
}
.steam {
  position:absolute; top:-14px; width:3px; height:12px; border-radius:3px;
  background:rgba(255,255,255,0.4);
}
.steam.s1{left:6px; animation:steam 2s infinite;}
.steam.s2{left:13px; animation:steam 2s infinite .6s;}
@keyframes steam { 0%{opacity:0; transform:translateY(0) scaleX(1);} 50%{opacity:0.7;} 100%{opacity:0; transform:translateY(-14px) scaleX(1.6);} }
.person { position:absolute; bottom:86px; left:210px; z-index:3; }
.head {
  width:34px; height:34px; border-radius:50%;
  background:linear-gradient(135deg,#f0b89a,#e0a080); margin:0 auto;
  animation:nod 4s ease-in-out infinite;
}
@keyframes nod { 0%,100%{transform:rotate(0);} 50%{transform:rotate(-6deg);} }
.body {
  width:54px; height:56px; border-radius:18px 18px 10px 10px;
  background:linear-gradient(135deg,#7c3aed,#5b21b6); margin:-4px auto 0;
}
.arm {
  position:absolute; bottom:18px; left:-16px; width:34px; height:12px;
  border-radius:8px; background:#5b21b6; transform-origin:right center;
  animation:type 1.2s ease-in-out infinite;
}
@keyframes type { 0%,100%{transform:rotate(8deg);} 50%{transform:rotate(-10deg);} }
.chair { position:absolute; bottom:0; left:196px; z-index:2; }
.chair-back {
  width:60px; height:80px; border-radius:16px;
  background:linear-gradient(135deg,#2a1d45,#1a1230);
  border:2px solid rgba(167,139,250,0.3); margin:0 auto;
}
.chair-seat { width:70px; height:16px; border-radius:8px; background:#2a1d45; margin:-6px auto 0; }
.chair-pole { width:10px; height:30px; background:#241a3d; margin:0 auto; }
.chair-legs {
  width:64px; height:10px; border-radius:6px; background:#241a3d; margin:0 auto;
  position:relative;
}
.chair-legs::before, .chair-legs::after {
  content:""; position:absolute; bottom:-6px; width:12px; height:12px;
  border-radius:50%; background:#1a1230;
}
.chair-legs::before { left:0; } .chair-legs::after { right:0; }
.bubble {
  position:absolute; font-size:18px; font-weight:800; color:#c4b5fd;
  padding:8px 10px; border-radius:12px; background:rgba(167,139,250,0.1);
  border:1px solid rgba(167,139,250,0.3); backdrop-filter:blur(4px);
}
.b0{top:0; left:30px; animation:float1 5s ease-in-out infinite;}
.b1{top:40px; right:0; animation:float2 6s ease-in-out infinite;}
.b2{top:150px; right:10px; animation:float1 5.5s ease-in-out infinite .5s;}
.b3{bottom:40px; left:0; animation:float2 5s ease-in-out infinite 1s;}
.b4{top:90px; left:0; animation:float1 6.5s ease-in-out infinite .8s;}
.b5{bottom:10px; right:40px; animation:float2 5.5s ease-in-out infinite .3s;}
@keyframes float1 { 50%{transform:translateY(-16px) rotate(6deg);} }
@keyframes float2 { 50%{transform:translateY(14px) rotate(-6deg);} }

/* SECTIONS */
.section { position:relative; z-index:1; padding:70px 6vw; max-width:1120px; margin:0 auto; scroll-margin-top:90px; }
.kicker { font-size:13px; font-weight:800; letter-spacing:2px; color:#a78bfa; margin-bottom:10px; }
.sec-title { font-size:clamp(28px,4.5vw,40px); font-weight:800; color:#fff; }
.underline { width:64px; height:4px; border-radius:4px; margin:10px 0 40px;
  background:linear-gradient(90deg,#a78bfa,#ec4899); }
.flex-wrap { display:flex; gap:24px; flex-wrap:wrap; }
.about { display:flex; gap:40px; flex-wrap:wrap; align-items:center; }
.about p { color:#a79cc2; font-size:17px; margin-bottom:16px; }
.about strong { color:#e9e4f5; }
.stats { display:flex; flex-direction:column; gap:16px; }
.stat-box {
  padding:20px 24px; border-radius:16px; background:rgba(255,255,255,0.04);
  border:1px solid rgba(255,255,255,0.08);
}
.stat-num { font-size:34px; font-weight:800; }
.stat-label { font-size:14px; color:#a79cc2; }
.glass-card {
  background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.09);
  border-radius:20px; padding:28px; backdrop-filter:blur(10px);
  transition:transform .3s, box-shadow .3s, border-color .3s; height:100%;
}
.glass-card:hover {
  transform:translateY(-8px);
  border-color:rgba(167,139,250,0.5);
  box-shadow:0 18px 40px rgba(124,58,237,0.3);
}
.card-icon { font-size:34px; margin-bottom:14px; }
.glass-card h3 { font-size:20px; color:#fff; margin-bottom:14px; }
.chips { display:flex; flex-wrap:wrap; gap:10px; }
.chip {
  padding:8px 14px; border-radius:20px; font-size:14px; font-weight:600;
  background:rgba(167,139,250,0.1); border:1px solid rgba(167,139,250,0.25); color:#d6c9f5;
}
.projects-grid { display:grid; gap:22px; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); }
.proj-top { display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; }
.proj-icon { font-size:30px; }
.glass-card.project p { color:#a79cc2; font-size:15px; }
.tag { font-size:12px; font-weight:800; padding:5px 12px; border-radius:20px; }
.tag-sdet { background:rgba(236,72,153,0.15); color:#f9a8d4; }
.tag-fe { background:rgba(56,189,248,0.15); color:#7dd3fc; }
.glass-card.exp { position:relative; overflow:hidden; }
.exp-glow {
  position:absolute; top:-40px; right:-40px; width:140px; height:140px;
  border-radius:50%; background:radial-gradient(circle,rgba(236,72,153,0.3),transparent 70%);
}
.company { color:#a78bfa; font-weight:700; font-size:14px; margin:4px 0 12px; }
.glass-card.exp p { color:#a79cc2; font-size:15px; }
.glass-card.exp strong { color:#f9a8d4; }
.glass-card.edu .edu-icon { font-size:34px; margin-bottom:12px; }
.glass-card.edu p { color:#a79cc2; font-size:15px; margin-top:8px; }
.hobbies-grid { display:grid; gap:18px; grid-template-columns:repeat(auto-fit,minmax(150px,1fr)); }
.glass-card.hobby { text-align:center; padding:28px 16px; }
.hobby-icon { font-size:40px; margin-bottom:12px; }
.hobby-name { font-weight:600; font-size:15px; color:#e9e4f5; }
.contact { max-width:540px; display:flex; flex-direction:column; gap:14px; }
.contact > p { color:#a79cc2; }
.contact input, .contact textarea {
  padding:13px 16px; border-radius:12px; border:1px solid rgba(255,255,255,0.12);
  background:rgba(255,255,255,0.04); color:#e9e4f5; font-size:15px;
  outline:none; font-family:inherit; resize:vertical;
}
.contact input:focus, .contact textarea:focus { border-color:#a78bfa; }
.socials { display:flex; gap:18px; margin-top:8px; flex-wrap:wrap; }
.socials a { color:#a78bfa; text-decoration:none; font-weight:700; }
.socials a:hover { color:#ec4899; }
footer {
  position:relative; z-index:1; text-align:center; padding:34px; color:#a79cc2;
  border-top:1px solid rgba(255,255,255,0.08); font-size:14px;
}
@media (max-width:860px) {
  .hamburger { display:block; }
  .navlinks {
    display:none; position:absolute; top:64px; right:6vw; flex-direction:column;
    background:#150e26; border:1px solid rgba(255,255,255,0.1); border-radius:14px;
    padding:12px; min-width:180px;
  }
  .navlinks.open { display:flex; }
  .hero { text-align:center; }
  .hero-left { flex-basis:100%; }
  .btn-row { justify-content:center; }
  .badge { margin-left:auto; margin-right:auto; }
}
`;