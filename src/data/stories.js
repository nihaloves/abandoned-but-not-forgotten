export const stories = {
  opportunity: {
    id: "opportunity",
    name: "Opportunity",
    origin: "Mars",
    target: 63,
    signalLine: "Opportunity is silent. But it left a record of its discoveries on Mars.",

    meet: {
      what: "A robot rover about the size of a golf cart. No people on board. Scientists on Earth drove it by sending commands.",
      where: "Mars, the red planet next door.",
      when: "Launched in July 2003. Landed in January 2004.",
      job: "Find out if Mars ever had water.",
      narration:
        "Meet Opportunity. It is a robot rover about the size of a golf cart. There were no people on board. Scientists on Earth drove it by sending commands. It was sent to Mars, launched in July two thousand three and landed in January two thousand four. Its job: find out if Mars ever had water.",
    },

    evidence: [
      "LAST RECEIVED. SOL 5111 (a sol is one Martian day). 10 JUNE 2018.",
      "A planet-wide dust storm blocked much of the sunlight reaching its solar panels.",
      "Opportunity ran on sunlight. Its signal stopped during the storm.",
    ],

    narrationEvidence:
      "The last signal came on the tenth of June, twenty eighteen. A dust storm had covered all of Mars. Opportunity ran on sunlight. Then, the signal stopped.",

    myth: {
      quote: "My battery is low and it's getting dark.",
      question: "People say these were Opportunity's last words. Did it really say that?",
      answer:
        "No! Opportunity sent numbers about dust and battery power. A reporter turned them into a poem. Machines don't write goodbyes. The people who loved it did the listening.",
      narration:
        "Did Opportunity really say that? No. It sent numbers about dust and battery power. A reporter turned them into a poem. Machines don't write goodbyes. The people who loved it did the listening.",
    },

    rewindLine:
      "Rewind. Opportunity was built to work for 90 days. It worked for almost 15 years. How?",

    chapters: [
      {
        year: 2019,
        tag: "NOT EVERY JOURNEY RETURNS",
        title: "A thousand tries",
        text:
          "For eight months, engineers sent more than 1,000 commands to wake Opportunity up. The last attempts came in February 2019. Silence. NASA officially declared the mission over, and the team said goodbye.",
        narration:
          "For eight months, engineers sent more than one thousand commands, hoping Opportunity would wake up. The mission was declared over in February, twenty nineteen. Silence. The team played a song and said goodbye.",
        image: "/images/opportunity/storm.jpg",
        alt: "Mars dust storm seen from space",
        credit: "NASA/JPL-Caltech/MSSS",
        ticks: 1000,
      },
      {
        year: 2011,
        tag: "THEY DISCOVERED",
        title: "Overtime",
        text:
          "At times, wind helped blow dust off its solar panels, allowing more sunlight to reach them. Ninety days became a year, then five, then fourteen. It drove 45.16 kilometres. That's farther than a marathon!",
        narration:
          "At times, wind helped blow dust off its solar panels, giving it more sunlight. Ninety days became a year, then five, then fourteen. It drove forty five kilometres. That's farther than a marathon!",
        image: "/images/opportunity/endeavour.jpg",
        alt: "Opportunity's view of the rim of Endeavour crater",
        credit: "NASA/JPL-Caltech/Cornell/ASU",
        odometer: { to: 45.16, marker: 42.2, markerLabel: "Marathon" },
      },
      {
        year: 2004,
        tag: "WE SENT IT",
        title: "Landing",
        text:
          "Opportunity landed on Mars in January 2004. Its job was to find out if Mars ever had water. Its microscope camera photographed tiny round rocks that scientists nicknamed 'blueberries'. These iron-rich spherules and the surrounding rocks provided evidence that liquid water had changed the Martian landscape long ago.",
        narration:
          "Opportunity landed on Mars in January, two thousand four. Its job was to find out if Mars ever had water. Its microscope camera photographed tiny round rocks, nicknamed blueberries. These rocks helped scientists find evidence that liquid water had changed parts of Mars long ago.",
        image: "/images/opportunity/landing.jpg",
        alt: "Eagle crater, where Opportunity landed on Mars",
        credit: "NASA/JPL/Cornell",
      },
      {
        year: 2003,
        tag: "WE BUILT",
        title: "Built to explore",
        text:
          "Opportunity was built like a robot geologist. Six wheels to climb over rocks. Cameras for eyes. A robotic arm with tools to study rocks up close. It would look, drive and measure, then send everything home as radio signals. In July 2003, a rocket carried it away from Earth.",
        narration:
          "Opportunity was built like a robot geologist. Six wheels to climb over rocks. Cameras for eyes. A robotic arm with tools to study rocks up close. It would look, drive and measure, then send everything home as radio signals. In July, two thousand three, a rocket carried it away from Earth.",
        image: "/images/opportunity/launch.jpg",
        alt: "Rocket carrying the Opportunity rover launching from Earth",
        credit: "NASA/JPL-Caltech",
      },
    ],

    watch: {
      title: "Opportunity: NASA Rover Completes Mars Mission",
      youtubeId: "",
      blurb:
        "NASA and JPL published real footage and images from Opportunity's 15 years on Mars.",
      links: [
        {
          label: "Opportunity: NASA Rover Completes Mars Mission",
          source: "NASA JPL video",
          url: "https://www.jpl.nasa.gov/videos/opportunity-nasa-rover-completes-mars-mission/",
        },
        {
          label: "A rover's-eye view of a three-year trek on Mars",
          source: "NASA JPL video",
          url: "https://www.jpl.nasa.gov/videos/rovers-eye-view-of-three-year-trek-on-mars",
        },
        {
          label: "Opportunity's parting shot: the last image it sent",
          source: "NASA JPL",
          url: "https://www.jpl.nasa.gov/news/opportunitys-parting-shot-was-a-beautiful-panorama/",
        },
        {
          label: "More videos on the NASA JPL YouTube channel",
          source: "YouTube",
          url: "https://www.youtube.com/@NASAJPL",
        },
      ],
    },

    closing: {
      tagline: "Some never returned. But their discoveries came home to us.",
      question: "What question would you send to another world?",
      sent: "Your question is on its way.",
      narration:
        "Some never returned. But their discoveries came home to us. What question would you send to another world?",
    },

    sources: [
      "NASA/JPL Mars Exploration Rover mission pages",
      "NASA Photojournal",
      "NASA — Opportunity mission ends",
    ],
  },

  "apollo-11-eagle": {
    id: "apollo-11-eagle",
    name: "Apollo 11 Eagle",
    origin: "the Moon",
    target: 22,
    signalLine: "Eagle is silent. Its landing place remains on the Moon.",
    meet: {
      what: "Eagle was a lunar lander, the spacecraft that landed on the Moon. It carried two astronauts, Neil Armstrong and Buzz Aldrin.",
      where: "The Moon, on a flat area called the Sea of Tranquility.",
      when: "Landed on 20 July 1969.",
      job: "Carry people down to the Moon, and then back up to their ride home.",
      narration:
        "Meet Eagle. It was a lunar lander, the spacecraft that landed on the Moon. It carried two astronauts, Neil Armstrong and Buzz Aldrin. It landed on the Moon on the twentieth of July, nineteen sixty nine. Its job: carry people down to the Moon, and then back up to their ride home.",
    },

    evidence: [
      "LOCATION: Sea of Tranquility, the Moon.",
      "LAST ACTIVE: 21 July 1969, when the astronauts lifted off from the lunar surface.",
      "STATUS: Eagle's descent stage remains on the Moon.",
    ],

    narrationEvidence:
      "Eagle landed in the Sea of Tranquility. Its ascent stage carried the astronauts back to orbit in July, nineteen sixty nine. The bottom half of the lander stayed behind as a launch platform.",

    chapters: [
      {
        year: "Today",
        tag: "SCIENCE LEFT BEHIND",
        title: "Still measuring",
        text:
          "Apollo 11's astronauts separately deployed a panel of mirrors called a laser retroreflector. Scientists on Earth still bounce laser beams off it to measure the distance to the Moon. It is part of the Early Apollo Scientific Experiments Package, not part of Eagle itself.",
        narration:
          "The astronauts left more than footprints. They separately placed a panel of mirrors on the Moon. Scientists on Earth still bounce laser beams off it to measure the distance to the Moon.",
        image: "/images/apollo/retroreflector.jpg",
        alt: "The laser ranging retroreflector deployed on the Moon by Apollo 11",
        credit: "NASA",
      },
      {
        year: 1969,
        tag: "THEY DISCOVERED",
        title: "Two and a half hours on the Moon",
        text:
          "Neil Armstrong and Buzz Aldrin walked on the surface for about two and a half hours. They collected rocks, took photos and deployed scientific experiments. Then they climbed back inside. The top half of Eagle launched. The bottom half stayed behind as the landing platform.",
        narration:
          "Neil Armstrong and Buzz Aldrin walked on the surface for about two and a half hours. They collected rocks, took photos and set up experiments. Then they climbed back inside. The top half of Eagle launched. The bottom half stayed behind.",
        image: "/images/apollo/moonwalk.jpg",
        alt: "Astronaut and lunar module on the surface of the Moon, Apollo 11",
        credit: "NASA",
      },
      {
        year: "1960s",
        tag: "WE BUILT",
        title: "A lander in two parts",
        text:
          "Eagle was built in two parts. The bottom part had the landing engine and four legs. The top part carried the astronauts and had its own engine to lift off again. Leaving the bottom part behind made the trip home much lighter.",
        narration:
          "Eagle was built in two parts. The bottom part had the landing engine and four legs. The top part carried the astronauts and had its own engine to lift off again. Leaving the bottom part behind made the trip home much lighter.",
        image: "/images/apollo/lander.jpg",
        alt: "The Apollo lunar module Eagle",
        credit: "NASA",
      },
    ],

    watch: {
      title: "Astronauts Armstrong and Aldrin Arrive on the Moon",
      youtubeId: "",
      blurb:
        "Historical NASA footage of Eagle's landing and the first moonwalk.",
      links: [
        {
          label: "Astronauts Armstrong and Aldrin Arrive on the Moon",
          source: "NASA video",
          url: "https://www.nasa.gov/stem-content/astronauts-armstrong-and-aldrin-arrive-on-the-moon/",
        },
        {
          label: "More Apollo videos on the NASA YouTube channel",
          source: "YouTube",
          url: "https://www.youtube.com/@NASA",
        },
      ],
    },

    sources: [
      "NASA Apollo 11 mission pages",
      "NSSDCA: Apollo 11 Lunar Module",
      "NASA Apollo 11 Early Apollo Scientific Experiments Package",
      "NASA Apollo 11 lunar laser ranging retroreflector",
    ],
  },

  "pioneer-10": {
    id: "pioneer-10",
    name: "Pioneer 10",
    origin: "beyond the planets",
    target: 31,
    signalLine: "Pioneer 10 is still travelling and Earth can no longer hear it.",
    meet: {
      what: "A robot spacecraft with no crew, built to fly past planets and send back what it saw.",
      where: "It flew past Jupiter, then kept going toward the edge of our Solar System.",
      when: "Launched in 1972.",
      job: "Be the first spacecraft to cross the asteroid belt and the first to fly close to Jupiter.",
      narration:
        "Meet Pioneer ten. It was a robot spacecraft with no crew, built to fly past planets and send back what it saw. It was launched in nineteen seventy two. Its job: be the first spacecraft to cross the asteroid belt, and the first to fly close to Jupiter.",
    },

    evidence: [
      "LAST SIGNAL RECEIVED: 23 JANUARY 2003.",
      "The spacecraft was about 12 billion kilometres from Earth.",
      "Its signal took more than 11 hours to reach us.",
      "Its last telemetry had arrived in April 2002.",
    ],

    narrationEvidence:
      "The last signal from Pioneer 10 came in January, two thousand three. The spacecraft was about twelve billion kilometres from Earth. Its signal took more than eleven hours to reach us.",

    chapters: [
      {
        year: 2003,
        tag: "NOT EVERY JOURNEY RETURNS",
        title: "The last whisper",
        text:
          "Pioneer 10's radioisotope power source had been fading for years. On 23 January 2003, a very weak signal reached Earth. It carried no usable telemetry. Later attempts brought no reply. The spacecraft is still travelling, but we can no longer communicate with it.",
        narration:
          "Pioneer ten's power source had been fading for years. In January, two thousand three, a very faint signal arrived. Later tries brought no reply. It is still flying, but too far and too quiet for us to hear.",
        image: "/images/pioneer/deepspace.jpg",
        alt: "Artist's concept of Pioneer 10 flying away from the Sun",
        credit: "NASA (artist's concept)",
      },
      {
        year: 1983,
        tag: "WE SENT IT",
        title: "Leaving the planets",
        text:
          "On 13 June 1983, Pioneer 10 became the first human-made object to cross the orbit of Neptune, then the outermost planet. It kept going into deep space.",
        narration:
          "In nineteen eighty three, it became the first human-made object to cross the orbit of Neptune, then the outermost planet. It kept going into deep space.",
        image: "/images/pioneer/leaving.jpg",
        alt: "Artist's concept of Pioneer 10 outbound in space",
        credit: "NASA (artist's concept)",
      },
      {
        year: 1973,
        tag: "THEY DISCOVERED",
        title: "Jupiter up close",
        text:
          "On 4 December 1973, Pioneer 10 flew past Jupiter. It sent back close-up images and measurements of the planet's atmosphere, magnetic field and intense radiation environment. Its findings helped engineers prepare for later missions to Jupiter.",
        narration:
          "In December, nineteen seventy three, Pioneer ten flew past Jupiter. It sent back pictures and measurements of the giant planet, helping scientists understand its powerful radiation and magnetic field.",
        image: "/images/pioneer/jupiter.jpg",
        alt: "Jupiter as seen by Pioneer 10",
        credit: "NASA Ames",
      },
      {
        year: 1972,
        tag: "WE BUILT",
        title: "Launch",
        text:
          "Pioneer 10 launched on 2 March 1972. It carried a small gold-anodized plaque showing a human man and woman, the Solar System and the spacecraft's origin, in case anyone ever found it.",
        narration:
          "Pioneer ten launched in March, nineteen seventy two. It carried a small plaque showing where it came from, in case anyone ever found it.",
        image: "/images/pioneer/launch.jpg",
        alt: "Pioneer 10 launching on a rocket",
        credit: "NASA",
      },
    ],

    watch: {
      title: "Pioneer 10",
      youtubeId: "",
      blurb:
        "Pioneer 10 was the first spacecraft to cross the asteroid belt and the first to fly close to Jupiter.",
      links: [
        {
          label: "Pioneer 10 flies by Jupiter",
          source: "NASA",
          url: "https://www.nasa.gov/image-article/pioneer-10-flies-by-jupiter/",
        },
        {
          label: "Search NASA's Pioneer 10 videos on YouTube",
          source: "YouTube",
          url: "https://www.youtube.com/results?search_query=NASA+Pioneer+10+Jupiter",
        },
      ],
    },

    sources: [
      "NASA Ames Pioneer 10 mission page",
      "NSSDCA: Pioneer 10",
      "NASA — Pioneer 10 Sends Last Signal",
      "NASA Pioneer plaque page",
    ],
  },

  "lunar-rovers": {
    id: "lunar-rovers",
    name: "The Lunar Roving Vehicles",
    origin: "Apollo 15, Apollo 16 and Apollo 17",
    target: 18,
    signalLine: "The Moon buggies are still parked where the astronauts left them.",
    meet: {
      what: "Three electric vehicles left on the Moon.",
      where: "Hadley–Apennine, Descartes Highlands and Taurus–Littrow.",
      when: "1971–1972.",
      job: "Help astronauts explore farther from their lunar landing sites.",
      narration:
        "Imagine driving a car where there are no roads, no air and no repair shop. Three Moon buggies did exactly that. And when their missions ended, they stayed right where the astronauts parked them.",
    },

    evidence: [
      "Three rovers were used: Apollo 15, Apollo 16 and Apollo 17.",
      "Each rover had four electrically powered wheels.",
      "They carried astronauts, tools, cameras and lunar samples.",
      "All three remain on the lunar surface.",
    ],

    narrationEvidence:
      "These were not ordinary cars. Their wheels, batteries and controls had to work in a vacuum, in low gravity and through extreme temperatures.",

    chapters: [
      {
        year: "1972",
        tag: "LAST LUNAR ROVER",
        title: "The final parking place",
        text:
          "Apollo 17 carried the third and final lunar rover. Astronauts Eugene Cernan and Harrison Schmitt used it to explore the Taurus–Littrow valley. When they left the Moon, the rover stayed behind.",
        narration:
          "The last Moon buggy was parked. Nobody has driven it since.",
        image: "/images/apollo/rover-apollo15.jpg",
        alt: "Apollo lunar rover on the lunar surface during the Apollo missions",
        credit: "NASA",
      },
      {
        year: "1971",
        tag: "FIRST DRIVE",
        title: "A vehicle on another world",
        text:
          "Apollo 15 introduced the first Lunar Roving Vehicle. David Scott and James Irwin used it to travel across the Hadley–Apennine region, covering much more ground than astronauts could explore on foot.",
        narration:
          "For the first time, humans drove a vehicle on another world.",
        image: "/images/apollo/roverr-apollo15.jpg",
        alt: "Apollo 15 astronaut working beside the Lunar Roving Vehicle",
        credit: "NASA",
      },
    ],

    watch: {
      title: "Lunar Roving Vehicles",
      youtubeId: "",
      blurb: "Explore NASA footage of the Apollo lunar rover missions.",
      links: [
        {
          label: "More videos on the NASA JPL YouTube channel",
          source: "YouTube",
          url: "https://www.youtube.com/@NASAJPL",
        },
      ],
    },

    sources: [
      "NASA — Apollo 15 on the Moon",
      "NASA — Lunar Roving Vehicle facts",
      "NASA — Apollo 16 mission",
      "NASA — Apollo 17 mission",
    ],
  },

  alsep: {
    id: "alsep",
    name: "ALSEP",
    origin: "Apollo lunar surface experiments",
    target: 35,
    signalLine: 	"The instruments went quiet But Their experiments changed lunar science.",
    meet: {
      what: "A collection of scientific instruments left on the Moon.",
      where: "Apollo landing sites.",
      when: "1969–1972.",
      job: "Study the Moon after astronauts returned to Earth.",
      narration:
        "The astronauts left more than footprints behind. They left scientific stations that continued listening to the Moon long after the humans had gone home.",
    },

    evidence: [
      "ALSEP stands for Apollo Lunar Surface Experiments Package.",
      "Apollo 12 was the first mission to deploy an ALSEP station.",
      "Later stations were deployed by Apollo 14, 15, 16 and 17.",
      "Experiments studied moonquakes, magnetic fields, solar wind and the lunar environment.",
      "The network was switched off on 30 September 1977.",
    ],

    narrationEvidence:
      "The instruments were connected to a central station and powered mainly by radioisotope thermoelectric generators. They sent scientific measurements back to Earth.",

    chapters: [
      {
        year: "1977",
        tag: "SILENCE",
        title: "The stations go quiet",
        text:
          "NASA ended operations of the ALSEP network on 30 September 1977. The instruments had spent years sending measurements from the lunar surface. Their hardware remains at the Apollo landing sites.",
        narration:
          "The signals stopped. The instruments stayed.",
        image: "/images/apollo/alsep-apollo14.jpg",
        alt: "Scientific instruments from an Apollo lunar surface experiments package",
        credit: "NASA/JSC",
      },
      {
        year: "1971",
        tag: "MORE EXPERIMENTS",
        title: "The science stations expand",
        text:
          "Apollo 14 and Apollo 15 deployed additional scientific stations. The experiments helped scientists investigate the Moon's interior, surface activity and magnetic environment.",
        narration:
          "Each landing added another listening post to the lunar science network.",
        image: "/images/apollo/alsep-apollo14.jpg",
        alt: "Apollo 14 ALSEP equipment deployed on the Moon",
        credit: "NASA/JSC",
      },
      {
        year: "1969",
        tag: "FIRST ALSEP",
        title: "A laboratory without walls",
        text:
          "Apollo 12 astronauts Alan Bean and Charles Conrad deployed the first ALSEP station. Unlike a short-lived experiment carried home by astronauts, these instruments were designed to keep working after the crew departed.",
        narration:
          "The Moon had a new kind of visitor: a laboratory that could stay behind.",
        image: "/images/apollo/alsep-apollo14.jpg",
        alt: "Apollo lunar surface experiment equipment",
        credit: "NASA/JSC",
      },
    ],

    watch: {
      youtubeId: "",
      links: [
        {
          label: "More videos on the NASA JPL YouTube channel",
          source: "YouTube",
          url: "https://www.youtube.com/@NASAJPL",
        },
      ],
    },

    sources: [
      "NASA — ALSEP history",
      "NASA — Apollo 14 ALSEP Station",
      "NASA — Apollo 12 experiments",
      "NASA — The Apollo Experiment That Keeps on Giving",
    ],
  },

  "surveyor-3": {
    id: "surveyor-3",
    name: "Surveyor 3",
    origin: "NASA robotic lunar lander",
    target: 52,
    signalLine: "Surveyor 3 has been waiting on the Moon since 1967.",
    meet: {
      what: "A robotic spacecraft that made a soft landing on the Moon.",
      where: "Ocean of Storms, Moon.",
      when: "1967–1969.",
      job: "Study lunar soil and test landing technology before human missions.",
      narration:
        "Two years before astronauts visited it, a small robot had already landed here. Then, in 1969, humans came back to meet it.",
    },

    evidence: [
      "Surveyor 3 landed on the Moon in April 1967.",
      "It used a surface sampler to investigate lunar soil.",
      "It transmitted more than 6,000 television images.",
      "Apollo 12 landed about 600 feet away in November 1969.",
      "Astronauts brought its television camera and other parts back to Earth.",
    ],

    narrationEvidence:
      "Surveyor 3 helped NASA understand the lunar surface and prepare for crewed landings. Its meeting with Apollo 12 became a unique moment in space exploration.",

    chapters: [
      {
        year: "1969",
        tag: "A VISIT FROM HUMANS",
        title: "The robot gets visitors",
        text:
          "Apollo 12 landed near Surveyor 3 in November 1969. Astronauts Charles Conrad and Alan Bean walked over to inspect the old spacecraft. They removed its television camera and other components and returned them to Earth for study.",
        narration:
          "A robot that had waited alone for two and a half years was finally visited by humans.",
        image: "/images/apollo/surveyor3-apollo12.jpg",
        alt: "Apollo 12 astronaut examining the Surveyor 3 spacecraft on the Moon",
        credit: "NASA",
      },
      {
        year: "1967",
        tag: "SOFT LANDING",
        title: "A machine reaches the Moon",
        text:
          "Surveyor 3 landed in the Ocean of Storms in April 1967. Its instruments studied the lunar soil and its surroundings, sending images and measurements back to Earth.",
        narration:
          "Before people could walk here, machines had to show that landing was possible.",
        image: "/images/apollo/surveyor33-apollo12.jpg",
        alt: "Surveyor 3 lunar lander photographed during the Apollo 12 visit",
        credit: "NASA",
      },
    ],

    watch: {
      title: "Surveyor 3",
      youtubeId: "",
      blurb: "Explore NASA footage of robotic lunar exploration and the Apollo 12 mission.",
      links: [
        {
          label: "More videos on the NASA JPL YouTube channel",
          source: "YouTube",
          url: "https://www.youtube.com/@NASAJPL",
        },
      ],
    },

    sources: [
      "NASA — Astronauts Pay a Visit to Surveyor 3",
      "NASA — Apollo 12 and Surveyor 3",
      "NASA — Surveyor 3 mission information",
    ],
  },

  kepler: {
    id: "kepler",
    name: "Kepler",
    origin: "Heliocentric orbit",
    target: 25,
    signalLine: "Kepler is no longer collecting data. But its discoveries continue to guide the search for planets beyond our Solar System.",
    meet: {
      what: "A space telescope designed to discover planets orbiting distant stars.",
      where: "An Earth-trailing orbit around the Sun",
      when: "2009–2018",
      job: "To watch stars for tiny changes in brightness that could reveal planets passing in front of them.",
      narration: "Kepler never visited those distant planets. It watched their stars instead. A tiny dip in starlight could mean that a planet had passed by."
    },

    evidence: [
      "Kepler launched on March 7, 2009.",
      "It discovered more than 2,600 confirmed exoplanets during its mission.",
      "It observed more than half a million stars.",
      "NASA retired Kepler on October 30, 2018, after it ran out of fuel."
    ],

    narrationEvidence: "Kepler showed us that planets are not rare exceptions. They are common across our galaxy. Its observations changed how scientists think about other worlds.",

    rewindLine: "It searched the stars. It found thousands of worlds.",

    chapters: [
      {
        year: 2018,
        tag: "MISSION COMPLETE",
        title: "The telescope runs out of fuel",
        text: "After nine years of searching, Kepler ran out of the fuel needed to continue its science observations. NASA retired the spacecraft in its safe orbit. Its data would continue helping scientists make discoveries long after the mission ended.",
        narration: "Kepler could no longer keep searching. But the information it had collected was still waiting to be studied.",
        image: "/images/kepler/kepler-space-telescope.jpg",
        alt: "Artist illustration of the Kepler space telescope",
        credit: "NASA"
      },
      {
        year: 2014,
        tag: "A SECOND CHANCE",
        title: "The mission finds a new way",
        text: "After two of its reaction wheels failed, Kepler could no longer point as precisely as before. Engineers developed a new observing method using sunlight pressure to help stabilize the spacecraft. This became the K2 mission.",
        narration: "Kepler had a problem. But the mission team found a clever way to keep it working and gave the telescope a second life.",
        image: "/images/kepler/kepler-k2.jpg",
        alt: "Kepler space telescope illustration",
        credit: "NASA"
      },
      {
        year: 2009,
        tag: "THE SEARCH BEGINS",
        title: "Watching distant stars",
        text: "Kepler launched with a simple but powerful idea: look at many stars at once and search for tiny, repeating changes in their brightness. Those changes could reveal planets crossing in front of their stars.",
        narration: "Instead of looking for planets directly, Kepler watched for their shadows. A small dip in a star's light could reveal an entire new world.",
        image: "/images/kepler/kepler-launch.jpg",
        alt: "Delta II rocket carrying the Kepler space telescope",
        credit: "NASA"
      }
    ],

    closing: {
      tagline: "A telescope that changed our view of the galaxy",
      question: "What question would you send to another world?",
      sent: "Your question is on its way.",
      narration: "Kepler is no longer collecting data. But its discoveries continue to guide the search for planets beyond our Solar System."
    },

    watch: {
      title: "Kepler",
      youtubeId: "",
      blurb: "Kepler space telescope discoveries and mission overview.",
      links: [
        {
          label: "How Kepler searched for planets",
          source: "NASA",
          url: "https://science.nasa.gov/eclips/videos/kepler/"
        },
        {
          label: "Kepler mission launch",
          source: "NASA",
          url: "https://science.nasa.gov/resource/kepler-misson-launch/"
        },
        {
          label: "Explore the Kepler image gallery",
          source: "NASA",
          url: "https://science.nasa.gov/gallery/kepler-k2/"
        },
        {
          label: "More videos on the NASA JPL YouTube channel",
          source: "YouTube",
          url: "https://www.youtube.com/@NASAJPL"
        }
      ]
    },

    sources: [
      "NASA — Kepler Space Telescope",
      "NASA — Kepler / K2 In Depth",
      "NASA — NASA Retires Kepler Space Telescope"
    ]
  },

  "near-shoemaker": {
    id: "near-shoemaker",
    name: "NEAR Shoemaker",
    origin: "Asteroid Eros",
    target: 78,
    signalLine:	"NEAR reached an asteroid and made an unexpected landing.",
    meet: {
      what: "A robotic spacecraft sent to study and explore the asteroid 433 Eros.",
      where: "Asteroid Eros, in the near-Earth asteroid population",
      when: "1996–2001",
      job: "To study an asteroid's shape, surface, composition, and internal structure.",
      narration: "NEAR travelled millions of kilometres to meet an asteroid. It became the first spacecraft to orbit one. Then it did something nobody had planned for: it landed."
    },

    evidence: [
      "NEAR launched on February 17, 1996.",
      "It entered orbit around Eros on February 14, 2000.",
      "It became the first spacecraft to orbit an asteroid.",
      "It touched down on Eros on February 12, 2001, despite not being designed as a lander.",
      "It continued returning scientific data for about two weeks after landing."
    ],

    narrationEvidence: "The landing was not part of the original spacecraft design. But NEAR survived its gentle touchdown and gave scientists an unexpected opportunity to study an asteroid from its surface.",

    rewindLine: "It was built to orbit an asteroid. It ended up resting on one.",

    chapters: [
      {
        year: 2001,
        tag: "AN UNEXPECTED LANDING",
        title: "The spacecraft touches down",
        text: "On February 12, NEAR Shoemaker gently landed on Eros at around walking speed. The spacecraft had not been designed to land, but it survived. Its instruments continued collecting valuable information from the asteroid's surface.",
        narration: "The spacecraft reached the asteroid. It was supposed to finish its journey in orbit, but it landed safely and kept talking to Earth.",
        image: "/images/near/near-eros-landing.jpg",
        alt: "Surface of asteroid Eros photographed by NEAR Shoemaker",
        credit: "NASA / Johns Hopkins APL"
      },
      {
        year: 2000,
        tag: "FIRST ASTEROID ORBIT",
        title: "A year around Eros",
        text: "NEAR entered orbit around Eros on February 14, 2000. It began mapping the asteroid and studying its surface, composition, and gravity. No spacecraft had ever orbited an asteroid before.",
        narration: "For the first time, a spacecraft was circling an asteroid. Every orbit brought new details about this ancient space rock.",
        image: "/images/near/eros-orbit.jpg",
        alt: "Asteroid Eros photographed by the NEAR Shoemaker spacecraft",
        credit: "NASA / Johns Hopkins APL"
      },
      {
        year: 1997,
        tag: "FIRST ENCOUNTERS",
        title: "A journey through the asteroid belt",
        text: "On June 27, 1997, NEAR flew past asteroid Mathilde. It photographed the asteroid and gathered information before continuing towards its main destination, Eros.",
        narration: "Before reaching Eros, NEAR made an important stop. Its encounter with Mathilde gave scientists another close look at an asteroid.",
        image: "/images/near/mathilde.jpg",
        alt: "Asteroid Mathilde photographed during the NEAR flyby",
        credit: "NASA / Johns Hopkins APL"
      },
      {
        year: 1996,
        tag: "MISSION LAUNCH",
        title: "The journey begins",
        text: "NEAR Shoemaker launched on February 17, 1996, marking the beginning of NASA's Near Earth Asteroid Rendezvous mission to study space rocks up close.",
        narration: "The journey began with a launch toward the unknown, starting a mission to unlock the secrets of asteroids.",
        image: "/images/near/nearlaunch.jpg",
        alt: "Launch of the NEAR Shoemaker spacecraft",
        credit: "NASA"
      }
    ],

    closing: {
      tagline: "A safe touchdown on a world never meant for landing.",
      question: "What secrets do ancient asteroids still hold?",
      sent: "Your question is on its way.",
      narration: "NEAR Shoemaker ended its mission resting on an asteroid, leaving a legacy of firsts in planetary exploration."
    },

    watch: {
      title: "NEAR Shoemaker Landing on Eros",
      youtubeId: "",
      blurb: "Explore NASA footage and historical overviews of the NEAR Shoemaker mission.",
      links: [
        {
          label: "NEAR Shoemaker mission overview",
          source: "NASA",
          url: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1996-008A"
        },
        {
          label: "More videos on the NASA JPL YouTube channel",
          source: "YouTube",
          url: "https://www.youtube.com/@NASAJPL"
        }
      ]
    },

    sources: [
      "NASA — NEAR Shoemaker mission overview",
      "NASA NSSDC Master Catalog — NEAR Shoemaker",
      "Johns Hopkins University Applied Physics Laboratory — NEAR mission"
    ]
  },
"insight": {
  id: "insight",
  name: "InSight",
  origin: "Mars",
  target: 55,
  signalLine: "InSight is silent. But it gave us a new way to listen to Mars.",
  meet: {
    what: "A robotic Mars lander designed to study the planet's deep interior.",
    where: "Elysium Planitia, Mars",
    when: "2018–2022",
    job: "To measure marsquakes, study heat beneath the surface, and investigate the structure of Mars.",
    narration: "Most Mars missions look at the surface. InSight had a different question. What is happening deep beneath the ground?"
  },

  evidence: [
    "InSight launched on May 5, 2018.",
    "It landed on Mars on November 26, 2018.",
    "Its seismometer recorded more than 1,300 marsquakes.",
    "It detected a marsquake caused by a meteorite impact.",
    "NASA declared the mission over in December 2022 after repeated attempts to contact the lander failed."
  ],

  narrationEvidence: "InSight gave scientists their first detailed look at the internal structure of Mars. Its measurements helped reveal information about the planet's crust, mantle, and core.",

  rewindLine: "It could not travel across Mars. It listened to the planet instead.",

  chapters: [
    {
      year: 2022,
      tag: "THE FINAL SIGNAL",
      title: "The lander goes quiet",
      text: "Dust gradually covered InSight's solar panels, reducing the power available to its instruments. After two consecutive unsuccessful communication attempts, NASA announced the mission had ended on December 21, 2022.",
      narration: "The dust kept building up. The lander could no longer make enough power. Eventually, Earth stopped hearing from InSight.",
      image: "/images/insight/insight-final-selfie.jpg",
      alt: "InSight lander covered in dust in its final selfie",
      credit: "NASA / JPL-Caltech"
    },
    {
      year: 2021,
      tag: "LISTENING TO MARS",
      title: "The planet shakes",
      text: "InSight's seismometer recorded hundreds of marsquakes. These vibrations helped scientists investigate what lies beneath the Martian surface. The mission eventually recorded more than 1,300 seismic events.",
      narration: "Mars was not silent. Its ground moved and shook, and InSight was there to measure every vibration it could detect.",
      image: "/images/insight/insight-seismometer.jpg",
      alt: "InSight's seismometer deployed on the Martian surface",
      credit: "NASA / JPL-Caltech"
    },
    {
      year: 2019,
      tag: "A NEW INSTRUMENT",
      title: "Digging into the planet",
      text: "InSight deployed a heat probe nicknamed the Mole. It was designed to dig beneath the surface and measure heat escaping from Mars's interior. The instrument struggled to dig as planned in the unexpected Martian soil.",
      narration: "One instrument tried to burrow into the ground. It faced challenges that engineers had not expected, but the team kept working to understand what was happening.",
      image: "/images/insight/insight-mole.jpg",
      alt: "The InSight lander's heat probe on the Martian surface",
      credit: "NASA / JPL-Caltech"
    },
    {
      year: 2018,
      tag: "LANDING ON MARS",
      title: "A mission built to listen",
      text: "InSight landed on Mars on November 26, 2018. Unlike rovers that travel across the surface, it stayed in one place and deployed instruments to study the planet's interior.",
      narration: "InSight had reached Mars. It would not drive across the landscape. Its job was to stay still, listen, and measure.",
      image: "/images/insight/insight-landing.jpg",
      alt: "Artist illustration of NASA's InSight lander on Mars",
      credit: "NASA / JPL-Caltech"
    }
  ],

  closing: {
    title: "A planet that finally gave up some of its secrets",
    text: "InSight showed us that we do not always need to travel across a world to explore it. Sometimes, we learn the most by staying still and listening carefully."
  },

  watch: {
    youtubeId: "",
    links: [
      {
        label: "More videos on the NASA JPL YouTube channel",
        source: "YouTube",
        url: "https://www.youtube.com/@NASAJPL"
      }
    ]
  },

  sources: [
    "NASA — InSight Mars Lander Mission",
    "NASA — NASA Retires InSight Mars Lander Mission After Years of Science"
  ]
},
};

