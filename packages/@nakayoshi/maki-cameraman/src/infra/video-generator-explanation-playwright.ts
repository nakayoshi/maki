import { Page, chromium } from "playwright-core";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import Ffmpeg from "fluent-ffmpeg";
import {
  IExplanationVideoGenerator,
  ScenarioExplanation,
} from "../app/video-generator-explanation";
import path from "path";
import aspida from "@aspida/fetch";
import api from "./generated/voicevox-engine/$api";

const zip = <T, U>(a: readonly T[], b: readonly U[]): readonly [T, U][] => {
  return a.map((e, i) => [e, b[i]]);
};

export class ExplanationVideoGeneratorPlaywright
  implements IExplanationVideoGenerator
{
  private readonly voicevoxEngine: ReturnType<typeof api>;

  constructor(
    private readonly theaterUrl: string,
    private readonly voicevoxEngineUrl: string,
    private readonly imageDir: string
  ) {
    this.voicevoxEngine = api(
      aspida(fetch, { baseURL: this.voicevoxEngineUrl })
    ) as ReturnType<typeof api>;
  }

  async generate(scenario: ScenarioExplanation): Promise<string> {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(this.theaterUrl);

    await this.dispatchEvent(page, scenario);
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForLoadState("networkidle");

    const elements = await page.$$("*[data-screen-index]");
    const imageFiles = [];
    for (const element of elements) {
      const imagePath = path.join(this.imageDir, crypto.randomUUID() + ".png");
      await element.scrollIntoViewIfNeeded();
      await element.screenshot({ path: imagePath });
      imageFiles.push(imagePath);
    }
    await browser.close();

    const audioQueries = await Promise.all(
      scenario.scenes.map((scene) =>
        this.voicevoxEngine.audio_query.$post({
          query: {
            text: scene.text,
            speaker: 1,
          },
        })
      )
    );

    const audioFiles = await Promise.all(
      audioQueries.map(async (audioQuery) => {
        const blob = await this.voicevoxEngine.synthesis.$post({
          query: {
            speaker: 1,
          },
          body: audioQuery,
        });

        const audioPath = path.join(
          this.imageDir,
          crypto.randomUUID() + ".wav"
        );

        await fs.writeFile(audioPath, Buffer.from(await blob.arrayBuffer()));
        return audioPath;
      })
    );

    const videoFile = path.join(this.imageDir, crypto.randomUUID() + ".mp4");
    const files = zip(imageFiles, audioFiles);
    const complexFilter: Ffmpeg.FilterSpecification[] = [];
    const ffmpeg = Ffmpeg();

    for (const [index, file] of Object.entries(files)) {
      ffmpeg.addInput(file[0]);

      complexFilter.push({
        filter: "loop",
        options: {
          loop: 1,
          size: 1,
        },
        outputs: `[im${index}]`,
      });

      ffmpeg.addInput(file[1]);
    }

    return await new Promise((resolve, reject) => {
      ffmpeg
        .outputOptions([
          "-c:v libx264",
          "-c:a aac",
          // 静止画像の動画化に最適化
          "-tune stillimage",
          "-pix_fmt yuv420p",
        ])
        .complexFilter([
          ...complexFilter,
          {
            filter: "concat",
            inputs: files.flatMap((_, index) => [
              `[im${index}]`,
              // マシにしたい
              `[${index * 2 + 1}:a]`,
            ]),
            options: {
              n: files.length,
              v: "1",
              a: "1",
            },
          },
        ])
        .save(videoFile)
        .on("error", (err) => {
          reject(err);
        })
        .on("progress", (progress) => {
          console.log(progress);
        })
        .on("end", () => {
          console.log("Finished!");
          resolve(videoFile);
        });
    });
  }

  private async dispatchEvent(
    page: Page,
    scenario: ScenarioExplanation
  ): Promise<void> {
    const detail = { title: scenario.title, scenes: scenario.scenes };

    // theaterのカスタムイベント`InjectScenario`をdispatchする
    await page.evaluateHandle((detail) => {
      const customEvent = new CustomEvent("InjectExplanationScenario", {
        detail,
      });
      window.dispatchEvent(customEvent);
    }, detail);
  }
}
