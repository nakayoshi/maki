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

export type ExplanationFacialExpression =
  | "angry"
  | "embarrassed"
  | "fearful"
  | "joyful"
  | "normal"
  | "thinking";

export type CreateVideoExplanationParams = {
  readonly type: "explanation";
  readonly title: string;
  readonly scenes: ReadonlyArray<{
    readonly text: string;
    readonly facialExpression: ExplanationFacialExpression;
    readonly imageUrl: string;
  }>;
};

export interface IVideoService {
  createRankingVideo(params: CreateVideoRankingParams): Promise<string>;
  createExplanationVideo(params: CreateVideoExplanationParams): Promise<string>;
}
