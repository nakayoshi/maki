import { IVideoGenerator, RankingItem } from "./video-generator";
import { IStorage } from "./storage";

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
    private readonly videoGenerator: IVideoGenerator
  ) {}

  async invoke(
    params: CreateVideoParams | CreateRankingVideoParams
  ): Promise<string> {
    if (params.type === "TEXT") {
      const videoFile = await this.videoGenerator.generate("text", params.text);
      const file = await this.storage.upload(videoFile);

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
