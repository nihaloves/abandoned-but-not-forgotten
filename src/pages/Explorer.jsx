import { Link } from "react-router-dom";
import "./Explorer.css";

const destinations = [
  {
    id: "opportunity",
    category: "MARS · 2004–2018",
    title: "Opportunity",
    description:
      "A rover designed for a 90-day mission that continued exploring Mars for nearly 15 years.",
    status: "Mission ended",
  },
  {
    id: "apollo",
    category: "MOON · 1969–1972",
    title: "Apollo landing sites",
    description:
      "The places where humans first walked on another world, and the equipment left behind.",
    status: "Historical sites",
  },
  {
    id: "pioneer-10",
    category: "BEYOND THE PLANETS · 1972",
    title: "Pioneer 10",
    description:
      "The spacecraft that travelled beyond the orbit of the outer planets and into deep space.",
    status: "Travelling outward",
  },
];

export default function Explorer() {
  return (
    <main className="explorer">
      <header className="explorer__header">
        <Link to="/" className="back-link">← The beginning</Link>
        <p className="eyebrow">THE ARCHIVE / EXPLORATION</p>
        <h1>Where shall we look first?</h1>
        <p className="explorer__intro">
          Every journey leaves evidence. Choose a place to begin.
        </p>
      </header>

      <section className="destination-list">
        {destinations.map((item, index) => (
          <Link
            className="destination"
            to={`/artifact/${item.id}`}
            key={item.id}
          >
            <span className="destination__number">0{index + 1}</span>
            <div className="destination__main">
              <p className="eyebrow">{item.category}</p>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
            <div className="destination__end">
              <span>{item.status}</span>
              <span aria-hidden="true">↗</span>
            </div>
          </Link>
        ))}
      </section>

      <footer className="explorer__footer">
        <Link to="/credits">Sources and acknowledgements</Link>
      </footer>
    </main>
  );
}