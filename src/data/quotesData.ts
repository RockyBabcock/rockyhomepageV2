export interface QuoteItem {
  text: string;
  author: string;
  explanation: string;
}

export const quotesData: QuoteItem[] = [
  {
    text: "Chess is the gymnasium of the mind.",
    author: "Blaise Pascal",
    explanation:
      "I like this quote because chess teaches discipline, pattern recognition, and long-term thinking — the same habits I bring into design and technical systems.",
  },
  {
    text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    author: "Will Durant (often attributed to Aristotle)",
    explanation:
      "Consistency beats intensity. Building software, mastering a framework, or designing a system is about showing up and iterating every single day.",
  },
  {
    text: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci",
    explanation:
      "The hardest part of engineering and design is removing the unnecessary. True elegance is found when there is nothing left to take away.",
  },
  {
    text: "The best way to predict the future is to invent it.",
    author: "Alan Kay",
    explanation:
      "We are builders. Instead of waiting for paradigms to shift in Web3 or AI, we have the tools to construct the platforms of tomorrow ourselves.",
  },
  {
    text: "You have power over your mind — not outside events. Realize this, and you will find strength.",
    author: "Marcus Aurelius",
    explanation:
      "A reminder that in complex projects (and life), focus on what you can control: your attitude, your code, and your resilience.",
  },
];
