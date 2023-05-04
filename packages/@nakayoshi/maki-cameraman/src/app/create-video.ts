import { IVideoGenerator, RankingItem } from "./video-generator";
import { IStorage } from "./storage";
import { CombineVideoAndAudio } from "./combine-video-and-audio";
import { randomUUID } from "crypto";
import path from "path";

export interface CreateVideoParams {
  readonly type: "TEXT";
  readonly text: string;
  readonly audioPath: string;
  readonly outputDir: string;
}

export interface CreateRankingVideoParams {
  readonly type: "RANKING";
  readonly items: RankingItem[];
}

export class CreateVideo {
  constructor(
    private readonly storage: IStorage,
    private readonly videoGenerator: IVideoGenerator,
    private readonly combineVideoAndAudio: CombineVideoAndAudio
  ) {}

  async invoke(
    params: CreateVideoParams | CreateRankingVideoParams
  ): Promise<string> {
    if (params.type === "TEXT") {
      const videoFile = await this.videoGenerator.generate("text", params.text);
      const extname = path.extname(videoFile);
      const outputPath = path.join(params.outputDir, randomUUID() + extname);
      await this.combineVideoAndAudio.combine(
        videoFile,
        params.audioPath,
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
      const file = await this.storage.upload(videoFile);

      return `https://storage.googleapis.com/${file.bucket}/${file.filename}`;
    }
    throw new Error(`Unsupported Type`);
  }
}
