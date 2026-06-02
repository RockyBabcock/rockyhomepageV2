export const TIME_PERIODS = {
  1: "Classical (18th-19th C)",
  2: "Modern (20th C)",
  3: "Information Era (21st C)",
};

export const chessQuotes = [
  {
    id: "q1",
    text: "The pawns are the soul of chess.",
    author: "François-André Danican Philidor",
    category: "Sacrifice",
    period: 1,
    reflection:
      "Every project I make begins as a pawn — a minimum viable prototype that advances step by step.",
    caseLink: "/projects/pawn-mvp",
  },
  {
    id: "q2",
    text: "Sometimes the hardest part of chess is the part where you have to sacrifice.",
    author: "Boris Spassky",
    category: "Sacrifice",
    period: 2,
    reflection:
      "Removing features is harder than adding them. Simplicity requires sacrificing good ideas for edge cases to keep the core strong.",
    caseLink: "/projects/spassky-simplicity",
  },
  {
    id: "q3",
    text: "Tactics is knowing what to do when there is something to do; strategy is knowing what to do when there is nothing to do.",
    author: "Savielly Tartakower",
    category: "Sacrifice",
    period: 2,
    reflection:
      "Design systems are strategy. UI tweaks are tactics. Both are necessary, but systems survive the test of time.",
    caseLink: "/projects/tartakower-system",
  },
  {
    id: "q4",
    text: "Patience is the most valuable trait of the endgame.",
    author: "Jose Raul Capablanca",
    category: "Patience",
    period: 1,
    reflection:
      "Endurance during the last 10% of a project is what separates a good product from a great one.",
    caseLink: "/projects/capa-endurance",
  },
  {
    id: "q5",
    text: "Chess is everything: art, science, and sport.",
    author: "Anatoly Karpov",
    category: "Patience",
    period: 3,
    reflection:
      "Balancing aesthetics, performance, and user experience is a delicate act of multi-disciplinary patience.",
    caseLink: "/projects/karpov-balance",
  },
  {
    id: "q6",
    text: "I spend hours playing chess because I find it so much fun.",
    author: "Magnus Carlsen",
    category: "Patience",
    period: 3,
    reflection:
      "Joy in the process outlasts motivation. I build systems because I genuinely enjoy the puzzle.",
    caseLink: "/projects/carlsen-joy",
  },
  {
    id: "q7",
    text: "The beauty of a move lies not in its appearance but in the thought behind it.",
    author: "Aron Nimzowitsch",
    category: "Endgame",
    period: 2,
    reflection:
      "Architectural purity isn't always flashy to the user, but it ensures the product scales elegantly.",
    caseLink: "/projects/nimzo-architecture",
  },
  {
    id: "q8",
    text: "I don't believe in psychology. I believe in good moves.",
    author: "Bobby Fischer",
    category: "Endgame",
    period: 2,
    reflection:
      "Data and performance metrics speak louder than assumed user personas. Execute cleanly.",
    caseLink: "/projects/fischer-metrics",
  },
  {
    id: "q9",
    text: "The highest art of the chess player lies in not allowing your opponent to show you what he can do.",
    author: "Garry Kasparov",
    category: "Endgame",
    period: 3,
    reflection:
      "Proactive error handling and intuitive UX prevent users from making mistakes in the first place.",
    caseLink: "/projects/kasparov-ux",
  },
];

export const chessPieces = [
  {
    id: "pawn",
    name: "Pawn",
    archetype: "MVP Iteration",
    symbol: "♙",
    monologue: [
      "I am the pawn. I do not retreat.",
      "I move with constraint, but every step matters.",
      "Most systems begin with my discipline, not with brilliance.",
    ],
    proof: {
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop",
      text: "Starting small. The initial MVP was just a single button and a database connection.",
    },
  },
  {
    id: "knight",
    name: "Knight",
    archetype: "Creative Leap",
    symbol: "♘",
    monologue: [
      "I am the knight. My path is nonlinear.",
      "I bypass walls and ignore standard lines.",
      "Breakthroughs happen when you approach the problem from an unexpected angle.",
    ],
    proof: {
      image:
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
      text: "Approaching a complex data viz problem by restructuring the underlying model completely.",
    },
  },
  {
    id: "bishop",
    name: "Bishop",
    archetype: "System Architecture",
    symbol: "♗",
    monologue: [
      "I am the bishop. I see across the entire grid.",
      "But I am bound to my color, my chosen paradigm.",
      "Consistency in architecture is more powerful than localized flexibility.",
    ],
    proof: {
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop",
      text: "Defining a strict separation of concerns where visual and semantic layers never cross boundaries.",
    },
  },
  {
    id: "rook",
    name: "Rook",
    archetype: "Execution & Delivery",
    symbol: "♖",
    monologue: [
      "I am the rook. I wait in the corners.",
      "When the path clears, I strike with absolute force.",
      "True power is deployed in the final stages of a release.",
    ],
    proof: {
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
      text: "The final sprint. Deploying the CI/CD pipeline and massively scaling the infrastructure.",
    },
  },
  {
    id: "queen",
    name: "Queen",
    archetype: "Full-Stack Agility",
    symbol: "♕",
    monologue: [
      "I am the queen. I master every direction.",
      "I synthesize the strengths of the others.",
      "But a system relies on me too much, and the King becomes vulnerable.",
    ],
    proof: {
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600&auto=format&fit=crop",
      text: "Bridging Postgres, GraphQL, and React to build a real-time reactive dashboard.",
    },
  },
  {
    id: "king",
    name: "King",
    archetype: "Product Vision",
    symbol: "♔",
    monologue: [
      "I am the king. I move slow, but I am the reason you play.",
      "If I fall, the system collapses.",
      "Vision is the constraint and the purpose of every action.",
    ],
    proof: {
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop",
      text: "Aligning product roadmap with business objectives to ensure product-market fit.",
    },
  },
];
