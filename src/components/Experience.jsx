import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { stories, signals } from "../data/stories";
import "./Experience.css";

const JPL_CHANNEL = "https://www.youtube.com/@NASAJPL";
const MUSIC_LEVEL = 0.55; // music volume, 0 to 1

const INTRO = [
  {
    q: "We have sent machines where humans could not go.",
    text: "Across the Solar System, they explored, measured, photographed and sent their findings back to Earth.",
  },
  {
    q: "But what happens when the mission ends?",
    text: "Some spacecraft stop transmitting. Others remain on distant worlds, or continue travelling beyond our reach.",
  },
  {
    q: "Their signals may fade. Their discoveries remain.",
    text: "This is the story of the machines we sent into space, and what they left behind.",
  },
];

/* ---------------- sound: Interstellar-inspired organ & celesta ---------------- */
const CHORDS = [
  [55, 110, 220, 329.63, 440, 523.25],     // Am (deep sub + ethereal high A/C/E)
  [43.65, 87.31, 174.61, 261.63, 349.23, 523.25], // Fmaj7
  [65.41, 130.81, 196.00, 329.63, 392.00, 493.88], // Cmaj7
  [49.00, 98.00, 196.00, 293.66, 392.00, 493.88],  // G6
];
const CHORD_SECONDS = 8;
const STEP = 0.4;
const ARP = [2, 3, 4, 5, 4, 3, 2, 4, 3, 5, 4, 3, 2, 3, 4, 5];


