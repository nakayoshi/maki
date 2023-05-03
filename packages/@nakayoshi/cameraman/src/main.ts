import type { HttpFunction } from "@google-cloud/functions-framework";
import { chromium } from "playwright-core";

const THEATER_URL = process.env.THEATER_URL;
if (!THEATER_URL) throw Error("THEATER_URLが読み込めません");

export const main: HttpFunction = async (req, res) => {
  const text = req.query.text;
  if (typeof text !== "string") {
    await res.status(404).send("not found");
    return;
  }

  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const page = await browser.newPage();
  await page.goto(THEATER_URL + `?text=${text}`);

  const receivedTitle = await page.locator("h1").textContent();

  await browser.close();

  if (receivedTitle !== null) {
    console.debug(`[ finished ] query: ${text}`);
    await res.send({ result: receivedTitle });
    return;
  }
  await res.send({ result: "" });
};
