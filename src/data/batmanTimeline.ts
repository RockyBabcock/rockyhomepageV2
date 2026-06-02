export interface TimelineEntry {
  year: number;
  title: string;
  actor: string;
  director: string;
  era: string;
  silhouette: string;
  crimeRating: number;
  quote: string;
  suitAnalysis: string;
  villain: string;
  trivia?: string;
  genre?: string;
  comicComparison?: string;
}

export const timelineData: TimelineEntry[] = [
  // Golden Age (1943–1968)
  {
    year: 1943,
    title: "Batman (Serial)",
    actor: "Lewis Wilson",
    director: "Lambert Hillyer",
    era: "Golden Age",
    silhouette: "floppy-ears",
    crimeRating: 4,
    quote: "This is the Batman!",
    suitAnalysis:
      "First live-action suit. Very loose fitting, floppy ears, large utility belt.",
    villain: "Dr. Daka",
    genre: "Action/Adventure",
    trivia: "Introduced the Bat's Cave and a thin Alfred Pennyworth.",
    comicComparison: "Very loose adaptation of early Detective Comics.",
  },
  {
    year: 1949,
    title: "Batman and Robin (Serial)",
    actor: "Robert Lowery",
    director: "Spencer Gordon Bennet",
    era: "Golden Age",
    silhouette: "floppy-ears-2",
    crimeRating: 4,
    quote: "To the Batmobile!",
    suitAnalysis:
      "Similar to the 1943 suit but with a slightly better fitting cowl.",
    villain: "The Wizard",
    genre: "Action/Adventure",
    trivia: "Vicki Vale's first on-screen appearance.",
    comicComparison: "Continues the pulp-style adventures.",
  },
  {
    year: 1966,
    title: "Batman (TV Series)",
    actor: "Adam West",
    director: "Various",
    era: "Golden Age",
    silhouette: "long-ears-campy",
    crimeRating: 2,
    quote: "To the Batpoles!",
    suitAnalysis:
      "Bright blue and grey spandex, drawn-on eyebrows on the cowl.",
    villain: "Joker, Penguin, Riddler, Catwoman",
    genre: "Camp/Comedy",
    trivia: "The show aired twice a week with cliffhanger endings.",
    comicComparison: "Embraced the colorful, silly tone of Silver Age comics.",
  },
  {
    year: 1966,
    title: "Batman: The Movie",
    actor: "Adam West",
    director: "Leslie H. Martinson",
    era: "Golden Age",
    silhouette: "long-ears-campy",
    crimeRating: 3,
    quote: "Some days you just can't get rid of a bomb!",
    suitAnalysis:
      "Spandex and drawn-on eyebrows. Utility belt features Shark Repellent Bat-Spray.",
    villain: "The United Underworld",
    genre: "Camp/Comedy",
    trivia: "First full-length theatrical Batman movie.",
    comicComparison: "A feature-length extension of the Silver Age TV show.",
  },

  // Dark Renaissance (1989–1997)
  {
    year: 1989,
    title: "Batman",
    actor: "Michael Keaton",
    director: "Tim Burton",
    era: "Dark Renaissance",
    silhouette: "short-ears-armored",
    crimeRating: 7,
    quote: "I'm Batman.",
    suitAnalysis:
      "Molded rubber muscle suit, unable to turn head. Iconic yellow oval emblem.",
    villain: "The Joker",
    genre: "Gothic Superhero",
    trivia: "Michael Keaton's casting caused massive fan backlash initially.",
    comicComparison:
      "Heavily influenced by The Dark Knight Returns and The Killing Joke.",
  },
  {
    year: 1992,
    title: "Batman Returns",
    actor: "Michael Keaton",
    director: "Tim Burton",
    era: "Dark Renaissance",
    silhouette: "sleek-armor",
    crimeRating: 8,
    quote: "Mistletoe can be deadly if you eat it.",
    suitAnalysis:
      "More streamlined, art-deco inspired armor. Cowl still restricts movement.",
    villain: "Penguin, Catwoman, Max Shreck",
    genre: "Gothic Fairy Tale",
    trivia:
      "McDonald's canceled their Happy Meal tie-in because the film was too dark.",
    comicComparison:
      "Burton's original vision took precedence over comic accuracy.",
  },
  {
    year: 1995,
    title: "Batman Forever",
    actor: "Val Kilmer",
    director: "Joel Schumacher",
    era: "Dark Renaissance",
    silhouette: "nipple-suit",
    crimeRating: 6,
    quote: "I'll get drive-thru.",
    suitAnalysis:
      "Introduction of the infamous 'Bat-nipples' and anatomical sculpting. Sonar suit later.",
    villain: "Two-Face, The Riddler",
    genre: "Neon Action",
    trivia:
      "Val Kilmer took the role without reading the script or knowing who the director was.",
    comicComparison:
      "A shift back towards the colorful, campy tone of the Silver Age.",
  },
  {
    year: 1997,
    title: "Batman & Robin",
    actor: "George Clooney",
    director: "Joel Schumacher",
    era: "Dark Renaissance",
    silhouette: "ice-armor",
    crimeRating: 5,
    quote: "Hi Freeze. I'm Batman.",
    suitAnalysis:
      "Silver-accented 'ice' armor for the finale. More prominent anatomical details.",
    villain: "Mr. Freeze, Poison Ivy, Bane",
    genre: "Camp/Action",
    trivia:
      "George Clooney has famously apologized for 'destroying' the franchise.",
    comicComparison: "A live-action cartoon, heavily merchandised.",
  },

  // Animated (1993–2023)
  {
    year: 1993,
    title: "Batman: Mask of the Phantasm",
    actor: "Kevin Conroy (Voice)",
    director: "Eric Radomski, Bruce Timm",
    era: "Animated",
    silhouette: "animated-classic",
    crimeRating: 7,
    quote: "I didn't count on being happy.",
    suitAnalysis:
      "Classic grey and blue/black with the yellow oval. Bold, angular Bruce Timm design.",
    villain: "The Phantasm, The Joker",
    genre: "Animated Noir",
    trivia:
      "Originally planned as a direct-to-video release before getting a theatrical run.",
    comicComparison:
      "Considered by many the truest adaptation of the comic book mythos.",
  },
  {
    year: 1998,
    title: "Batman & Mr. Freeze: SubZero",
    actor: "Kevin Conroy (Voice)",
    director: "Boyd Kirkland",
    era: "Animated",
    silhouette: "animated-classic",
    crimeRating: 6,
    quote: "Leave her alone, Freeze!",
    suitAnalysis: "Same as BTAS, classic animated design.",
    villain: "Mr. Freeze",
    genre: "Animated Action",
    trivia:
      "Release was delayed due to the poor reception of the live-action Batman & Robin.",
    comicComparison:
      "Continues the tragic arc of Mr. Freeze established in 'Heart of Ice'.",
  },
  {
    year: 1999,
    title: "Batman Beyond (TV Series)",
    actor: "Will Friedle, Kevin Conroy",
    director: "Various",
    era: "Animated",
    silhouette: "beyond-suit",
    crimeRating: 8,
    quote: "Schway.",
    suitAnalysis:
      "High-tech, sleek black suit with a red bat emblem. Full face covering.",
    villain: "Blight, Inque, Derek Powers",
    genre: "Cyberpunk/Sci-Fi",
    trivia: "Created because executives wanted a 'teenage Batman'.",
    comicComparison:
      "Original concept, later integrated into the main DC comic continuity.",
  },
  {
    year: 2000,
    title: "Batman Beyond: Return of the Joker",
    actor: "Will Friedle (Voice)",
    director: "Curt Geda",
    era: "Animated",
    silhouette: "beyond-suit",
    crimeRating: 9,
    quote: "If you don't like the movie, I've got slides.",
    suitAnalysis: "The futuristic Beyond suit.",
    villain: "The Joker",
    genre: "Animated Thriller",
    trivia: "Heavily edited for violence before its initial release.",
    comicComparison: "Explores the dark legacy of the Joker.",
  },
  {
    year: 2004,
    title: "The Batman (TV Series)",
    actor: "Rino Romano (Voice)",
    director: "Various",
    era: "Animated",
    silhouette: "animated-modern",
    crimeRating: 6,
    quote: "I am the Batman.",
    suitAnalysis:
      "Shorter ears, wider chest emblem, more stylized and angular.",
    villain: "Various",
    genre: "Animated Action",
    trivia:
      "Features completely redesigned, unconventional takes on classic villains.",
    comicComparison: "A fresh, younger take on the mythos.",
  },
  {
    year: 2008,
    title: "Batman: The Brave and the Bold",
    actor: "Diedrich Bader (Voice)",
    director: "Various",
    era: "Animated",
    silhouette: "brave-bold",
    crimeRating: 3,
    quote: "The hammer of justice is unisex!",
    suitAnalysis:
      "Classic Silver Age blue and grey with a very blocky, heroic build.",
    villain: "Various",
    genre: "Animated Action/Comedy",
    trivia: "Focuses on team-ups with lesser-known DC heroes.",
    comicComparison: "A love letter to the Silver Age of comics.",
  },
  {
    year: 2010,
    title: "Batman: Under the Red Hood",
    actor: "Bruce Greenwood (Voice)",
    director: "Brandon Vietti",
    era: "Animated",
    silhouette: "animated-modern",
    crimeRating: 9,
    quote: "I'm doing what you won't, I'm taking them out!",
    suitAnalysis: "Modern comic-accurate suit, grey and black.",
    villain: "Red Hood, The Joker, Black Mask",
    genre: "Animated Thriller",
    trivia:
      "Adapts the 'A Death in the Family' and 'Under the Hood' storylines.",
    comicComparison: "Very faithful adaptation of the comic arcs.",
  },
  {
    year: 2012,
    title: "Batman: The Dark Knight Returns",
    actor: "Peter Weller (Voice)",
    director: "Jay Oliva",
    era: "Animated",
    silhouette: "tank-batman",
    crimeRating: 10,
    quote:
      "This isn't a mudhole... It's an operating table. And I'm the surgeon.",
    suitAnalysis:
      "Massive, bulky frame. Short ears, large bat symbol. Later uses heavy power armor.",
    villain: "Mutant Leader, The Joker, Superman",
    genre: "Animated Action/Drama",
    trivia: "Released in two parts due to the length of the graphic novel.",
    comicComparison: "Direct adaptation of Frank Miller's seminal work.",
  },
  {
    year: 2016,
    title: "Batman: The Killing Joke",
    actor: "Kevin Conroy (Voice)",
    director: "Sam Liu",
    era: "Animated",
    silhouette: "animated-modern",
    crimeRating: 9,
    quote: "All it takes is one bad day.",
    suitAnalysis: "Classic modern suit.",
    villain: "The Joker",
    genre: "Animated Psychological Thriller",
    trivia: "First DC animated film to receive an R rating.",
    comicComparison:
      "Adapts Alan Moore's famous graphic novel, adding a controversial prologue.",
  },
  {
    year: 2017,
    title: "The Lego Batman Movie",
    actor: "Will Arnett (Voice)",
    director: "Chris McKay",
    era: "Animated",
    silhouette: "lego-batman",
    crimeRating: 2,
    quote: "I only work in black. And sometimes, very, very dark grey.",
    suitAnalysis: "A literal Lego minifigure. Black suit, yellow belt.",
    villain: "The Joker",
    genre: "Animated Comedy",
    trivia: "Features references to almost every previous iteration of Batman.",
    comicComparison:
      "A parody that deeply understands the core of the character.",
  },

  // Nolan Trilogy (2005–2012)
  {
    year: 2005,
    title: "Batman Begins",
    actor: "Christian Bale",
    director: "Christopher Nolan",
    era: "Nolan Trilogy",
    silhouette: "tactical-armor",
    crimeRating: 8,
    quote: "Why do we fall? So we can learn to pick ourselves up.",
    suitAnalysis:
      "Nomex survival suit, memory cloth cape. First truly tactical approach.",
    villain: "Ra's al Ghul, Scarecrow",
    genre: "Action/Thriller",
    trivia:
      "Christian Bale gained 100 lbs of muscle after The Machinist for the role.",
    comicComparison: "Heavily inspired by Batman: Year One.",
  },
  {
    year: 2008,
    title: "The Dark Knight",
    actor: "Christian Bale",
    director: "Christopher Nolan",
    era: "Nolan Trilogy",
    silhouette: "tactical-upgraded",
    crimeRating: 10,
    quote: "I believe in Harvey Dent.",
    suitAnalysis:
      "Titanium-dipped tri-weave armor, separated cowl allowing head movement. Sonar lenses.",
    villain: "The Joker, Two-Face",
    genre: "Crime Thriller",
    trivia:
      "First major motion picture to be partially shot with IMAX cameras.",
    comicComparison: "Draws from The Long Halloween and The Killing Joke.",
  },
  {
    year: 2012,
    title: "The Dark Knight Rises",
    actor: "Christian Bale",
    director: "Christopher Nolan",
    era: "Nolan Trilogy",
    silhouette: "tactical-upgraded",
    crimeRating: 9,
    quote: "A hero can be anyone.",
    suitAnalysis:
      "Same suit as TDK, but shows wear and tear. Braces added to support his knee.",
    villain: "Bane, Talia al Ghul",
    genre: "Epic Action/Thriller",
    trivia:
      "Tom Hardy wore three-inch lifts to appear taller than Christian Bale.",
    comicComparison:
      "Inspired by Knightfall, The Dark Knight Returns, and No Man's Land.",
  },

  // DCEU (2016–2023)
  {
    year: 2016,
    title: "Batman v Superman: Dawn of Justice",
    actor: "Ben Affleck",
    director: "Zack Snyder",
    era: "DCEU",
    silhouette: "bulky-brawler",
    crimeRating: 8,
    quote: "Tell me, do you bleed? You will.",
    suitAnalysis:
      "Fabric-based suit over massive muscle padding. Short ears, huge bat symbol. Heavy mech suit for the fight.",
    villain: "Lex Luthor, Doomsday",
    genre: "Superhero Epic",
    trivia:
      "Ben Affleck's Batman is older, more cynical, and operates out of a glass house rather than Wayne Manor.",
    comicComparison:
      "Visually identical to Frank Miller's The Dark Knight Returns.",
  },
  {
    year: 2016,
    title: "Suicide Squad",
    actor: "Ben Affleck",
    director: "David Ayer",
    era: "DCEU",
    silhouette: "bulky-brawler",
    crimeRating: 9,
    quote:
      "I'm not gonna kill ya. I'm just gonna hurt ya... really, really bad.",
    suitAnalysis: "Same suit as BvS, seen briefly in flashbacks.",
    villain: "Enchantress, The Joker",
    genre: "Action/Anti-hero",
    trivia:
      "Batman appears only in brief cameos capturing Deadshot and Harley Quinn.",
    comicComparison: "Establishes Batman's history with his rogues gallery.",
  },
  {
    year: 2017,
    title: "Justice League",
    actor: "Ben Affleck",
    director: "Zack Snyder / Joss Whedon",
    era: "DCEU",
    silhouette: "tactical-goggles",
    crimeRating: 7,
    quote: "I'm rich.",
    suitAnalysis: "Upgraded tactical suit with armor plating and goggles.",
    villain: "Steppenwolf",
    genre: "Superhero Team-up",
    trivia:
      "The film underwent massive reshoots, changing Batman's tone significantly.",
    comicComparison: "Standard Justice League team dynamic.",
  },
  {
    year: 2021,
    title: "Zack Snyder's Justice League",
    actor: "Ben Affleck",
    director: "Zack Snyder",
    era: "DCEU",
    silhouette: "tactical-goggles",
    crimeRating: 8,
    quote: "Faith, Alfred! Faith!",
    suitAnalysis:
      "Same tactical suit, but presented in a darker, more consistent visual tone.",
    villain: "Steppenwolf, Darkseid",
    genre: "Superhero Epic",
    trivia: "The 4-hour director's cut released after a massive fan campaign.",
    comicComparison: "More aligned with Snyder's original dark vision.",
  },
  {
    year: 2023,
    title: "The Flash",
    actor: "Ben Affleck / Michael Keaton",
    director: "Andy Muschietti",
    era: "DCEU",
    silhouette: "multiverse-suits",
    crimeRating: 6,
    quote: "You wanna get nuts? Let's get nuts.",
    suitAnalysis:
      "Features both Affleck's blue/grey suit and Keaton's upgraded modern armor.",
    villain: "General Zod, Dark Flash",
    genre: "Sci-Fi/Action",
    trivia: "Brought back Michael Keaton as Batman after 31 years.",
    comicComparison: "Loosely based on the Flashpoint storyline.",
  },

  // Reeves Era (2022–Present)
  {
    year: 2022,
    title: "The Batman",
    actor: "Robert Pattinson",
    director: "Matt Reeves",
    era: "Reeves Era",
    silhouette: "padded-grunge",
    crimeRating: 9,
    quote: "I'm vengeance.",
    suitAnalysis:
      "Hand-crafted tactical gear, chest emblem acts as a tactical knife. Heavy collar.",
    villain: "The Riddler, Penguin, Carmine Falcone",
    genre: "Detective Noir",
    trivia: "The Batmobile is a modified muscle car rather than a tank.",
    comicComparison:
      "Inspired by Batman: Ego, Year One, and The Long Halloween.",
  },
  {
    year: 2024,
    title: "The Penguin (TV Series)",
    actor: "Robert Pattinson (Cameo/Implied)",
    director: "Craig Zobel (Lead)",
    era: "Reeves Era",
    silhouette: "shadows",
    crimeRating: 10,
    quote: "The city is underwater.",
    suitAnalysis:
      "Batman's presence is felt more than seen in the aftermath of the flood.",
    villain: "The Penguin, Sofia Falcone",
    genre: "Crime Drama",
    trivia: "Focuses entirely on the criminal underworld's power vacuum.",
    comicComparison: "Expands the gritty, grounded world of Reeves' Gotham.",
  },
  {
    year: 2026,
    title: "The Batman Part II",
    actor: "Robert Pattinson",
    director: "Matt Reeves",
    era: "Reeves Era",
    silhouette: "padded-grunge",
    crimeRating: 9,
    quote: "TBD",
    suitAnalysis: "Expected to be an evolution of the Year Two suit.",
    villain: "TBD (Rumored: Joker, Hush)",
    genre: "Detective Noir",
    trivia: "Highly anticipated sequel continuing the epic crime saga.",
    comicComparison: "Expected to delve deeper into Gotham's corruption.",
  },
];