function useSound() {
  const r = useRef({
    want: true,
    duck: false,
    ctx: null,
    master: null,
    bus: null,
    verb: null,
    sg: null,
    file: null,
    timer: null,
  });

  const apply = useCallback((tc = 0.8) => {
    const { ctx, bus, file, want, duck } = r.current;
    const on = want && !duck;

    if (ctx && bus) {
      bus.gain.setTargetAtTime(
        on ? MUSIC_LEVEL : 0,
        ctx.currentTime,
        tc
      );
    }

    if (file) file.volume = on ? 0.35 : 0;
  }, []);

  const note = useCallback((f, dur, vol, delay = 0) => {
    const { ctx, master, verb } = r.current;
    if (!ctx || !master) return;

    const t = ctx.currentTime + delay;
    const o = ctx.createOscillator();
    const g = ctx.createGain();

    o.type = "sine";
    o.frequency.value = f;

    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);

    o.connect(g);
    g.connect(master);
    if (verb) g.connect(verb);

    o.start(t);
    o.stop(t + dur + 0.1);
  }, []);

  const start = useCallback(async () => {
    if (r.current.ctx) {
      try {
        await r.current.ctx.resume();
      } catch (error) {
        console.warn("Could not resume audio:", error);
      }
      return;
    }

    const AudioContextClass =
      window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) {
      console.warn("Web Audio is not supported in this browser.");
      return;
    }

    let ctx;

    try {
      ctx = new AudioContextClass();

      const master = ctx.createGain();
      master.connect(ctx.destination);

      const bus = ctx.createGain();
      bus.gain.value = 0;
      bus.connect(master);

      const len = Math.floor(ctx.sampleRate * 5);
      const ir = ctx.createBuffer(2, len, ctx.sampleRate);

      for (let c = 0; c < 2; c++) {
        const d = ir.getChannelData(c);
        for (let i = 0; i < len; i++) {
          d[i] =
            (Math.random() * 2 - 1) *
            Math.pow(1 - i / len, 3);
        }
      }

      const verb = ctx.createConvolver();
      verb.buffer = ir;

      const verbOut = ctx.createGain();
      verbOut.gain.value = 0.7;

      verb.connect(verbOut);
      verbOut.connect(master);
      bus.connect(verb);

      const buf = ctx.createBuffer(
        1,
        ctx.sampleRate * 2,
        ctx.sampleRate
      );

      const nd = buf.getChannelData(0);
      for (let i = 0; i < nd.length; i++) {
        nd[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buf;
      noise.loop = true;

      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = 1800;

      const sg = ctx.createGain();
      sg.gain.value = 0;

      noise.connect(bp);
      bp.connect(sg);
      sg.connect(master);
      noise.start();

      r.current.ctx = ctx;
      r.current.master = master;
      r.current.bus = bus;
      r.current.verb = verb;
      r.current.sg = sg;

      const organ = (f, t, dur, vol) => {
        const g = ctx.createGain();
        const lp = ctx.createBiquadFilter();

        lp.type = "lowpass";
        lp.frequency.setValueAtTime(320, t);
        lp.frequency.exponentialRampToValueAtTime(
          1400,
          t + dur * 0.5
        );
        lp.frequency.exponentialRampToValueAtTime(
          400,
          t + dur + 2
        );

        [
          [1, 1.0, "sawtooth", -3],
          [1, 1.0, "triangle", 3],
          [2, 0.5, "sine", 0],
          [3, 0.25, "sine", 2],
          [4, 0.15, "triangle", -2],
        ].forEach(([m, a, type, detune]) => {
          const o = ctx.createOscillator();
          const og = ctx.createGain();

          o.type = type;
          o.frequency.value = f * m;
          o.detune.value = detune;
          og.gain.value = a;

          o.connect(og);
          og.connect(lp);
          o.start(t);
          o.stop(t + dur + 2.5);
        });

        lp.connect(g);
        g.connect(bus);

        g.gain.setValueAtTime(0.0001, t);
        g.gain.linearRampToValueAtTime(vol, t + 2.8);
        g.gain.setValueAtTime(vol, t + dur - 0.5);
        g.gain.exponentialRampToValueAtTime(
          0.0001,
          t + dur + 2.4
        );
      };

      const pluck = (f, t, vol) => {
        const o = ctx.createOscillator();
        const overtone = ctx.createOscillator();
        const g = ctx.createGain();

        o.type = "sine";
        overtone.type = "triangle";
        o.frequency.value = f;
        overtone.frequency.value = f * 2;

        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(vol, t + 0.015);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 1.4);

        o.connect(g);
        overtone.connect(g);
        g.connect(bus);

        o.start(t);
        overtone.start(t);
        o.stop(t + 1.5);
        overtone.stop(t + 1.5);
      };

      const t0 = ctx.currentTime + 0.3;
      let nextChord = 0;
      let nextArp = 0;

      const tick = () => {
        const horizon = ctx.currentTime + 1.5;

        while (t0 + nextChord * CHORD_SECONDS < horizon) {
          const t = t0 + nextChord * CHORD_SECONDS;

          CHORDS[nextChord % CHORDS.length].forEach((f, k) => {
            organ(f, t, CHORD_SECONDS, k === 0 ? 0.05 : 0.028);
          });

          nextChord++;
        }

        while (t0 + nextArp * STEP < horizon) {
          const rel = nextArp * STEP;

          if (rel > 6) {
            const chord =
              CHORDS[Math.floor(rel / CHORD_SECONDS) % CHORDS.length];

            pluck(
              chord[ARP[nextArp % ARP.length]] * 2,
              t0 + rel,
              0.016
            );
          }

          nextArp++;
        }
      };

      let generatedStarted = false;

      const useGenerated = () => {
        if (generatedStarted) return;
        generatedStarted = true;

        tick();
        r.current.timer = window.setInterval(tick, 500);
        apply(3);
      };

      try {
        const file = new Audio("/audio/ambient.mp3");
        file.loop = true;
        file.volume = 0;

        file.addEventListener("error", useGenerated, { once: true });

        r.current.file = file;

        await file.play();
        apply(3);
      } catch {
        useGenerated();
      }
    } catch (error) {
      console.error("Audio initialization failed:", error);
      if (ctx && ctx.state !== "closed") {
        ctx.close().catch(() => {});
      }
    }
  }, [apply]);

  const chime = useCallback((notes = [784], gap = 0) => {
    notes.forEach((f, i) => note(f, 2.2, 0.07, i * gap));
  }, [note]);

  const tap = useCallback(() => {
    note(440, 0.12, 0.03);
  }, [note]);

  const sonarPing = useCallback(() => {
    const { ctx, master, verb } = r.current;
    if (!ctx || !master) return;

    const t = ctx.currentTime;
    const o = ctx.createOscillator();
    const g = ctx.createGain();

    o.type = "sine";
    o.frequency.setValueAtTime(1320, t);
    o.frequency.exponentialRampToValueAtTime(880, t + 0.35);

    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.09, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.9);

    o.connect(g);
    g.connect(master);
    if (verb) g.connect(verb);

    o.start(t);
    o.stop(t + 1);
  }, []);

  const staticLevel = useCallback((v) => {
    const { ctx, sg } = r.current;
    if (ctx && sg) {
      sg.gain.setTargetAtTime(
        v * 0.04,
        ctx.currentTime,
        0.08
      );
    }
  }, []);

  const setWant = useCallback((v) => {
    r.current.want = v;
    apply();
  }, [apply]);

  const setDuck = useCallback((v) => {
    r.current.duck = v;
    apply();
  }, [apply]);

  useEffect(() => {
    return () => {
      const { timer, ctx, file } = r.current;

      if (timer) clearInterval(timer);
      if (file) {
        file.pause();
        file.src = "";
      }
      if (ctx && ctx.state !== "closed") {
        ctx.close().catch(() => {});
      }
    };
  }, []);

  return useMemo(() => ({
    start,
    chime,
    tap,
    sonarPing,
    staticLevel,
    setWant,
    setDuck,
  }), [
    start,
    chime,
    tap,
    sonarPing,
    staticLevel,
    setWant,
    setDuck,
  ]);
}
/* ---------------- narration ---------------- */
function useNarrator() {
  const audio = useRef(null);
  const on = useRef(true);
  const token = useRef(0);
  const voice = useRef(null);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    const pick = () => {
      const en = synth.getVoices().filter((v) => /^en/i.test(v.lang));
      voice.current =
        en.find((v) => /natural/i.test(v.name)) ||
        en.find((v) => v.localService && !/google/i.test(v.name)) ||
        en.find((v) => !/google/i.test(v.name)) ||
        en[0] || null;
    };
    pick();
    synth.addEventListener?.("voiceschanged", pick);
    return () => synth.removeEventListener?.("voiceschanged", pick);
  }, []);

  const stop = useCallback(() => {
    token.current += 1;
    if (audio.current) { audio.current.pause(); audio.current = null; }
    window.speechSynthesis?.cancel();
  }, []);

  const speak = (text, my) => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    const parts = text.split(/(?<=[.!?])\s+/).filter(Boolean);
    let n = 0;
    const nextPart = () => {
      if (my !== token.current || n >= parts.length) return;
      const u = new SpeechSynthesisUtterance(parts[n++]);
      u.rate = 0.9; u.pitch = 1;
      if (voice.current) { u.voice = voice.current; u.lang = voice.current.lang; }
      u.onend = nextPart;
      u.onerror = nextPart;
      synth.speak(u);
    };
    nextPart();
  };

  const say = useCallback((id, text) => {
    stop();
    if (!on.current || !text) return;
    const my = token.current;
    const a = new Audio(`/audio/${id}.mp3`);
    audio.current = a;
    let fell = false;
    const fb = () => {
      if (fell) return;
      fell = true;
      setTimeout(() => { if (my === token.current) speak(text, my); }, 150);
    };
    a.addEventListener("error", fb);
    a.play().catch(fb);
  }, [stop]);

  const toggle = useCallback(() => {
    on.current = !on.current;
    setEnabled(on.current);
    if (!on.current) stop();
  }, [stop]);

  return { say, stop, toggle, enabled };
}

