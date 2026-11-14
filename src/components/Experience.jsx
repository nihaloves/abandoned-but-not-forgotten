import { useEffect, useRef, useState, useCallback } from "react";
import { stories, signals } from "../data/stories";
import "./Experience.css";

const INTRO = [
  { text: "Somewhere out there, in the dark, there are machines we built.", ms: 4200 },
  { text: "We watched. We measured. We drew what we could see.", ms: 4200 },
  { text: "Then imagining wasn't enough.", ms: 3200 },
  { text: "So we built machines, and sent them where we could not go.", ms: 4200 },
  { text: "Mars. The Moon. The edge of the Solar System.", ms: 3800 },
  { text: "Some of them stopped answering.", ms: 4000 },
  { text: "title", ms: 5500 },
];

function useRadio() {
  const r = useRef({});
  const start = useCallback(() => {
    if (r.current.ctx) { r.current.ctx.resume(); return; }
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const master = ctx.createGain();
    master.connect(ctx.destination);
    // static
    const buf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = buf; noise.loop = true;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass"; bp.frequency.value = 2000;
    const sg = ctx.createGain(); sg.gain.value = 0;
    noise.connect(bp); bp.connect(sg); sg.connect(master); noise.start();
    // low space drone
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass"; lp.frequency.value = 220;
    const dg = ctx.createGain(); dg.gain.value = 0;
    [55, 55.4, 82.5].forEach((f) => {
      const o = ctx.createOscillator();
      o.type = "sawtooth"; o.frequency.value = f;
      o.connect(lp); o.start();
    });
    lp.connect(dg); dg.connect(master);
    dg.gain.setTargetAtTime(0.06, ctx.currentTime, 2);
    r.current = { ctx, sg, dg };
  }, []);
  const staticLevel = useCallback((v) => {
    const { ctx, sg } = r.current;
    if (ctx) sg.gain.setTargetAtTime(v * 0.2, ctx.currentTime, 0.05);
  }, []);
  const drone = useCallback((v) => {
    const { ctx, dg } = r.current;
    if (ctx) dg.gain.setTargetAtTime(v, ctx.currentTime, 1);
  }, []);
  const ping = useCallback(() => {
    const { ctx } = r.current;
    if (!ctx) return;
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.frequency.value = 880;
    g.gain.setValueAtTime(0.25, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.6);
    o.connect(g); g.connect(ctx.destination);
    o.start(); o.stop(ctx.currentTime + 1.6);
  }, []);
  return { start, staticLevel, drone, ping };
}

function Starfield({ speed }) {
  const ref = useRef();
  const sp = useRef(speed);
  useEffect(() => { sp.current = speed; }, [speed]);
  useEffect(() => {
    const c = ref.current, g = c.getContext("2d");
    const resize = () => { c.width = innerWidth; c.height = innerHeight; };
    resize(); addEventListener("resize", resize);
    const stars = Array.from({ length: 420 }, () => ({
      x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: Math.random(),
    }));
    let raf;
    const tick = () => {
      g.fillStyle = "rgba(10,16,20,0.35)";
      g.fillRect(0, 0, c.width, c.height);
      const cx = c.width / 2, cy = c.height / 2;
      const f = Math.max(c.width, c.height) * 0.25;
      for (const s of stars) {
        s.z -= sp.current;
        if (s.z <= 0.02) { s.x = Math.random() * 2 - 1; s.y = Math.random() * 2 - 1; s.z = 1; }
        const px = cx + (s.x / s.z) * f, py = cy + (s.y / s.z) * f;
        const r = Math.max(0.5, (1 - s.z) * 2.4);
        g.globalAlpha = 1 - s.z * 0.7;
        g.fillStyle = "#efe7d6";
        g.fillRect(px, py, r, r);
      }
      g.globalAlpha = 1;
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
      setOut([...text].map((c) =>
        c === " " ? c : Math.random() < noise ? g[Math.floor(Math.random() * g.length)] : c
      ).join(""));
    }, 80);
    return () => clearInterval(id);
  }, [text, noise]);
  return <>{out}</>;
}

function Tuner({ radio, story, onLock }) {
  const [v, setV] = useState(8);
  const closeness = Math.max(0, 1 - Math.abs(v - story.target) / 28);
  useEffect(() => { radio.staticLevel(1 - closeness); }, [closeness]);
  useEffect(() => {
    if (closeness < 0.93) return;
    const t = setTimeout(() => { radio.staticLevel(0); onLock(); }, 900);
    return () => clearTimeout(t);
  }, [closeness]);
  return (
    <div className="xp-center">
      <p className="xp-label">SIGNAL DETECTED · {(88 + v / 10).toFixed(1)} MHz</p>
      <h2 className="xp-garble">
        <Garble text="SOMETHING IS STILL TRANSMITTING" noise={1 - closeness} />
      </h2>
      <input type="range" min="0" max="100" value={v}
        onChange={(e) => setV(+e.target.value)} className="xp-tuner" />
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
      {n >= story.evidence.length && (
        <button className="xp-btn" onClick={onRewind}>⏪ Rewind the story</button>
      )}
    </div>
  );
}

