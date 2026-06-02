import fs from "fs";

const filePath = "src/components/BasketballModule.tsx";
let content = fs.readFileSync(filePath, "utf8");

content = content.replace(/"white"/g, '"#E4DCCF"');
content = content.replace(/'white'/g, "'#E4DCCF'");

fs.writeFileSync(filePath, content, "utf8");
console.log("Replaced white correctly");
