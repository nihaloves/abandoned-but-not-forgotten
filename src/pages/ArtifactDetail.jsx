import { Link, useParams } from "react-router-dom";

const artifacts = {
  opportunity: {
    title: "Opportunity",
    category: "MARS EXPLORATION ROVER",
    dates: "2004–2018",
    introduction:
      "A mission expected to last 90 Martian days became a journey of nearly 15 years.",
    question: "How did a 90-day mission last nearly 15 years?",
    sections: [
      {
        title: "The mission",
        text: "Opportunity was one of NASA's Mars Exploration Rovers. Its mission was to study the Martian surface and search for evidence of past water activity.",
      },
      {
        title: "The evidence",
        text: "Photographs, scientific observations and mission records allow us to follow the rover's journey and examine the ground it explored.",
      },
      {
        title: "The final communication",
        text: "NASA ended the mission in February 2019 after attempts to re-establish communication failed following a major dust storm in 2018.",
      },
    ],
    source: "https://science.nasa.gov/mission/mars-exploration-rovers/",
    sourceLabel: "NASA — Mars Exploration Rovers",
    photo:
      "https://science.nasa.gov/photojournal/opportunitys-tracks-in-perseverance-valley/",
    photoLabel: "Opportunity's Tracks in Perseverance Valley",
  },
  apollo: {
    title: "Apollo landing sites",
    category: "LUNAR EXPLORATION",
    dates: "1969–1972",
    introduction:
      "Humanity reached the lunar surface and left behind equipment, experiments and evidence of those journeys.",
    question: "What remains where humans first walked on the Moon?",
    sections: [
      {
        title: "The missions",
        text: "Apollo missions carried astronauts to the lunar surface and conducted scientific exploration.",
      },
      {
        title: "The evidence",
        text: "Mission photographs, records and lunar surface observations document what was left at the landing sites.",
      },
    ],
    source: "https://www.nasa.gov/the-apollo-program/",
    sourceLabel: "NASA — Apollo Program",
  },
  "pioneer-10": {
    title: "Pioneer 10",
    category: "DEEP-SPACE EXPLORATION",
    dates: "1972",
    introduction:
      "A spacecraft that travelled farther from Earth than any spacecraft before it at the time of its launch.",
    question: "What happens when a mission travels beyond its last contact?",
    sections: [
      {
        title: "The journey",
        text: "Pioneer 10 was launched to explore Jupiter and continued on an outward trajectory beyond the planets.",
      },
      {
        title: "The evidence",
        text: "Its mission history and scientific records preserve the story of this early deep-space journey.",
      },
    ],
    source: "https://science.nasa.gov/mission/pioneer-10/",
    sourceLabel: "NASA — Pioneer 10",
  },
};

export default function ArtifactDetail() {
  const { artifactId } = useParams();
  const artifact = artifacts[artifactId];

  if (!artifact) {
    return (
      <main className="detail-page">
        <h1>Artifact not found.</h1>
        <Link to="/explore">Return to the archive</Link>
      </main>
    );
  }

  return (
    <main className="detail-page">
      <Link to="/explore" className="back-link">
        ← Back to the archive
      </Link>

      <header className="detail-header">
        <p className="eyebrow">{artifact.category}</p>
        <h1>{artifact.title}</h1>
        <p className="detail-date">{artifact.dates}</p>
        <p className="detail-intro">{artifact.introduction}</p>
      </header>

      <section className="detail-question">
        <p className="eyebrow">THE INVESTIGATION</p>
        <h2>{artifact.question}</h2>
      </section>

      {artifact.sections.map((section, index) => (
        <section className="detail-section" key={section.title}>
          <p className="eyebrow">0{index + 1}</p>
          <h2>{section.title}</h2>
          <p>{section.text}</p>
        </section>
      ))}

      {artifact.photo && (
        <section className="detail-section">
          <p className="eyebrow">PHOTOGRAPH / NASA</p>
          <h2>Read the landscape.</h2>
          <p>
            Explore the original NASA photograph and its mission context.
          </p>
          <a href={artifact.photo} target="_blank" rel="noreferrer">
            {artifact.photoLabel} ↗
          </a>
        </section>
      )}

      <section className="detail-sources">
        <p className="eyebrow">PRIMARY SOURCE</p>
        <a href={artifact.source} target="_blank" rel="noreferrer">
          {artifact.sourceLabel} ↗
        </a>
      </section>

      <Link to="/explore" className="opening__link">
        Return to the archive
      </Link>
    </main>
  );
}
