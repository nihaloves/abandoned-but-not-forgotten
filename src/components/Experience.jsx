import { useEffect, useRef, useState, useCallback } from "react";
import "./Experience.css";

const TARGET = 63; // frequency the visitor must find

function useRadio() {
  const ref = useRef({});
  const start = useCallback(() => {
    if (ref.current.ctx) return;
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const buf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buf; src.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass"; filter.frequency.value = 2000;
    const gain = ctx.createGain(); gain.gain.value = 0;
    src.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
    src.start();
    ref.current = { ctx, gain };
  }, []);
  const staticLevel = useCallback((v) => {
    const { ctx, gain } = ref.current;
    if (ctx) gain.gain.setTargetAtTime(v * 0.2, ctx.currentTime, 0.05);
  }, []);
  const ping = useCallback(() => {
    const { ctx } = ref.current;
    if (!ctx) return;
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.frequency.value = 880;
    g.gain.setValueAtTime(0.25, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.4);
    o.connect(g); g.connect(ctx.destination);
    o.start(); o.stop(ctx.currentTime + 1.4);
  }, []);
  return { start, staticLevel, ping };
}

function Starfield() {
  const ref = useRef();
  useEffect(() => {
    const c = ref.current, x = c.getContext("2d");
    const resize = () => { c.width = innerWidth; c.height = innerHeight; };
    resize(); addEventListener("resize", resize);
    const stars = Array.from({ length: 220 }, () => ({ x: Math.random(), y: Math.random(), z: Math.random() * 0.8 + 0.2 }));
    let raf;
    const tick = () => {
      x.clearRect(0, 0, c.width, c.height);
      stars.forEach((s) => {
        s.x -= 0.00012 * s.z; if (s.x < 0) s.x = 1;
        x.globalAlpha = s.z; x.fillStyle = "#efe7d6";
        x.fillRect(s.x * c.width, s.y * c.height, s.z * 1.8, s.z * 1.8);
      });
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="xp-stars" />;
}

function Garble({ text, noise }) {
  const [out, setOut] = useState(text);
  useEffect(() => {
    const id = setInterval(() => {
      const g = "▒░#%&*";
      setOut([...text].map((c) => (c === " " ? c : Math.random() < noise ? g[Math.floor(Math.random() * g.length)] : c)).join(""));
    }, 80);
    return () => clearInterval(id);
  }, [text, noise]);
  return <>{out}</>;
}

function Tuner({ radio, onLock }) {
  const [v, setV] = useState(10);
  const closeness = Math.max(0, 1 - Math.abs(v - TARGET) / 25);
  useEffect(() => { radio.staticLevel(1 - closeness); }, [closeness]);
  useEffect(() => {
    if (closeness < 0.93) return;
    const t = setTimeout(() => { radio.staticLevel(0); onLock(); }, 900);
    return () => clearTimeout(t);
  }, [closeness]);
  return (
    <div className="xp-center">
      <p className="xp-label">SIGNAL DETECTED · {(88 + v / 10).toFixed(1)} MHz</p>
      <h2 className="xp-garble"><Garble text="SOMETHING IS STILL TRANSMITTING" noise={1 - closeness} /></h2>
      <input type="range" min="0" max="100" value={v} onChange={(e) => setV(+e.target.value)} className="xp-tuner" />
      <p className="xp-hint">Drag to tune the signal</p>
    </div>
  );
}

function Transmission({ story, onRewind }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (n >= story.evidence.length) return;
    const t = setTimeout(() => setN(n + 1), 1800);
    return () => clearTimeout(t);
  }, [n]);
  return (
    <div className="xp-center">
      <p className="xp-label">SURVIVING EVIDENCE · {story.name.toUpperCase()}</p>
      {story.evidence.slice(0, n).map((l, i) => <p key={i} className="xp-line">{l}</p>)}
      {n >= story.evidence.length && <button className="xp-btn" onClick={onRewind}>⏪ Rewind the story</button>}
    </div>
  );
}

function Flashback({ story, onDone }) {
  const [year, setYear] = useState(story.chapters[0].year);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setYear(+e.target.dataset.year)),
      { threshold: 0.6 }
    );
    document.querySelectorAll(".xp-chapter[data-year]").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return (
    <div className="xp-flash">
      <div className="xp-year">{year}</div>
      {story.chapters.map((c) => (
        <section
          key={c.year}
          data-year={c.year}
          className={`xp-chapter ${c.image ? "xp-chapter--image" : ""}`}
        >
          {c.image && <img className="xp-chapter__image" src={c.image} alt="" />}
          <div className="xp-chapter__content">
            <p className="xp-label">{c.year}</p>
            <h2>{c.title}</h2>
            <p>{c.text}</p>
          </div>
          {c.credit && <p className="xp-chapter__credit">{c.credit}</p>}
        </section>
      ))}
      <section className="xp-chapter">
        <p className="xp-machine">{story.machineVoice}</p>
        <button className="xp-btn" onClick={onDone}>Look beyond →</button>
      </section>
    </div>
  );
}

