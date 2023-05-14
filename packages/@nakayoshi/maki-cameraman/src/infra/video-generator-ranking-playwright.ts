import path from "node:path";
import ffmpeg from "fluent-ffmpeg";
import crypto from "node:crypto";
import {
  IRankingVideoGenerator,
  ScenarioRanking,
} from "../app/video-generator-ranking";
import { Page, chromium } from "playwright-core";

interface ScenarioEventDetailItems {
  rank: number;
  title: string;
  description: string;
  url?: string;
}

const DURATION = 65;
const FPS = 30;
const HEIGHT = 1080;
const WIDTH = 1920;
const CROP_X = "n*3.5";
const CROP_Y = 0;
const RANKING_SELECTOR = ".ranking";

export class RankingVideoGeneratorPlaywright implements IRankingVideoGenerator {
  constructor(
    private readonly theaterUrl: string,
    private readonly imageDir: string,
    private readonly audioInput: string
  ) {}

  async generate(params: ScenarioRanking): Promise<string> {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(this.theaterUrl);

    await this.dispatchEvent(page, params);
    await page.waitForLoadState("networkidle");
    await this.fitToScreen(page);

    const imagePath = path.join(this.imageDir, crypto.randomUUID() + ".png");
    await page
      .$(RANKING_SELECTOR)
      .then((elm) => elm?.screenshot({ path: imagePath }));
    await browser.close();

    const videoPath = path.join(this.imageDir, crypto.randomUUID() + ".mp4");

    return new Promise((resolve, reject) => {
      ffmpeg()
        .input(imagePath)
        .inputOptions(["-loop 1"])
        .input(this.audioInput)
        .complexFilter([
          {
            filter: "scale",
            inputs: "[0:v]",
            options: {
              w: -1,
              h: HEIGHT,
            },
            outputs: "[scaled]",
          },
          {
            filter: "crop",
            inputs: "[scaled]",
            options: {
              w: WIDTH,
              h: HEIGHT,
              x: CROP_X,
              y: CROP_Y,
            },
            outputs: "[cropped]",
          },
          {
            filter: "format",
            inputs: "[cropped]",
            options: {
              pix_fmts: "yuv420p",
            },
            outputs: "[formatted]",
          },
          {
            filter: "setpts",
            inputs: "[formatted]",
            options: {
              expr: "PTS-STARTPTS",
            },
            outputs: "[setpts]",
          },
          {
            filter: "fade",
            inputs: "[setpts]",
            options: {
              t: "out",
              st: DURATION - 2,
              d: 2,
            },
            outputs: "[vid]",
          },
          {
            filter: "afade",
            inputs: "[1:a]",
            options: {
              t: "out",
              st: DURATION - 2,
              d: 2,
            },
            outputs: "[aud]",
          },
        ])
        .outputOptions([
          "-map [aud]",
          "-map [vid]",
          `-t ${DURATION}`,
          `-r ${FPS}`,
        ])
        .save(videoPath)
        .on("error", (err) => {
          reject(err);
        })
        .on("end", () => {
          console.log("Finished!");
          resolve(videoPath);
        });
    });
  }

  private async dispatchEvent(
    page: Page,
    scenario: ScenarioRanking
  ): Promise<void> {
    const items: ScenarioEventDetailItems[] = scenario.items.map((item) => ({
      rank: item.rank,
      title: item.title,
      description: item.description,
      url: item.imageUrl,
    }));
    const detail = { title: scenario.title, items };

    // theaterのカスタムイベント`InjectScenario`をdispatchする
    await page.evaluateHandle((detail) => {
      const customEvent = new CustomEvent("InjectScenario", {
        detail,
      });
      window.dispatchEvent(customEvent);
    }, detail);
  }

  private async fitToScreen(page: Page): Promise<void> {
    const pageSize = await page.evaluate((selector) => {
      const elm = document.querySelector(selector);

      if (elm == null) {
        throw new Error("Could not find .ranking");
      }

      return {
        height: 1080,
        width: elm.scrollWidth,
      };
    }, RANKING_SELECTOR);
    await page.setViewportSize(pageSize);
  }
}
