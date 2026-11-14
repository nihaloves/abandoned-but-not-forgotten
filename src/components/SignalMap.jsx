
import { useState } from "react";
import { locations } from "../data/missions";
import "./SignalMap.css";

const positions = {
  moon: { left: "28%", top: "38%" },
  mars: { left: "59%", top: "24%" },
  asteroids: { left: "72%", top: "66%" },
  beyond: { left: "88%", top: "40%" },
};

export default function SignalMap() {
  const [location, setLocation] = useState("mars");
  const [mission, setMission] = useState(null);
  const [opened, setOpened] = useState(false);

  const selectedLocation = locations.find(
    (item) => item.id === location
  );

  function chooseLocation(id) {
    setLocation(id);
    setMission(null);
    setOpened(false);
  }

  function chooseMission(item) {
    setMission(item);
    setOpened(false);
  }

  return (
    <section className="signal-archive" id="signal-map">
      <header className="archive-heading">
        <p className="eyebrow">THE ARCHIVE / 001</p>
        <h2>Something remains.</h2>
        <p>
          Across the Solar System, traces of our journeys
          are still waiting to be discovered.
        </p>
      </header>

      <div className="signal-map">
        <p className="map-label">SELECT A DESTINATION</p>

        <div className="orbit orbit--one" />
        <div className="orbit orbit--two" />
        <div className="orbit orbit--three" />

        <div className="map-sun" aria-label="Sun" />

        {locations.map((item) => (
          <button
            key={item.id}
            className={`map-point map-point--${item.id} ${
              location === item.id ? "is-active" : ""
            }`}
            style={positions[item.id]}
            onClick={() => chooseLocation(item.id)}
            aria-pressed={location === item.id}
          >
            <span className="map-point__planet" />
            <span className="map-point__name">{item.name}</span>
          </button>
        ))}
      </div>

      <div className="archive-selection">
        <div className="archive-location">
          <p className="eyebrow">DESTINATION SELECTED</p>
          <h3>{selectedLocation.name}</h3>
          <p>{selectedLocation.description}</p>
        </div>

        <div className="signal-list">
          <p className="eyebrow">ARCHIVED SIGNALS</p>

          {selectedLocation.missions.map((item) => (
            <button
              className={`signal-item ${
                mission?.id === item.id ? "is-selected" : ""
              }`}
              key={item.id}
              onClick={() => chooseMission(item)}
            >
              <span>
                <strong>{item.name}</strong>
                <small>{item.type}</small>
              </span>
              <span aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
      </div>

      {mission && (
        <div className="signal-detail" aria-live="polite">
          <p className="eyebrow">ARCHIVE TRACE / {mission.id.toUpperCase()}</p>
          <h3>{mission.name}</h3>
          <p className="signal-status">{mission.status}</p>
          <p className="signal-question">{mission.question}</p>

          <button
            className="investigate-button"
            onClick={() => setOpened(!opened)}
          >
            {opened ? "Close trace" : "Investigate this signal"} ↗
          </button>

          {opened && (
            <div className="investigation-preview">
              <p className="eyebrow">INVESTIGATION OPENED</p>
              <h4>Every trace has a story.</h4>
              <p>
                We will follow the surviving evidence, examine
                what it tells us, and uncover the journey behind
                this artifact.
              </p>
              <span>CASE FILE: {mission.name.toUpperCase()}</span>
            </div>
          )}
        </div>
      )}

      <p className="archive-footnote">
        Historical mission archive. Locations are diagrammatic
        and not to scale. Archived signals do not represent
        live transmissions.
      </p>
    </section>
  );
}
