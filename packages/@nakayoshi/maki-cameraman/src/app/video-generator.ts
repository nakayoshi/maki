export type RankingItem = {
  readonly title: string;
  readonly description: string;
  readonly imageUrl: string;
  readonly rank: number;
};

export type ScenarioRanking = {
  readonly title: string;
  readonly items: readonly RankingItem[];
};

export interface IVideoGenerator {
  generate(type: "text", text: string): Promise<string>;
  generate(type: "ranking", items: ScenarioRanking): Promise<string>;
}
