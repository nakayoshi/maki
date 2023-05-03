import type { HttpFunction } from "@google-cloud/functions-framework";
import { chromium } from "playwright-core";

const THEATER_URL = process.env.THEATER_URL;
if (!THEATER_URL) throw Error("THEATER_URLが読み込めません");

export const main: HttpFunction = async (req, res) => {
  const text = req.query.text;
  if (typeof text !== "string") {
    res.status(404).send("not found");
    return;
  }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const url = new URL(THEATER_URL);
  url.search = new URLSearchParams({
    text,
  }).toString();

  await page.goto(url.toString());

  const receivedTitle = await page.locator("h1").textContent();

  await browser.close();

  if (receivedTitle !== null) {
    console.debug(`[ finished ] query: ${text}`);
    res.send({ result: receivedTitle });
    return;
  }
  res.send({ result: "" });
};
