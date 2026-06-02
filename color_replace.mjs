import fs from "fs";

const filePath = "src/components/BasketballModule.tsx";
let content = fs.readFileSync(filePath, "utf8");

const replacements = [
  { from: /#C0C0C0/gi, to: "#9A6F4A" },
  { from: /#d4af37/gi, to: "#B08A52" },

  { from: /#111111|#111\b/gi, to: "#5A4335" },
  { from: /#050505/gi, to: "#3F2D26" },
  { from: /#0a0a0a|#0a0a09/gi, to: "#382820" },
  { from: /#020202|#080808/gi, to: "#2A1F18" },

  { from: /\bbg-black(\/[0-9]+)?\b/g, to: "bg-[#4C392D]$1" },
  { from: /\btext-black(\/[0-9]+)?\b/g, to: "text-[#4C392D]$1" },
  { from: /\bborder-black(\/[0-9]+)?\b/g, to: "border-[#4C392D]$1" },
  { from: /\bfrom-black(\/[0-9]+)?\b/g, to: "from-[#4C392D]$1" },
  { from: /\bto-black(\/[0-9]+)?\b/g, to: "to-[#4C392D]$1" },
  { from: /\bvia-black(\/[0-9]+)?\b/g, to: "via-[#4C392D]$1" },

  { from: /rgba\(0,0,0,/g, to: "rgba(76,57,45," },

  { from: /\bbg-white(\/[0-9]+)?\b/g, to: "bg-[#E4DCCF]$1" },
  { from: /\btext-white(\/[0-9]+)?\b/g, to: "text-[#E4DCCF]$1" },
  { from: /\bborder-white(\/[0-9]+)?\b/g, to: "border-[#E4DCCF]$1" },
  { from: /\bfrom-white(\/[0-9]+)?\b/g, to: "from-[#E4DCCF]$1" },
  { from: /\bto-white(\/[0-9]+)?\b/g, to: "to-[#E4DCCF]$1" },
  { from: /\bvia-white(\/[0-9]+)?\b/g, to: "via-[#E4DCCF]$1" },

  { from: /rgba\(255,255,255,/g, to: "rgba(228,220,207," },

  { from: /#333333|#333\b/gi, to: "#6A5142" },
  { from: /#222222|#222\b/gi, to: "#5A4335" },
];

for (const rep of replacements) {
  content = content.replace(rep.from, rep.to);
}

fs.writeFileSync(filePath, content, "utf8");
console.log("Colors replaced successfully!");
