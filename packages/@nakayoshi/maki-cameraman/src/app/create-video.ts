import { IVideoGenerator, RankingItem } from "./video-generator";
import { IStorage } from "./storage";
import { ICombineVideoAndAudio } from "./combine-video-and-audio";
import { randomUUID } from "crypto";
import path from "path";

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
  readonly items: RankingItem[];
}

export class CreateVideo {
  constructor(
    private readonly storage: IStorage,
    private readonly videoGenerator: IVideoGenerator,
    private readonly combineVideoAndAudio: ICombineVideoAndAudio,
    private readonly options: CreateVideoOptions
  ) {}

  async invoke(
    params: CreateVideoParams | CreateRankingVideoParams
  ): Promise<string> {
    if (params.type === "TEXT") {
      const videoFile = await this.videoGenerator.generate("text", params.text);
      const extname = path.extname(videoFile);
      const outputPath = path.join(
        this.options.outputDir,
        randomUUID() + extname
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
      const videoFile = await this.videoGenerator.generate(
        "ranking",
        params.items
      );
      const extname = path.extname(videoFile);
      const outputPath = path.join(
        this.options.outputDir,
        randomUUID() + extname
      );
      await this.combineVideoAndAudio.combine(
        videoFile,
        this.options.audioPath,
        outputPath
      );
      const file = await this.storage.upload(outputPath);

      return `https://storage.googleapis.com/${file.bucket}/${file.filename}`;
    }
    throw new Error(`Unsupported Type`);
  }
}