function Expand({ onSelectOpportunity }) {
  const [activeHint, setActiveHint] = useState(null);
  const dots = [
    { x: 62, y: 40, name: "Opportunity", live: true },
    { x: 24, y: 58, name: "Apollo stations" },
    { x: 80, y: 22, name: "Pioneer 10" },
    { x: 45, y: 72, name: "NEAR Shoemaker" },
    { x: 15, y: 25, name: "Kepler" },
    { x: 70, y: 66, name: "InSight" },
  ];
  return (
    <div className="xp-field">
      <p className="xp-label xp-top">THERE ARE MORE SIGNALS</p>
      {dots.map((d) => (
        <button
          key={d.name}
          type="button"
          className={`xp-dot ${d.live ? "" : "dim"} ${activeHint === d.name ? "is-active" : ""}`}
          style={{ left: d.x + "%", top: d.y + "%" }}
          aria-label={d.live ? "Opportunity — tune signal" : `${d.name} — more stories coming`}
          aria-expanded={!d.live && activeHint === d.name}
          onClick={() => {
            if (d.live) onSelectOpportunity();
            else setActiveHint(activeHint === d.name ? null : d.name);
          }}
        >
          <span className="xp-dot__planet" aria-hidden="true" />
          <em>{d.live ? d.name : "signal faint"}</em>
          {!d.live && <span className="xp-dot__hint">More stories coming</span>}
        </button>
      ))}
    </div>
  );
}

export default function Experience({ story }) {
  const [stage, setStage] = useState("gate");
  const radio = useRadio();

  useEffect(() => {
    if (stage === "drift") {
      const t = setTimeout(() => { radio.ping(); setStage("interrupt"); }, 7000);
      return () => clearTimeout(t);
    }
    if (stage === "interrupt") {
      const t = setTimeout(() => setStage("tune"), 2500);
      return () => clearTimeout(t);
    }
  }, [stage]);

  return (
    <main className={`xp ${stage === "interrupt" ? "glitch" : ""} ${stage === "flashback" ? "rewind" : ""}`}>
      <Starfield />
      {stage === "gate" && (
        <div className="xp-center">
          <p className="xp-label">HEADPHONES RECOMMENDED</p>
          <button className="xp-btn" onClick={() => { radio.start(); setStage("drift"); }}>Begin</button>
        </div>
      )}
      {stage === "drift" && <div className="xp-center"><p className="xp-line">Out here, there is mostly silence.</p></div>}
      {stage === "interrupt" && <div className="xp-center"><h2 className="xp-alert">UNKNOWN SIGNAL</h2></div>}
      {stage === "tune" && <Tuner radio={radio} onLock={() => setStage("transmission")} />}
      {stage === "transmission" && <Transmission story={story} onRewind={() => setStage("flashback")} />}
      {stage === "flashback" && <Flashback story={story} onDone={() => setStage("expand")} />}
      {stage === "expand" && <Expand onSelectOpportunity={() => setStage("tune")} />}
    </main>
  );
}