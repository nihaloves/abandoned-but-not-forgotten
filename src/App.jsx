import { Link } from "react-router-dom";

const scenes = [
  {
    number: "02",
    chapter: "THE FIRST OBSERVATIONS",
    title: "We watched.",
    text: "We measured. We drew what we could see. Sometimes we were wrong. We looked again.",
  },
  {
    number: "03",
    chapter: "BEYOND IMAGINATION",
    title: "We dreamed of distant landscapes.",
    text: "Unfamiliar skies. Places we could only imagine visiting. For a long time, imagination was the closest we could get.",
  },
  {
    number: "04",
    chapter: "THE MACHINES WE BUILT",
    title: "Imagining was not enough.",
    text: "So people built machines that could go where they could not. Each carried instruments, and questions. Behind each machine was a team.",
  },
];

export default function App() {
  return (
    <main>
      <section className="opening">
        <div className="opening__content">
          <p className="eyebrow">AN ARCHIVE OF HUMAN EXPLORATION</p>
          <h1>Abandoned<br />but Not<br />Forgotten</h1>
          <a className="scroll-link" href="#scene-02">SCROLL TO EXPLORE ↓</a>
        </div>
      </section>

      {scenes.map((scene) => (
        <section className="story-scene" id={`scene-${scene.number}`} key={scene.number}>
          <div className="story-scene__content">
            <p className="eyebrow">{scene.number} / {scene.chapter}</p>
            <h2>{scene.title}</h2>
            <p className="scene-text">{scene.text}</p>
          </div>
        </section>
      ))}

<section className="evidence-scene" id="scene-05">
  <div className="evidence-scene__image">
    <img
      src="/images/PIA23246.jpg"
      alt="Opportunity rover tracks across Perseverance Valley on Mars"
    />
    <p>NASA / JPL-Caltech · Opportunity rover · 2019</p>
  </div>

  <div className="evidence-scene__content">
    <p className="eyebrow">05 / A REAL PLACE</p>
    <h2>This is not an imagined world.</h2>
    <p>
      This photograph was taken by a machine on Mars.
      No human has stood on that ground.
    </p>
  </div>
</section>

<section className="solar-scene" id="scene-06">
  <div className="solar-scene__heading">
    <p className="eyebrow">06 / WHAT REMAINS</p>
    <h2>Some of what we sent<br />is still there.</h2>
    <p className="solar-scene__intro">
      Some is still moving. Each journey can still be read
      in the evidence it left.
    </p>
  </div>

  <div className="solar-diagram">
    <p className="diagram-note">SOLAR SYSTEM — NOT TO SCALE</p>

    <svg viewBox="0 0 900 360" role="img"
      aria-label="A diagrammatic view of the Sun, Earth, Mars and the outward journey of Pioneer 10">

      <circle cx="85" cy="180" r="35" fill="#c5a875" />
      <text x="85" y="240" textAnchor="middle">SUN</text>

      <ellipse cx="430" cy="180" rx="170" ry="115"
        fill="none" stroke="#777c78" strokeWidth="1" />
      <ellipse cx="430" cy="180" rx="270" ry="155"
        fill="none" stroke="#777c78" strokeWidth="1" opacity=".5" />

      <circle cx="260" cy="180" r="7" fill="#8ca6b2" />
      <text x="260" y="210" textAnchor="middle">EARTH</text>

      <circle cx="600" cy="180" r="10" fill="#bd7654" />
      <text x="600" y="215" textAnchor="middle">MARS</text>

      <path d="M600 180 Q710 80 850 110"
        fill="none" stroke="#c5a875" strokeWidth="1.5"
        strokeDasharray="5 7" />
      <circle cx="850" cy="110" r="4" fill="#c5a875" />
      <text x="850" y="85" textAnchor="middle">BEYOND</text>
    </svg>

    <div className="diagram-labels">
      <p><strong>Moon</strong> — Apollo's stations</p>
      <p><strong>Mars</strong> — Opportunity's tracks</p>
      <p><strong>Beyond the planets</strong> — Pioneer 10</p>
    </div>
  </div>

  <div className="solar-scene__ending">
    <p className="solar-scene__signature">
            We sent pieces of ourselves to the worlds we could only imagine reaching.
    </p>

    <Link to="/experience" className="opening-link">
      Where shall we look first?
      <span>Explore the archive ↗</span>
    </Link>
  </div>
</section>



</main>
);
}