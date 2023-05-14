import { IRankingVideoGenerator, RankingItem } from "./video-generator-ranking";
import { ITextVideoGenerator } from "./video-generator-text";
import { IStorage } from "./storage";
import { randomUUID } from "crypto";
import path from "path";
import { ICombineVideoAndAudio } from "./combine-video-and-audio";

export interface CreateVideoOptions {
  readonly audioPath: string;
  readonly outputDir: string;
}

export interface CreateVideoParams {
  readonly type: "TEXT";
  readonly text: string;
}

export interface CreateRankingVideoParams {
  readonly type: "RANKING";
  readonly title: string;
  readonly items: readonly RankingItem[];
}

export class CreateVideo {
  constructor(
    private readonly storage: IStorage,
    private readonly rankingVideoGenerator: IRankingVideoGenerator,
    private readonly textVideoGenerator: ITextVideoGenerator,
    private readonly combineVideoAndAudio: ICombineVideoAndAudio,
    private readonly options: CreateVideoOptions
  ) {}

  async invoke(
    params: CreateVideoParams | CreateRankingVideoParams
  ): Promise<string> {
    if (params.type === "TEXT") {
      const videoFile = await this.textVideoGenerator.generate(params.text);
      const outputPath = path.join(
        this.options.outputDir,
        randomUUID() + ".mp4" // 出力形式はmp4固定にする
      );
      await this.combineVideoAndAudio.combine(
        videoFile,
        this.options.audioPath,
        outputPath
      );
      const file = await this.storage.upload(outputPath);

      return `https://storage.googleapis.com/${file.bucket}/${file.filename}`;
    }

    if (params.type === "RANKING") {
      const videoFile = await this.rankingVideoGenerator.generate({
        title: params.title,
        items: params.items,
      });
      const file = await this.storage.upload(videoFile);

      return `https://storage.googleapis.com/${file.bucket}/${file.filename}`;
    }

    throw new Error(`Unsupported Type`);
  }
}
