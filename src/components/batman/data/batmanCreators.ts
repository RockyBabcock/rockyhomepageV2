export const batmanCreators = [
  {
    id: "bob-kane",
    name: "Bob Kane",
    role: "Co-Creator, Concept",
    photo:
      "https://images.unsplash.com/photo-1544723795-3cj3j2d0d3d3?q=80&w=200&auto=format&fit=crop", // placeholder noir
    fingerprint: "Classified",
    note: "Focus on the initial visual identity and business execution.",
    connections: ["bill-finger", "jerry-robinson"],
  },
  {
    id: "bill-finger",
    name: "Bill Finger",
    role: "Co-Creator, Writer",
    photo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    fingerprint: "Verified",
    note: "The true architect of the mythos. Gotham, Joker, Batmobile.",
    connections: ["bob-kane", "jerry-robinson"],
  },
  {
    id: "jerry-robinson",
    name: "Jerry Robinson",
    role: "Artist, Joker Concept",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    fingerprint: "Verified",
    note: "Crucial early villain design and artistic dynamism.",
    connections: ["bob-kane", "bill-finger"],
  },
  {
    id: "frank-miller",
    name: "Frank Miller",
    role: "Writer / Artist",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    fingerprint: "Unpredictable",
    note: "Redefined Batman for the modern age as a gritty, uncompromising force.",
    connections: ["klaus-janson"],
  },
  {
    id: "bruce-timm",
    name: "Bruce Timm",
    role: "Animator / Producer",
    photo:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=200&auto=format&fit=crop",
    fingerprint: "Verified",
    note: "Established the definitive visual language of the Animated Series.",
    connections: ["paul-dini"],
  },
  {
    id: "paul-dini",
    name: "Paul Dini",
    role: "Writer",
    photo:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=200&auto=format&fit=crop",
    fingerprint: "Verified",
    note: "Brought unprecedented psychological depth to rogues.",
    connections: ["bruce-timm"],
  },
];
