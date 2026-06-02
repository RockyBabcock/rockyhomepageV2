import fs from "fs";

const filePath = "src/components/BasketballModule.tsx";
let content = fs.readFileSync(filePath, "utf8");

const replacements = [
  { from: /#9A6F4A/gi, to: "#C0C0C0" },
  { from: /#B08A52/gi, to: "#d4af37" },

  { from: /#3F2D26/gi, to: "#050505" },
  { from: /#382820/gi, to: "#0a0a0a" },
  { from: /#2A1F18/gi, to: "#020202" },
  { from: /#6A5142/gi, to: "#333" },
  { from: /#5A4335/gi, to: "#111" },

  { from: /\bbg-\[#4C392D\](\/[0-9]+)?\b/g, to: "bg-black$1" },
  { from: /\btext-\[#4C392D\](\/[0-9]+)?\b/g, to: "text-black$1" },
  { from: /\bborder-\[#4C392D\](\/[0-9]+)?\b/g, to: "border-black$1" },
  { from: /\bfrom-\[#4C392D\](\/[0-9]+)?\b/g, to: "from-black$1" },
  { from: /\bto-\[#4C392D\](\/[0-9]+)?\b/g, to: "to-black$1" },
  { from: /\bvia-\[#4C392D\](\/[0-9]+)?\b/g, to: "via-black$1" },

  { from: /rgba\(76,57,45,/g, to: "rgba(0,0,0," },

  { from: /\bbg-\[#E4DCCF\](\/[0-9]+)?\b/g, to: "bg-white$1" },
  { from: /\btext-\[#E4DCCF\](\/[0-9]+)?\b/g, to: "text-white$1" },
  { from: /\bborder-\[#E4DCCF\](\/[0-9]+)?\b/g, to: "border-white$1" },
  { from: /\bfrom-\[#E4DCCF\](\/[0-9]+)?\b/g, to: "from-white$1" },
  { from: /\bto-\[#E4DCCF\](\/[0-9]+)?\b/g, to: "to-white$1" },
  { from: /\bvia-\[#E4DCCF\](\/[0-9]+)?\b/g, to: "via-white$1" },

  { from: /"#E4DCCF"/g, to: '"white"' },
  { from: /'#E4DCCF'/g, to: "'white'" },
  { from: /text-\[#E4DCCF\]/g, to: "text-white" },

  { from: /rgba\(228,220,207,/g, to: "rgba(255,255,255," },
];

for (const rep of replacements) {
  content = content.replace(rep.from, rep.to);
}

fs.writeFileSync(filePath, content, "utf8");
console.log("Colors restored successfully!");
