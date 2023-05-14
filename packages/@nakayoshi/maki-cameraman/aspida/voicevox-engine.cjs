/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("node:path");

// Borrowed from https://github.com/aspida/openapi2aspida
module.exports = {
  input: "./src/infra/generated/voicevox-engine",
  outputEachDir: false,
  openapi: {
    inputFile: path.join(__dirname, "./voicevox-engine.json"),
  },
};
