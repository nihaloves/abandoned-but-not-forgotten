
export const story = {
  name: "Opportunity",
  target: 63,
  evidence: [
    "LAST UPLINK RECEIVED. SOL 5111. 10 JUN 2018.",
    "A planet-encircling dust storm has blocked the sun.",
    "NASA sent over a thousand recovery commands in the months after.",
    "No reply.",
  ],
  chapters: [
    {
      year: 2018,
      title: "The storm",
      text: "A global dust storm darkened the sky above solar-powered Opportunity.",
      image: "/images/PIA23246.jpg",
      credit: "NASA / JPL-Caltech · Opportunity rover · 2019",
    },
    { year: 2011, title: "A new horizon", text: "Years past its warranty, the rover reached Endeavour crater." },
    { year: 2004, title: "Landing", text: "Designed for 90 sols, it was only just beginning." },
    { year: 2003, title: "Launch", text: "Two rovers left Earth, carrying questions about water." },
  ],
  machineVoice: "Creative interpretation: I kept moving toward the light.",
  legacy: "Designed for 90 sols, Opportunity explored Mars for nearly 15 years.",
};

export const locations = [
  {
    id: "moon",
    name: "The Moon",
    description: "Humanity's first steps beyond Earth.",
    missions: [
      {
        id: "apollo-11",
        name: "Apollo 11 Retroreflector",
        type: "Lunar instrument",
        question: "How can an instrument left on the Moon in 1969 still help us measure the distance to it?",
        status: "Still scientifically useful",
      },
    ],
  },
  {
    id: "mars",
    name: "Mars",
    description: "Machines that explored a world no human has walked upon.",
    missions: [
      {
        id: "opportunity",
        name: "Opportunity",
        type: "Mars rover",
        question: "A mission designed for 90 Martian days lasted nearly 15 years. How?",
        status: "Mission ended",
      },
      {
        id: "insight",
        name: "InSight",
        type: "Mars lander",
        question: "What did a lander discover beneath the surface before it went silent?",
        status: "Mission ended",
      },
    ],
  },
  {
    id: "asteroids",
    name: "Asteroids",
    description: "A spacecraft that reached a destination in an unexpected way.",
    missions: [
      {
        id: "near",
        name: "NEAR Shoemaker",
        type: "Asteroid mission",
        question: "How did a spacecraft land on an asteroid when it was never designed to?",
        status: "Mission completed",
      },
    ],
  },
  {
    id: "beyond",
    name: "Beyond the planets",
    description: "Human-made objects continuing into deep space.",
    missions: [
      {
        id: "pioneer-10",
        name: "Pioneer 10",
        type: "Deep-space probe",
        question: "What remains of a spacecraft after its last communication with Earth?",
        status: "No longer communicating",
      },
    ],
  },
];
export const pioneer10 = {
  id: "pioneer-10",
  name: "Pioneer 10",
  target: 31, // tuner frequency, so each story feels different
  evidence: [
    "LAST SIGNAL RECEIVED. JANUARY 2003.",
    "The spacecraft was about 12 billion kilometres from Earth.",
    "The signal took more than 11 hours to reach us.",
    "Later attempts to contact it brought no reply.",
  ],
  chapters: [
    {
      year: 2003,
      title: "The last whisper",
      text: "Its nuclear power source had faded for decades. In 2003 a very faint signal arrived, and then the silence began.",
      image: "/images/pioneer/deepspace.jpg",
      credit: "NASA / Ames",
    },
    {
      year: 1983,
      title: "Leaving the planets",
      text: "Pioneer 10 became the first human-made object to pass the orbit of Neptune, then the outermost planet in the Solar System, and kept going.",
      image: "/images/pioneer/leaving.jpg",
      credit: "NASA / Ames",
    },
    {
      year: 1973,
      title: "Jupiter, up close",
      text: "In December it flew about 130,000 kilometres above Jupiter's clouds, the first spacecraft ever to get so close. It measured radiation so intense that later missions were designed with it in mind.",
      image: "/images/pioneer/jupiter.jpg",
      credit: "NASA Ames",
    },
    {
      year: 1972,
      title: "Launch",
      text: "Its mission was planned to last about 21 months. It also carried a small plaque showing where it came from, in case anyone ever found it.",
      image: "/images/pioneer/launch.png",
      credit: "NASA",
    },
  ],
  machineVoice:
    "Creative interpretation: I am still going. There is no one left to tell, but the direction has not changed.",
  legacy:
    "Pioneer 10 is heading roughly toward the star Aldebaran. It would take over two million years to get there.",
  sources: [
    "NASA Ames Pioneer 10 mission page",
    "NASA Space Science Data Coordinated Archive (NSSDCA), Pioneer 10",
    "NASA Pioneer Plaque page",
  ],
};