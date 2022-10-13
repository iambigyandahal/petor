import fs from "fs";
import path from "path";

const fileName = path.resolve(__dirname, "../cli.js");
const data = fs.readFileSync(fileName).toString().split("\n");
data.splice(0, 0, "#!/usr/bin/env node");
const text = data.join("\n");
console.log(text);

try {
  fs.writeFileSync(fileName, text);
} catch(err) {
  console.log("Something went wrong, please reinstall! If error exists contact developer!");
}