function Flashback({ story, onDone }) {
  const [year, setYear] = useState(story.chapters[0].year);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.dataset.year && setYear(+e.target.dataset.year)),
      { threshold: 0.6 }
    );
    document.querySelectorAll(".xp-chapter").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [story]);
  return (
    <div className="xp-flash">
      <div className="xp-year">{year}</div>
      {story.chapters.map((c) => (
        <section key={story.id + c.year} data-year={c.year} className="xp-chapter">
          <div className="xp-bg" style={{ backgroundImage: `url(${c.image})` }} />
          <div className="xp-inner">
            <p className="xp-label">{c.year}</p>
            <h2>{c.title}</h2>
            <p>{c.text}</p>
          </div>
          <p className="xp-credit">Image: {c.credit}</p>
        </section>
      ))}
      <section className="xp-chapter">
        <div className="xp-inner">
          <p className="xp-machine">{story.machineVoice}</p>
          <p>{story.legacy}</p>
          <p className="xp-sources">Sources: {story.sources.join(" · ")}</p>
          <button className="xp-btn" onClick={onDone}>Look beyond →</button>
        </div>
      </section>
    </div>
  );
}

function Expand({ seen, onPick }) {
  return (
    <div className="xp-field">
      <p className="xp-label xp-top">THERE ARE MORE SIGNALS</p>
      {signals.map((d) => {
        const live = d.id && stories[d.id];
        return (
          <div key={d.name}
            className={`xp-dot ${live ? "live" : "dim"} ${seen.includes(d.id) ? "seen" : ""}`}
            style={{ left: d.x + "%", top: d.y + "%" }}
            onClick={() => live && onPick(d.id)}>
            <span />
            <em>{live ? d.name : "signal faint · more stories coming"}</em>
          </div>
        );
      })}
    </div>
  );
}

export default function Experience() {
  const [stage, setStage] = useState("gate");
  const [card, setCard] = useState(0);
  const [id, setId] = useState("opportunity");
  const [seen, setSeen] = useState([]);
  const radio = useRadio();
  const story = stories[id];

  useEffect(() => { window.scrollTo(0, 0); }, [stage]);

  useEffect(() => {
    if (stage === "intro") {
      if (card >= INTRO.length) { setStage("drift"); return; }
      const t = setTimeout(() => setCard(card + 1), INTRO[card].ms);
      return () => clearTimeout(t);
    }
    if (stage === "drift") {
      const t = setTimeout(() => { radio.ping(); setStage("interrupt"); }, 3500);
      return () => clearTimeout(t);
    }
    if (stage === "interrupt") {
      const t = setTimeout(() => setStage("tune"), 2800);
      return () => clearTimeout(t);
    }
  }, [stage, card]);

  const speed =
    stage === "intro"
      ? card >= INTRO.length - 1 ? 0.0006 : 0.0015 + card * 0.0007
      : stage === "tune" ? 0.0003 : 0.0006;

  const pick = (sid) => { setId(sid); radio.ping(); setStage("interrupt"); };
  const cinema = ["intro", "drift", "interrupt"].includes(stage);

  return (
    <main className={`xp ${stage === "interrupt" ? "glitch" : ""} ${stage === "flashback" ? "rewind" : ""}`}>
      <Starfield speed={speed} />
      {cinema && <><div className="xp-bar top" /><div className="xp-bar bottom" /></>}
      {stage === "intro" && (
        <button className="xp-skip" onClick={() => setStage("drift")}>Skip intro ↦</button>
      )}

      {stage === "gate" && (
        <div className="xp-center">
          <p className="xp-label">A story told through the evidence machines left behind</p>
          <h1 className="xp-gate-title">Abandoned but Not Forgotten</h1>
          <button className="xp-btn" onClick={() => { radio.start(); setCard(0); setStage("intro"); }}>
            Begin · headphones recommended
          </button>
        </div>
      )}

      {stage === "intro" && card < INTRO.length && (
        <div className="xp-center" key={card}>
          {INTRO[card].text === "title" ? (
            <div className="xp-card" style={{ "--d": INTRO[card].ms + "ms" }}>
              <h1 className="xp-title">Abandoned but Not Forgotten</h1>
              <p className="xp-label">The stories we left behind</p>
            </div>
          ) : (
            <p className="xp-card xp-cardtext" style={{ "--d": INTRO[card].ms + "ms" }}>
              {INTRO[card].text}
            </p>
          )}
        </div>
      )}

      {stage === "drift" && (
        <div className="xp-center"><p className="xp-line">Out here, there is mostly silence.</p></div>
      )}

      {stage === "interrupt" && (
        <div className="xp-center">
          <h2 className="xp-alert">UNKNOWN SIGNAL</h2>
          <p className="xp-label">Bearing: {story.origin}</p>
        </div>
      )}

      {stage === "tune" && (
        <Tuner key={id} radio={radio} story={story}
          onLock={() => { setSeen((s) => [...s, id]); setStage("transmission"); }} />
      )}
      {stage === "transmission" && <Transmission story={story} onRewind={() => setStage("flashback")} />}
      {stage === "flashback" && <Flashback story={story} onDone={() => setStage("expand")} />}
      {stage === "expand" && <Expand seen={seen} onPick={pick} />}
    </main>
  );
}