/* ---------------- interactive stars with shooting star clicks ---------------- */
function Stars() {
  const ref = useRef();
  useEffect(() => {
    const c = ref.current, g = c.getContext("2d");
    const resize = () => { c.width = innerWidth; c.height = innerHeight; };
    resize(); addEventListener("resize", resize);
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    const meteors = [];
    const spawnMeteor = (e) => {
      if (calm) return;
      meteors.push({
        x: e?.clientX ?? Math.random() * c.width,
        y: e?.clientY ?? Math.random() * (c.height * 0.4),
        vx: -6 - Math.random() * 4,
        vy: 3 + Math.random() * 2,
        life: 1,
      });
    };
    addEventListener("pointerdown", spawnMeteor);

    const layers = [
      { n: 90, r: [0.3, 0.9], v: 0.004, a: 0.5 },
      { n: 45, r: [0.6, 1.3], v: 0.009, a: 0.7 },
      { n: 18, r: [1.0, 1.8], v: 0.016, a: 0.9 },
    ].map((L) => ({
      ...L,
      s: Array.from({ length: L.n }, () => ({
        x: Math.random(), y: Math.random(),
        r: L.r[0] + Math.random() * (L.r[1] - L.r[0]), p: Math.random() * 6.28,
      })),
    }));
    
    let raf;
    const tick = () => {
      g.clearRect(0, 0, c.width, c.height);
      for (const L of layers) for (const s of L.s) {
        if (!calm) { s.x -= L.v / 100; if (s.x < 0) s.x += 1; s.p += 0.006; }
        g.globalAlpha = L.a * (0.7 + 0.3 * Math.sin(s.p));
        g.fillStyle = "#fff4dc";
        g.beginPath(); g.arc(s.x * c.width, s.y * c.height, s.r, 0, 6.283); g.fill();
      }

      for (let m = meteors.length - 1; m >= 0; m--) {
        const p = meteors[m];
        p.x += p.vx; p.y += p.vy; p.life -= 0.025;
        if (p.life <= 0) { meteors.splice(m, 1); continue; }
        g.save();
        g.globalAlpha = p.life;
        g.strokeStyle = "#ffd98e";
        g.lineWidth = 2;
        g.beginPath();
        g.moveTo(p.x, p.y);
        g.lineTo(p.x - p.vx * 6, p.y - p.vy * 6);
        g.stroke();
        g.restore();
      }

      if (!calm) raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { 
      cancelAnimationFrame(raf); 
      removeEventListener("resize", resize); 
      removeEventListener("pointerdown", spawnMeteor);
    };
  }, []);
  return <canvas ref={ref} className="xp-stars" />;
}

function Garble({ text, noise }) {
  const [out, setOut] = useState(text);
  useEffect(() => {
    const id = setInterval(() => {
      const g = "·:∙∘";
      setOut([...text].map((ch) =>
        ch === " " ? ch : Math.random() < noise * 0.8 ? g[Math.floor(Math.random() * g.length)] : ch
      ).join(""));
    }, 90);
    return () => clearInterval(id);
  }, [text, noise]);
  return <>{out}</>;
}

function useCount(to, ms) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf; const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / ms);
      setV(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, ms]);
  return v;
}

