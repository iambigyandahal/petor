import yargs from "yargs";
import fs from "fs";
import path from "path";
import Logger from "./utils/util.logger";

const argv = yargs
  .scriptName("petor")
  .usage("Usage: $0 <command> [options]")
  .options({
    generate: { type: "string", describe: "Generate a template" },
    list: { type: "boolean", describe: "Show the list of available templates" },
  })
  .example("$0 --generate backend restapi", "(Generate a `backend` named template as `restapi`)")
  .version()
  .help()
  .parseSync();

const copyDirectory = (src: string, dest: string) => {
  const filesToCreate = fs.readdirSync(src);
  filesToCreate.forEach((file) => {
    const origFilePath = `${src}/${file}`;
    const stats = fs.statSync(origFilePath);
    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, 'utf8');
      const writePath = `${dest}/${file}`;
      fs.writeFileSync(writePath, contents, 'utf8');
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${dest}/${file}`);
      copyDirectory(`${src}/${file}`, `${dest}/${file}`);
    }
  });
}

const createProject = (templateName: string, projectName: string) => {
  const projectFolder = path.resolve(process.cwd() + "/" + projectName);
  const templateFolder = path.resolve(__dirname, "../../templates/", templateName);
  if (!fs.existsSync(templateFolder)) return Logger.error("No such template. Use `--list` option to see the list of templates.");
  if (fs.existsSync(projectFolder)) {
    return Logger.error("Folder already exists! Move the existing folder somewhere or rename the project to something else.");
  }
  fs.mkdirSync(projectFolder);
  copyDirectory(templateFolder, projectFolder);
  Logger.info(`[Generated] ${argv.generate} has been generated!`);
}

const getDirectories = (dir: string) => {
  return fs.readdirSync(path.resolve(__dirname, dir), { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
};

const main = async () => {
  if((argv.generate || argv.generate === "") && argv.list) {
    return Logger.error("Only one option can be used at a time");
  }

  if (argv.generate || argv.generate === "") {
    if(argv.generate === "") {
      const help = await yargs.getHelp();
      console.log(help, "\n");
      return Logger.error("Missing required option: generate");
    }
    if(argv._.length === 1 && typeof argv._[0] === "string") {
      createProject(argv.generate, argv._[0]);
    } else if(argv._.length === 0) {
      createProject(argv.generate, argv.generate); 
    } else {
      return Logger.error("");
    }
  } else if(argv.list) {
    console.log("List of templates:\n");
    const dirs = getDirectories("../../templates");
    dirs.map((dir, i) => {
      console.log(`${i}) ${dir}`);
    });
  } else {
    const help = await yargs.getHelp();
    console.log(help);
  }
};

main();
