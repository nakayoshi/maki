import type { HttpFunction } from "@google-cloud/functions-framework";

export const main: HttpFunction = async (_req, res) => {
  res.send("Hello, world!");
};
