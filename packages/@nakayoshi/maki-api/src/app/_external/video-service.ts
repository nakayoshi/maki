export type CreateVideoRankingParams = {
  readonly type: "ranking";
  readonly title: string;
  readonly items: ReadonlyArray<{
    readonly rank: number;
    readonly title: string;
    readonly description: string;
    readonly imageUrl: string;
  }>;
};

export interface IVideoService {
  createVideo(params: CreateVideoRankingParams): Promise<string>;
}