export const signals = [
  {
    id: "opportunity",
    name: "Opportunity",
    kind: "Mars rover",
    x: 62,
    y: 40,
  },
  {
    id: "apollo-11-eagle",
    name: "Apollo 11 Eagle",
    kind: "Moon lander",
    x: 24,
    y: 58,
  },
  {
    id: "pioneer-10",
    name: "Pioneer 10",
    kind: "Deep-space probe",
    x: 82,
    y: 22,
  },
  {
    id: "near-shoemaker",
    name: "NEAR Shoemaker",
    kind: "Asteroid probe",
    x: 45,
    y: 72,
  },
  {
    id: "kepler",
    name: "Kepler",
    kind: "Space telescope",
    x: 15,
    y: 25,
  },
  {
    id: "insight",
    name: "InSight",
    kind: "Mars lander",
    x: 70,
    y: 66,
  },
  {
    id: "lunar-rovers",
    name: "Lunar Roving Vehicles",
    kind: "Moon rovers",
    x: 30,
    y: 38,
  },
  {
    id: "alsep",
    name: "ALSEP",
    kind: "Science stations",
    x: 18,
    y: 72,
  },
  {
    id: "surveyor-3",
    name: "Surveyor 3",
    kind: "Lunar lander",
    x: 43,
    y: 20,
  },
];