function Odometer({ to, marker, label }) {
  const v = useCount(to, 2800);
  return (
    <div className="xp-card xp-odo">
      <p className="xp-num">{v.toFixed(1)} <span>km driven</span></p>
      <div className="xp-track">
        <i style={{ width: Math.min(100, (v / to) * 100) + "%" }} />
        <b style={{ left: (marker / to) * 100 + "%" }}>{label} {marker} km</b>
      </div>
      {v >= marker && <p className="xp-note">Farther than a {label.toLowerCase()}.</p>}
    </div>
  );
}

function Ticks({ n }) {
  const v = Math.round(useCount(n, 3200));
  return (
    <div className="xp-card">
      <p className="xp-num">{v.toLocaleString()} <span>messages sent</span></p>
      <div className="xp-dots">
        {Array.from({ length: 100 }, (_, k) => <i key={k} className={k < (v / n) * 100 ? "on" : ""} />)}
      </div>
    </div>
  );
}

function Tune({ story, sound, locked, onLock }) {
  const [v, setV] = useState(locked ? story.target : 10);
  const [help, setHelp] = useState(false);
  const c = Math.max(0, 1 - Math.abs(v - story.target) / 30);
  useEffect(() => { const t = setTimeout(() => setHelp(true), 10000); return () => clearTimeout(t); }, []);
  useEffect(() => { sound.staticLevel(locked ? 0 : 1 - c); }, [c, locked]);
  useEffect(() => () => sound.staticLevel(0), []);
  useEffect(() => {
    if (locked || c < 0.93) return;
    const t = setTimeout(() => { sound.staticLevel(0); sound.chime([523, 659, 784, 1047], 0.14); onLock(); }, 600);
    return () => clearTimeout(t);
  }, [c, locked]);
  const hint = locked ? "Signal found." : c > 0.8 ? "Almost there." : c > 0.5 ? "Getting closer." : "Keep sliding.";
  return (
    <div className="xp-stack">
      <p className="xp-eyebrow">Tune the signal</p>
      <h2 className="xp-h">
  <Garble
    text={story.signalLine || `${story.name} left something behind.`}
    noise={locked ? 0 : 1 - c}
  />
</h2>
      <div className="xp-meter"><i style={{ width: (locked ? 100 : c * 100) + "%" }} /></div>
      <input className="xp-range" type="range" min="0" max="100" value={v}
        onChange={(e) => !locked && setV(+e.target.value)} aria-label="Tune the signal" />
      <p className="xp-body">{hint}</p>
      {help && !locked && <button className="xp-ghost" onClick={() => setV(story.target)}>Help me tune</button>}
    </div>
  );
}

function Myth({ story, already, onReveal }) {
  const [shown, setShown] = useState(!!already);
  const m = story.myth;
  return (
    <div className="xp-stack">
      <p className="xp-eyebrow">Fact or story</p>
      <p className="xp-quote">“{m.quote}”</p>
      <p className="xp-body">{m.question}</p>
      {!shown ? (
        <button className="xp-btn" onClick={() => { setShown(true); onReveal(); }}>Tap to find out</button>
      ) : (
        <div className="xp-card xp-answer"><p className="xp-body">{m.answer}</p></div>
      )}
    </div>
  );
}

function Closing({ story, already, onSend }) {
  const [q, setQ] = useState("");
  const c = story.closing;
  return (
    <div className="xp-stack">
      <p className="xp-q">{c.tagline}</p>
      <h2 className="xp-h">{c.question}</h2>
      {!already ? (
        <form className="xp-form" onSubmit={(e) => { e.preventDefault(); onSend(); }}>
          <input className="xp-input" type="text" maxLength={120} value={q}
            onChange={(e) => setQ(e.target.value)} placeholder="Type your question" />
          <button className="xp-btn" type="submit">Send</button>
          <p className="xp-note">Just for fun. Nothing is saved.</p>
        </form>
      ) : (
        <p className="xp-body">{c.sent}</p>
      )}
    </div>
  );
}

