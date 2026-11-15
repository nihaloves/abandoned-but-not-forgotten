
import { useState } from "react";
import { locations } from "../data/missions";
import "./SignalMap.css";

const positions = {
  moon: { left: "27%", top: "38%" },
  mars: { left: "53%", top: "24%" },
  asteroids: { left: "72%", top: "66%" },
  beyond: { left: "88%", top: "38%" },
};

export default function SignalMap() {
  const [location, setLocation] = useState("mars");
  const [mission, setMission] = useState(null);
  const [opened, setOpened] = useState(false);

  const selectedLocation =
    locations.find((item) => item.id === location) ?? locations[0];

  const missions = selectedLocation?.missions ?? [];

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
    <section
      className="signal-archive"
      id="signal-map"
      aria-labelledby="archive-title"
    >
      <div className="archive-inner">

        {/* INTRODUCTION */}
        <header className="archive-heading">
          <div className="archive-kicker">
            <span className="archive-kicker__line" />
            THE SOLAR SYSTEM ARCHIVE / 001
          </div>

          <h2 id="archive-title">
            Something <span>remains.</span>
          </h2>

          <p>
            Across the Solar System, traces of our journeys
            are still waiting to be discovered. Choose a
            destination and uncover the stories left behind.
          </p>
        </header>

        {/* DESTINATION MAP */}
        <div className="archive-map-section">
          <div className="archive-map-heading">
            <div>
              <span className="archive-label">01 / NAVIGATION</span>
              <h3>Explore the destinations</h3>
            </div>

            <span className="archive-map-hint">
              SELECT A LOCATION
            </span>
          </div>

          <div
            className="signal-map"
            aria-label="Diagrammatic map of archived mission destinations"
          >
            <div className="map-stars" />

            <span className="map-map-label">
              SOLAR SYSTEM / NOT TO SCALE
            </span>

            <div className="map-sun">
              <span />
            </div>

            <div className="orbit orbit--one" />
            <div className="orbit orbit--two" />
            <div className="orbit orbit--three" />

            {locations.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`map-point map-point--${item.id} ${
                  location === item.id ? "is-active" : ""
                }`}
                style={positions[item.id]}
                onClick={() => chooseLocation(item.id)}
                aria-pressed={location === item.id}
                aria-label={`Explore ${item.name}`}
              >
                <span className="map-point__planet">
                  <span />
                </span>

                <span className="map-point__name">
                  {item.name}
                </span>

                {location === item.id && (
                  <span className="map-point__indicator">
                    SELECTED
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* DESTINATION DETAILS */}
        {selectedLocation && (
          <div className="archive-selection">

            <div className="archive-location">
              <span className="archive-label">
                02 / DESTINATION
              </span>

              <h3>{selectedLocation.name}</h3>

              <p>{selectedLocation.description}</p>

              <div className="archive-count">
                <span className="archive-count__number">
                  {String(missions.length).padStart(2, "0")}
                </span>

                <span>
                  ARCHIVED
                  <br />
                  MISSION SIGNALS
                </span>
              </div>
            </div>

            {/* MISSION LIST */}
            <div className="signal-list">
              <div className="signal-list-heading">
                <span className="archive-label">
                  03 / DISCOVERIES
                </span>

                <span className="signal-list-count">
                  {missions.length} RECORDS
                </span>
              </div>

              {missions.length > 0 ? (
                missions.map((item, index) => (
                  <button
                    type="button"
                    className={`signal-item ${
                      mission?.id === item.id ? "is-selected" : ""
                    }`}
                    key={item.id}
                    onClick={() => chooseMission(item)}
                    aria-pressed={mission?.id === item.id}
                  >
                    <span className="signal-item-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="signal-item-content">
                      <strong>{item.name}</strong>
                      <small>{item.type}</small>
                    </span>

                    <span className="signal-item-arrow">
                      ↗
                    </span>
                  </button>
                ))
              ) : (
                <p className="archive-empty">
                  No archived mission records are available
                  for this destination yet.
                </p>
              )}
            </div>
          </div>
        )}

        {/* SELECTED MISSION */}
        {mission && (
          <section
            className="signal-detail"
            aria-live="polite"
          >
            <div className="signal-detail-top">
              <span className="archive-label">
                04 / RECOVERED RECORD
              </span>

              <span className="signal-record-id">
                CASE / {mission.id.toUpperCase()}
              </span>
            </div>

            <div className="signal-detail-content">
              <div>
                <span className="signal-detail-type">
                  {mission.type}
                </span>

                <h3>{mission.name}</h3>

                <span className="signal-status">
                  <span />
                  {mission.status}
                </span>
              </div>

              <div className="signal-detail-description">
                <span className="archive-label">
                  THE QUESTION THAT REMAINS
                </span>

                <p>{mission.question}</p>

                <button
                  type="button"
                  className="investigate-button"
                  onClick={() => setOpened((value) => !value)}
                  aria-expanded={opened}
                >
                  {opened ? "Close case file" : "Open case file"}
                  <span>{opened ? "−" : "↗"}</span>
                </button>
              </div>
            </div>

            {opened && (
              <div className="investigation-preview">
                <span className="archive-label">
                  ARCHIVE RECORD / {mission.id.toUpperCase()}
                </span>

                <h4>Every trace has a story.</h4>

                <p>
                  Explore the mission behind this artifact.
                  Follow its origins, uncover the science it
                  made possible, and examine the evidence
                  that remains today.
                </p>

                <span className="investigation-case">
                  SELECTED RECORD: {mission.name.toUpperCase()}
                </span>
              </div>
            )}
          </section>
        )}

        {/* FOOTER */}
        <footer className="archive-footer">
          <span>ABANDONED BUT NOT FORGOTTEN</span>

          <p>
            Historical mission archive. Locations are
            diagrammatic and not to scale. Archived signals
            do not represent live transmissions.
          </p>
        </footer>

      </div>
    </section>
  );
}
