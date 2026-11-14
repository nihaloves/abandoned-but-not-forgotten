export const stories = {
  opportunity: {
    id: "opportunity",
    name: "Opportunity",
    origin: "Mars",
    target: 63,
    evidence: [
      "LAST UPLINK RECEIVED. SOL 5111. 10 JUNE 2018.",
      "A planet-encircling dust storm had blocked the sun.",
      "In the months after, NASA sent more than a thousand recovery commands.",
      "No reply.",
    ],
    chapters: [
      {
        year: 2018, title: "The storm",
        text: "A dust storm grew until it covered the planet. Opportunity runs on sunlight, and the sky went dark.",
        image: "/images/opportunity/storm.jpg", credit: "NASA/JPL-Caltech",
      },
      {
        year: 2011, title: "A new horizon",
        text: "Years beyond its warranty, the rover reached the rim of Endeavour crater, about 22 kilometres across.",
        image: "/images/opportunity/endeavour.jpg", credit: "NASA/JPL-Caltech",
      },
      {
        year: 2004, title: "Landing",
        text: "It came to rest inside a small crater on Meridiani Planum. It was built to work for 90 sols. Within weeks, its instruments showed the rocks here had once been soaked in water.",
        image: "/images/opportunity/landing.jpg", credit: "NASA/JPL-Caltech",
      },
      {
        year: 2003, title: "Launch",
        text: "Two twin rovers left Earth to answer one question: was Mars ever wet?",
        image: "/images/opportunity/launch.jpg", credit: "NASA",
      },
    ],
    machineVoice: "Creative interpretation: I kept moving toward the light.",
    legacy: "It travelled about 45 kilometres, more than a marathon. NASA declared the mission complete on 13 February 2019.",
    sources: ["NASA/JPL Mars Exploration Rover mission pages", "NSSDCA: Opportunity"],
  },

  "pioneer-10": {
    id: "pioneer-10",
    name: "Pioneer 10",
    origin: "Beyond the planets",
    target: 31,
    evidence: [
      "LAST SIGNAL RECEIVED. JANUARY 2003.",
      "The spacecraft was about 12 billion kilometres from Earth.",
      "Its signal took more than 11 hours to reach us.",
      "Later attempts to contact it brought no reply.",
    ],
    chapters: [
      {
        year: 2003, title: "The last whisper",
        text: "Its power source had been fading for decades. In 2003 a very faint signal arrived, and then the silence began.",
        image: "/images/pioneer/deepspace.jpg", credit: "NASA",
      },
      {
        year: 1983, title: "Leaving the planets",
        text: "It became the first human-made object to pass the orbit of Neptune, and it kept going.",
        image: "/images/pioneer/leaving.jpg", credit: "NASA",
      },
      {
        year: 1973, title: "Jupiter, up close",
        text: "In December it flew about 130,000 kilometres above Jupiter's clouds, the first spacecraft to get so close.",
        image: "/images/pioneer/jupiter.jpg", credit: "NASA Ames",
      },
      {
        year: 1972, title: "Launch",
        text: "Its mission was planned for about 21 months. It also carried a small plaque showing where it came from, in case anyone ever found it.",
        image: "/images/pioneer/launch.jpg", credit: "NASA",
      },
    ],
    machineVoice: "Creative interpretation: I am still going. There is no one left to tell, but the direction has not changed.",
    legacy: "Pioneer 10 is heading roughly toward the star Aldebaran. It would take over two million years to get there.",
    sources: ["NASA Ames Pioneer 10 mission page", "NSSDCA: Pioneer 10", "NASA Pioneer plaque page"],
  },
};

export const signals = [
  { id: "opportunity", name: "Opportunity", x: 62, y: 40 },
  { id: "pioneer-10", name: "Pioneer 10", x: 82, y: 22 },
  { name: "Apollo stations", x: 24, y: 58 },
  { name: "NEAR Shoemaker", x: 45, y: 72 },
  { name: "Kepler", x: 15, y: 25 },
  { name: "InSight", x: 70, y: 66 },
];