import { Link } from "react-router-dom";
import "./Opening.css";

const scenes = [
  {
    id: "scene-2",
    number: "02",
    chapter: "THE FIRST OBSERVATIONS",
    title: "We watched.",
    text: "We measured. We drew what we could see. Sometimes we were wrong. We looked again.",
    atmosphere: "observations",
  },
  {
    id: "scene-3",
    number: "03",
    chapter: "BEYOND IMAGINATION",
    title: "We dreamed of distant landscapes.",
    text: "Unfamiliar skies. Places we could only imagine visiting. For a long time, imagination was the closest we could get.",
    atmosphere: "dreams",
  },
  {
    id: "scene-4",
    number: "04",
    chapter: "THE MACHINES WE BUILT",
    title: "Imagining was not enough.",
    text: "So people built machines that could go where they could not. Each carried instruments, and questions. Behind each machine was a team.",
    atmosphere: "engineering",
  },
  {
    id: "scene-5",
    number: "05",
    chapter: "A REAL PLACE",
    title: "This is not an imagined world.",
    text: "This photograph was taken by a machine on Mars. No human has stood on that ground.",
    atmosphere: "mars",
  },
  {
    id: "scene-6",
    number: "06",
    chapter: "WHAT REMAINS",
    title: "Some of what we sent is still there.",
    text: "Some is still moving. Each journey can still be read in the evidence it left.",
    atmosphere: "solar-system",
  },
];

export default function Opening() {
  return (
    <main className="story">
      <section className="opening" id="scene-1">
        <div className="opening__atmosphere" aria-hidden="true" />

        <div className="opening__content">
          <p className="eyebrow">AN ARCHIVE OF HUMAN EXPLORATION</p>

          <h1>
            It began with
            <br />
            curiosity.
          </h1>

          <div className="opening__question">
            <p>We looked up and wondered:</p>
            <p className="opening__question-line">
              What is up there?
            </p>
          </div>
        </div>

        <a className="scroll-cue" href="#scene-2">
          <span className="scroll-cue__line" />
          Scroll
        </a>
      </section>

      {scenes.map((scene) => (
        <section
          className={`story-scene story-scene--${scene.atmosphere}`}
          id={scene.id}
          key={scene.id}
        >
          <div className="story-scene__background" aria-hidden="true" />

          <div className="story-scene__content">
            <p className="eyebrow">
              {scene.number} / {scene.chapter}
            </p>

            <h2>{scene.title}</h2>
            <p className="story-scene__text">{scene.text}</p>

            {scene.id === "scene-3" && (
              <p className="scene-note">
                Artistic interpretations of worlds beyond Earth.
              </p>
            )}

            {scene.id === "scene-5" && (
              <p className="scene-note">
                Opportunity rover · Mars Exploration Rover mission
              </p>
            )}

            {scene.id === "scene-6" && (
              <div className="scene-signature">
                <p>
                  We sent pieces of ourselves to the worlds we could only
                  imagine reaching.
                </p>
                <Link to="/explore" className="opening__link">
                  Explore Mars <span aria-hidden="true">↗</span>
                </Link>
              </div>
            )}
          </div>
        </section>
      ))}
    </main>
  );
}