import { Link } from "react-router-dom";

export default function Credits() {
  return (
    <main className="detail-page">
      <Link to="/explore" className="back-link">
        ← Back to exploration
      </Link>

      <header className="detail-header">
        <p className="eyebrow">ABANDONED BUT NOT FORGOTTEN</p>
        <h1>Sources & acknowledgements</h1>
        <p className="detail-intro">
          This experience is built around real missions, documented evidence
          and the work of the people who made exploration possible.
        </p>
      </header>

      <section className="detail-section">
        <h2>NASA</h2>
        <p>
          Mission records, photographs and scientific information used to
          investigate human exploration beyond Earth.
        </p>
        <a href="https://www.nasa.gov/" target="_blank" rel="noreferrer">
          NASA official website ↗
        </a>
      </section>

      <section className="detail-section">
        <h2>NASA Photojournal</h2>
        <p>
          Original mission imagery and accompanying descriptions.
        </p>
        <a
          href="https://science.nasa.gov/solar-system/"
          target="_blank"
          rel="noreferrer"
        >
          NASA Solar System ↗
        </a>
      </section>

      <Link to="/" className="opening__link">
        Return to the beginning
      </Link>
    </main>
  );
}