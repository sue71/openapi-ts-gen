import * as fs from "fs";
import * as process from "process";
import * as commander from "commander";
import * as path from "path";
import { Generator } from "../generator";

const pkg = require("../../package.json");

commander
  .version(pkg.version)
  .description("Generate typescript defintions from Swagger file")
  .command("generate <file>")
  .option("--camel-case", "use camel case")
  .option("--dist <path>", "dist directory")
  .option("--operation-dir <path>", "opreations directory")
  .option("--definition-dir <path>", "definitions directory")
  .action((file, options) => {
    try {
      const content = fs.readFileSync(file, "utf-8");
      const generator = new Generator(JSON.parse(content), {
        dist: path.resolve(process.cwd(), options.dist || "./dist"),
        camelCase: !!options.camelCase,
        operationDir: options.operationDir || "operations",
        definitionDir: options.definitionDir || "definitions"
      });
      generator.generate();
    } catch (e) {
      console.error(e);
      process.exit(2);
    }
  });

commander.parse(process.argv);
