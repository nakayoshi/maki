import express from "express";
import { chromium } from "playwright-core";

const THEATER_URL = process.env.THEATER_URL;
if (!THEATER_URL) throw Error("THEATER_URLが読み込めません");

const app = express();
app.get("/", async (req, res) => {
  const text = req.query.text;
  if (typeof text !== "string") {
    res.status(404).send("not found");
    return;
  }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    recordVideo: { dir: "./", size: { width: 1920, height: 1080 } },
  });

  const url = new URL(THEATER_URL);
  url.search = new URLSearchParams({
    text,
  }).toString();

  await page.goto(url.toString());

  // h1要素が表示されるまで待つ
  await page.locator("h1").textContent();

  await browser.close();

  console.debug(`[ finished ] query: ${text}`);
  res.send({ result: await page.video()?.path() });
});

app.listen(3000);
console.debug("started.");
