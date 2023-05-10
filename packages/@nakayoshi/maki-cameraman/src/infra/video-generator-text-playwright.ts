import { chromium } from "playwright-core";
import { ITextVideoGenerator } from "../app/video-generator-text";

type VideoSize = {
  readonly width: number;
  readonly height: number;
};

export class TextVideoGeneratorPlaywright implements ITextVideoGenerator {
  constructor(
    private readonly theaterUrl: string,
    private readonly videoDir: string,
    private readonly videoSize: VideoSize
  ) {}

  async generate(text: string): Promise<string> {
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
