import fs from "fs";
import path from "path";

const fileName = path.resolve(__dirname, "../cli.js");
const data = fs.readFileSync(fileName).toString().split("\n");
data.splice(0, 0, "#!/usr/bin/env node");
const text = data.join("\n");
console.log(text);

//fs.writeFile("../cli.js", text, function (err) {
//  if (err) return err;
//});
