import { IVideoGenerator, RankingItem } from "../app/video-generator";
import { chromium } from "playwright-core";

type VideoSize = {
  readonly width: number;
  readonly height: number;
};

interface ScenarioEventDetail {
  rank: number;
  title: string;
  description: string;
  url: string;
}

export class VideoGeneratorPlaywright implements IVideoGenerator {
  constructor(
    private readonly theaterUrl: string,
    private readonly videoDir: string,
    private readonly videoSize: VideoSize
  ) {}

  async generate(type: "text", text: string): Promise<string>;
  async generate(type: "ranking", items: RankingItem[]): Promise<string>;
  async generate(
    ...args: ["text", string] | ["ranking", RankingItem[]]
  ): Promise<string> {
    const [type, params] = args;

    if (type === "text") {
      const browser = await chromium.launch({ headless: true });

      const page = await browser.newPage({
        recordVideo: {
          dir: this.videoDir,
          size: {
            width: this.videoSize.width,
            height: this.videoSize.height,
          },
        },
      });

      const url = this.getUrl(params);
      await page.goto(url.toString());

      await page.waitForLoadState("networkidle");

      const video = page.video();
      if (video == null) {
        throw new Error("Could not save video");
      }
      const videoPath = await video.path();
      await Promise.allSettled([browser.close(), video.saveAs(videoPath)]);

      return videoPath;
    }

    if (type === "ranking") {
      const browser = await chromium.launch({ headless: true });
      const page = await browser.newPage({
        recordVideo: {
          dir: this.videoDir,
          size: {
            width: this.videoSize.width,
            height: this.videoSize.height,
          },
        },
      });

      await page.setViewportSize({
        width: this.videoSize.width,
        height: this.videoSize.height,
      });

      await page.goto(this.theaterUrl);

      await page.exposeFunction("__cameraman__finish", () => {
        browser.close();
      });

      const detail: ScenarioEventDetail[] = params.map((item) => ({
        rank: item.rank,
        title: item.title,
        description: item.description,
        url: item.imageUrl,
      }));

      // theaterのカスタムイベント`InjectScenario`をdispatchする
      await page.evaluateHandle((detail) => {
        const customEvent = new CustomEvent("InjectScenario", {
          detail,
        });
        window.dispatchEvent(customEvent);
      }, detail);

      await page.waitForLoadState("networkidle");

      const video = page.video();
      if (video == null) {
        throw new Error("Could not save video");
      }

      const videoPath = await video.path();
      await video.saveAs(videoPath);

      return videoPath;
    }

    throw new Error("Not Supported Type");
  }

  private getUrl(text: string) {
    const url = new URL(this.theaterUrl);
    url.search = new URLSearchParams({
      text,
    }).toString();
    return url.toString();
  }
}
