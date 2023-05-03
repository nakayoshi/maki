import fs from "node:fs";
import path from "node:path";

import {
  extendZodWithOpenApi,
  OpenAPIGenerator,
  OpenAPIRegistry,
} from "@asteasolutions/zod-to-openapi";
import * as glob from "glob";
import { z } from "zod";

// --- 1. Initialize zod ---
extendZodWithOpenApi(z);
const registry = new OpenAPIRegistry();
export { registry };

// --- 2. Load modules ---
const modules = glob.sync(["./components/**/*.js", "./paths/**/*.js"], {
  cwd: __dirname,
  ignore: "**/*.spec.js",
});
for (const module of modules) {
  require(path.join(__dirname, module));
}

// --- 3. Generate document ---
const document = new OpenAPIGenerator(
  registry.definitions,
  "3.0.3"
).generateDocument({
  info: {
    title: "Maki Cameraman API",
    version: JSON.parse(
      fs.readFileSync(path.join(__dirname, "../package.json"), "utf-8")
    ).version,
    description: "Maki Cameraman Public API definition",
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development environment",
    },
  ],
});

// --- 4. Stdout result ---
console.log(JSON.stringify(document, null, 2));