function VideoFrame({ id, title, sound }) {
  const [on, setOn] = useState(false);
  useEffect(() => () => sound.setDuck(false), []);
  if (!on) {
    return (
      <button className="xp-video" aria-label={`Play video: ${title}`}
        onClick={() => { setOn(true); sound.setDuck(true); }}>
        <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" />
        <span className="xp-play" aria-hidden="true" />
        <span className="xp-video-title">{title}</span>
      </button>
    );
  }
  return (
    <div className="xp-video">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
        title={title}
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

function Slide({ slide, story, ctx }) {
  const { done, markDone, sound, say } = ctx;
  switch (slide.type) {
    case "text":
      return (
        <div className="xp-stack">
          {slide.q && <p className="xp-q">{slide.q}</p>}
          <p className="xp-body">{slide.text}</p>
        </div>
      );

    
case "signal":
  return (
    <div className="xp-stack">
      <p className="xp-eyebrow">Mission transmission</p>
      <div className="xp-signal-line" aria-hidden="true" />

      <h2 className="xp-h">
        {story.signalTitle || `A signal from ${story.origin}.`}
      </h2>

      <p className="xp-body">
        {story.signalDescription ||
          "Every mission leaves behind a record. This is where its story begins."}
      </p>

      <button
        className="xp-ghost"
        onClick={(e) => {
          e.stopPropagation();
          sound.sonarPing();
        }}
      >
        📡 Ping spacecraft
      </button>
    </div>
  );


    case "tune":
      return <Tune story={story} sound={sound} locked={!!done[slide.key]} onLock={() => markDone(slide.key)} />;

    case "meet": {
      const m = story.meet;
      return (
        <div className="xp-stack">
          <p className="xp-eyebrow">Meet the explorer</p>
          <h2 className="xp-h">{story.name}</h2>
          <dl className="xp-meet">
            <div><dt>What it is</dt><dd>{m.what}</dd></div>
            <div><dt>Where</dt><dd>{m.where}</dd></div>
            <div><dt>When</dt><dd>{m.when}</dd></div>
            <div><dt>Its job</dt><dd>{m.job}</dd></div>
          </dl>
        </div>
      );
    }

    case "evidence":
      return (
        <div className="xp-stack">
          <p className="xp-eyebrow">Mission record / final transmission</p>
          <div className="xp-card xp-records">
            {story.evidence.map((line, i) => (
              <p key={i} className="xp-record">
                <span className="xp-record-index">{String(i + 1).padStart(2, "0")}</span>
                {line}
              </p>
            ))}
          </div>
        </div>
      );

    case "myth":
      return <Myth story={story} already={done[slide.key]}
        onReveal={() => { markDone(slide.key); say(`${story.id}-myth-answer`, story.myth.narration); }} />;

    case "rewind":
      return (
        <div className="xp-stack">
          <p className="xp-eyebrow">Rewinding</p>
          <h2 className="xp-h">{story.rewindLine}</h2>
        </div>
      );

    case "chapter": {
      const c = slide.ch;
      return (
        <article className="xp-stack">
          <div className="xp-chapter-meta">
            <span>{c.tag}</span>
            <span>{c.year}</span>
          </div>
          <h2 className="xp-h">{c.title}</h2>
          {c.image && (
            <figure className="xp-fig">
              <img src={c.image} alt={c.alt || c.title}
                onError={(e) => { e.currentTarget.parentElement.style.display = "none"; }} />
              <figcaption>{c.credit}</figcaption>
            </figure>
          )}
          <p className="xp-body">{c.text}</p>
          {c.odometer && <Odometer to={c.odometer.to} marker={c.odometer.marker} label={c.odometer.markerLabel} />}
          {c.ticks && <Ticks n={c.ticks} />}
        </article>
      );
    }

    case "closing":
      return <Closing story={story} already={done[slide.key]}
        onSend={() => { markDone(slide.key); sound.chime([784, 1175, 1568], 0.15); }} />;

    case "more": {
      const w = story.watch;
      return (
        <div className="xp-stack">
          <p className="xp-eyebrow">Keep exploring</p>
          <h2 className="xp-h">See the real thing</h2>
          {w?.youtubeId && <VideoFrame id={w.youtubeId} title={w.title} sound={sound} />}
          {w && <p className="xp-body">{w.blurb}</p>}
          {w && (
            <ul className="xp-links">
              {w.links.map((l) => (
                <li key={l.url}>
                  <a href={l.url} target="_blank" rel="noopener noreferrer"
                    aria-label={`${l.label} (opens in a new tab)`}>
                    <span>{l.label}</span>
                    <small>{l.source}</small>
                  </a>
                </li>
              ))}
            </ul>
          )}
          <div className="xp-sources">
            <p className="xp-eyebrow">Where this comes from</p>
            {story.sources.map((s) => <p key={s} className="xp-src">{s}</p>)}
            <p className="xp-note">Images and footage belong to NASA and its partners. This project is not affiliated with or endorsed by NASA.</p>
          </div>
        </div>
      );
    }

    default:
      return null;
  }
}

function buildSlides(story, withIntro) {
  const s = [];
  const id = story.id;
  if (withIntro) {
    INTRO.forEach((c, i) =>
      s.push({ type: "text", key: `intro-${i}`, q: c.q, text: c.text, narr: `${c.q} ${c.text}`.trim() }));
  }
  s.push({ type: "signal", key: `${id}-signal`, narr: `Incoming transmission. A signal from ${story.origin}.` });
  s.push({ type: "tune", key: `${id}-tune`, needs: true, lockHint: "Slide to tune in the signal", narr: "Slide to tune in the signal." });
  if (story.meet) s.push({ type: "meet", key: `${id}-meet`, narr: story.meet.narration });
  s.push({ type: "evidence", key: `${id}-evidence`, narr: story.narrationEvidence });
  if (story.myth) s.push({
    type: "myth", key: `${id}-myth`, needs: true, lockHint: "Tap the button to find out",
    narr: `${story.myth.quote} ${story.myth.question}`,
  });
  if (story.rewindLine) s.push({ type: "rewind", key: `${id}-rewind`, narr: story.rewindLine });
  story.chapters.forEach((c) =>
    s.push({ type: "chapter", key: `${id}-${c.year}`, ch: c, narr: c.narration || c.text }));
  if (story.closing) s.push({ type: "closing", key: `${id}-closing`, narr: story.closing.narration });
  s.push({ type: "more", key: `${id}-more`, narr: "" });
  return s;
}

function getRank(count) {
  if (count >= 6) return { icon: "🌌", title: "Galactic Archivist" };
  if (count >= 4) return { icon: "🚀", title: "Deep Space Navigator" };
  if (count >= 2) return { icon: "🛰️", title: "Signal Hunter" };
  return { icon: "🔭", title: "Cadet Listener" };
}

const RANKS = [
  { frac: 0, name: "Cadet Listener" },
  { frac: 0.34, name: "Signal Tracker" },
  { frac: 0.67, name: "Mission Analyst" },
  { frac: 1, name: "Archive Keeper" },
];
const PLAYABLE = signals.filter((d) => d.id && stories[d.id]);
const N = PLAYABLE.length;

const FINALE = [
  { key: "fin-0", type: "text", q: "Archive complete.",
    text: `You listened to all ${N} signals.`,
    narr: `Archive complete. You listened to all ${N} signals.` },
  { key: "fin-1", type: "stars",
    narr: `${N} machines. ${N} journeys. You heard every one.` },
  { key: "fin-2", type: "text", q: "Almost every one of them is still out there.",
    text: "On the Moon. On Mars. On an asteroid. Circling the Sun. Drifting beyond the planets.",
    narr: "Almost every one of them is still out there. On the Moon. On Mars. On an asteroid. Circling the Sun. Drifting beyond the planets." },
  { key: "fin-3", type: "text", q: "But what they learned came home.",
    text: "A rover found proof that water once soaked Mars. A probe measured Jupiter's radiation, so later spacecraft could survive it. A panel of mirrors on the Moon still helps us measure the distance to it.",
    narr: "But what they learned came home. A rover found proof that water once soaked Mars. A probe measured Jupiter's radiation, so later spacecraft could survive it. A panel of mirrors on the Moon still helps us measure the distance to it." },
  { key: "fin-4", type: "text", q: "Behind every signal were people.",
    text: "People who built the machines, steered them across other worlds, and listened for them long after they went quiet.",
    narr: "Behind every signal were people. People who built the machines, steered them across other worlds, and listened for them long after they went quiet." },
  { key: "fin-5", type: "close",
    narr: "A mission may end. A signal may fade. But the knowledge it leaves behind keeps travelling, from one generation to the next. We may have left these machines behind, but we have not left their stories behind." },
];

function Constellation() {
  const ys = [50, 26, 54, 20, 46, 28, 56, 24, 48];
  const pts = PLAYABLE.map((_, k) => [8 + (84 * k) / Math.max(1, N - 1), ys[k % ys.length]]);
  const d = "M" + pts.map((p) => p.join(" ")).join(" L");
  return (
    <svg viewBox="0 0 100 70" className="xp-const" role="img" aria-label="The signals joined into a constellation">
      <path d={d} pathLength="1" className="xp-const-line" />
      {pts.map((p, k) => (
        <circle key={k} cx={p[0]} cy={p[1]} r="1.5" className="xp-const-dot"
          style={{ animationDelay: `${0.5 + k * 0.45}s` }} />
      ))}
    </svg>
  );
}

function FinaleSlide({ slide, onArchive, onRestart }) {
  if (slide.type === "text") {
    return (
      <div className="xp-stack">
        <p className="xp-q">{slide.q}</p>
        {slide.text && <p className="xp-body">{slide.text}</p>}
      </div>
    );
  }
  if (slide.type === "stars") {
    return (
      <div className="xp-stack xp-wide">
        <p className="xp-eyebrow">{N} signals</p>
        <h2 className="xp-h">You heard every one.</h2>
        <Constellation />
        <ul className="xp-const-names">
          {PLAYABLE.map((d) => <li key={d.name}>{d.name}</li>)}
        </ul>
      </div>
    );
  }
  return (
    <div className="xp-stack">
      <p className="xp-eyebrow">Archive Keeper</p>
      <h2 className="xp-h">A mission may end. A signal may fade.</h2>
      <p className="xp-body">But the knowledge it leaves behind keeps travelling, from one generation to the next.</p>
      <p className="xp-q">We may have left these machines behind, but we have not left their stories behind.</p>
      <div className="xp-actions">
        <button className="xp-btn" onClick={onArchive}>Back to the archive</button>
        <button className="xp-ghost" onClick={onRestart}>Start again</button>
      </div>
      <p className="xp-note">Thank you for listening.</p>
    </div>
  );
}
// map positions (x%, y%) by signal name. Every signal has its own height, so labels never overlap.
function Expand({ seen, onPick, onFinale }) {
  const live = (d) => !!(d.id && stories[d.id]);
  const heard = PLAYABLE.filter((d) => seen.includes(d.id)).length;
  const rank =
    [...RANKS].reverse().find((r) => heard >= Math.ceil(N * r.frac)) || RANKS[0];

  return (
    <div className="xp-stack xp-wide">
      <p className="xp-eyebrow">The archive</p>
      <h2 className="xp-h">More signals are out there.</h2>
      <p className="xp-body">Select a signal to hear its story.</p>
      <p className="xp-rank">
        Rank: <b>{rank.name}</b>
        <span>{heard} of {N} stories heard</span>
      </p>

      <div className="xp-field">
        <ul className="xp-map">
          {signals.map((d) => {
            const isLive = live(d);
            const isHeard = seen.includes(d.id);
            return (
              <li key={d.name}>
                <button
                  className={`xp-dot ${isLive ? "live" : "dim"} ${isHeard ? "seen" : ""}`}
                  onClick={() => isLive && onPick(d.id)}
                  aria-disabled={!isLive}
                >
                  <span />
                  <em>{d.name}</em>
                  <small>{isLive ? (isHeard ? "Heard" : d.kind) : `${d.kind || "Signal"} · coming soon`}</small>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {heard === N && (
        <button className="xp-btn" onClick={onFinale}>Open the final message</button>
      )}
    </div>
  );
}
/* ---------------- the app ---------------- */
export default function Experience() {
  const [phase, setPhase] = useState("gate"); // gate | play | expand | finale
  const [id, setId] = useState("opportunity");
  const [withIntro, setWithIntro] = useState(true);
  const [i, setI] = useState(0);
  const [fi, setFi] = useState(0);
  const [done, setDone] = useState({});
  const [seen, setSeen] = useState([]);
  const [finaleShown, setFinaleShown] = useState(false);
  const [music, setMusic] = useState(true);
  const sound = useSound();
  const { say, stop, toggle, enabled } = useNarrator();

  const story = stories[id];
  const slides = useMemo(() => buildSlides(story, withIntro), [story, withIntro]);
  const slide = slides[i];
  const fslide = FINALE[fi];
  const locked = !!(slide?.needs && !done[slide.key]);
  const last = i === slides.length - 1;
  const finaleLast = fi === FINALE.length - 1;
  const introLen = withIntro ? INTRO.length : 0;
  const inStory = phase === "play" || phase === "finale";

  const markDone = useCallback((k) => setDone((d) => ({ ...d, [k]: true })), []);

  const next = useCallback(() => {
    if (phase === "finale") {
      if (fi < FINALE.length - 1) { sound.tap(); setFi((x) => x + 1); }
      return;
    }
    if (phase !== "play" || locked) return;
    sound.tap();
    if (last) {
      const nextSeen = seen.includes(id) ? seen : [...seen, id];
      setSeen(nextSeen);
      stop();
      const allDone = PLAYABLE.every((d) => nextSeen.includes(d.id));
      if (allDone && !finaleShown) { setFinaleShown(true); setFi(0); setPhase("finale"); }
      else setPhase("expand");
      return;
    }
    setI((x) => x + 1);
  }, [phase, fi, locked, last, id, seen, finaleShown, sound, stop]);

  const back = useCallback(() => {
    if (phase === "finale" && fi > 0) { sound.tap(); setFi((x) => x - 1); return; }
    if (phase === "play" && i > 0) { sound.tap(); setI((x) => x - 1); }
  }, [phase, fi, i, sound]);

  useEffect(() => {
    const h = (e) => {
      if (e.target.closest?.("input")) return;
      if ([" ", "Enter"].includes(e.key)) { if (e.target.closest?.("button, a")) return; e.preventDefault(); next(); }
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") back();
    };
    addEventListener("keydown", h);
    return () => removeEventListener("keydown", h);
  }, [next, back]);

  // narration for stories
  useEffect(() => {
    window.scrollTo(0, 0);
    if (phase !== "play" || !slide) return;
    if (slide.type === "signal") sound.chime([880], 0);
    const t = setTimeout(() => say(slide.key, slide.narr), 400);
    return () => clearTimeout(t);
  }, [slide?.key, phase]);

  // narration and bells for the final message
  useEffect(() => {
    if (phase !== "finale") return;
    window.scrollTo(0, 0);
    const f = FINALE[fi];
    if (f.key === "fin-1") sound.chime([392, 523, 659, 784, 988, 1047, 1175, 1319, 1568], 0.45);
    if (f.key === "fin-5") sound.chime([523, 659, 784, 1047], 0.3);
    const t = setTimeout(() => say(f.key, f.narr), 500);
    return () => clearTimeout(t);
  }, [phase, fi]);

  const onTap = (e) => { if (!e.target.closest("button, input, a, iframe")) next(); };
  const pick = (sid) => { setId(sid); setWithIntro(false); setI(0); setPhase("play"); };
  const toggleMusic = () => { const v = !music; setMusic(v); sound.setWant(v); };
  const openFinale = () => { setFi(0); setPhase("finale"); };
  const restart = () => {
    stop();
    setSeen([]); setDone({}); setId("opportunity"); setWithIntro(true);
    setI(0); setFi(0); setFinaleShown(false); setPhase("gate");
  };

  const progress =
    phase === "expand" ? 100
    : phase === "finale" ? ((fi + 1) / FINALE.length) * 100
    : ((i + 1) / slides.length) * 100;

  return (
    <div className="xp-app" onClick={onTap}>
      <Stars />

      {phase !== "gate" && (
        <header className="xp-top">
          <div className="xp-bar">
            {inStory && (
              <button className="xp-tb" onClick={back} disabled={phase === "play" ? i === 0 : fi === 0}>Back</button>
            )}
            <span className="xp-spacer" />
            {phase === "play" && i < introLen && (
              <button className="xp-tb" onClick={() => setI(introLen)}>Skip intro</button>
            )}
            {inStory && (
              <button className="xp-tb" onClick={() => {
                const s = phase === "play" ? slide : fslide;
                say(s.key, s.narr);
              }}>Replay</button>
            )}
            <button className="xp-tb" onClick={toggleMusic} aria-pressed={music}>Music {music ? "on" : "off"}</button>
            <button className="xp-tb" onClick={toggle} aria-pressed={enabled}>Voice {enabled ? "on" : "off"}</button>
          </div>
          <div className="xp-progress"><i style={{ width: progress + "%" }} /></div>
        </header>
      )}

      <main className="xp-main">
        {phase === "gate" && (
          <div className="xp-stack">
            <p className="xp-eyebrow">An archive of space exploration</p>
            <h1 className="xp-title">Abandoned<br /><span>but not forgotten.</span></h1>
            <p className="xp-body">
              They travelled farther than we could. They discovered worlds we had never touched.
              And one day, they stopped answering.
            </p>
            <button className="xp-btn" onClick={() => { sound.start(); setPhase("play"); }}>
              Enter the archive
            </button>
            <p className="xp-note">Best experienced with sound on.</p>
          </div>
        )}
        {phase === "play" && slide && (
          <div key={slide.key}>
            <Slide slide={slide} story={story} ctx={{ done, markDone, sound, say }} />
          </div>
        )}
        {phase === "expand" && <Expand seen={seen} onPick={pick} onFinale={openFinale} />}
        {phase === "finale" && (
          <div key={fslide.key}>
            <FinaleSlide slide={fslide} onArchive={() => { stop(); setPhase("expand"); }} onRestart={restart} />
          </div>
        )}
      </main>

      {(phase === "play" || (phase === "finale" && !finaleLast)) && (
        <footer className="xp-bottom">
          <p className="xp-hint">{phase === "play" && locked ? slide.lockHint : "Tap anywhere to continue"}</p>
          <button className="xp-btn" onClick={next} disabled={phase === "play" && locked}>
            {phase === "play" && last ? "More signals" : "Continue"}
          </button>
        </footer>
      )}
      <p className="xp-foot">Images: NASA. Not affiliated with or endorsed by NASA. Built for NASA Space Apps 2026.</p>
    </div>
  );
}