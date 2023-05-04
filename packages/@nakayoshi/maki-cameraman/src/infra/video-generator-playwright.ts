import path from "node:path";
import { IVideoGenerator } from "../app/video-generator";
import { chromium } from "playwright-core";

type VideoSize = {
  readonly width: number;
  readonly height: number;
};

export class VideoGeneratorPlaywright implements IVideoGenerator {
  constructor(
    private readonly theaterUrl: string,
    private readonly videoDir: string,
    private readonly videoSize: VideoSize
  ) {}

  async generate(type: string, text: string): Promise<string> {
    if (type !== "text") {
      throw new Error(`Type ${type} is not supported`);
    }

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

    const url = this.getUrl(text);
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

  private getUrl(text: string) {
    const url = new URL(this.theaterUrl);
    url.search = new URLSearchParams({
      text,
    }).toString();
    return url.toString();
  }
}
