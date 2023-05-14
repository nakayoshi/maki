import { IRankingVideoGenerator, RankingItem } from "./video-generator-ranking";
import { IStorage } from "./storage";

export interface CreateRankingVideoParams {
  readonly type: "RANKING";
  readonly title: string;
  readonly items: readonly RankingItem[];
}

export class CreateRankingVideo {
  constructor(
    private readonly storage: IStorage,
    private readonly rankingVideoGenerator: IRankingVideoGenerator
  ) {}

  async invoke(params: CreateRankingVideoParams): Promise<string> {
    const output = await this.rankingVideoGenerator.generate({
      title: params.title,
      items: params.items,
    });

    const file = await this.storage.upload(output);
    return `https://storage.googleapis.com/${file.bucket}/${file.filename}`;
  }
}
