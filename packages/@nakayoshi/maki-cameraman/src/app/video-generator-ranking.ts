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

export interface IRankingVideoGenerator {
  generate(scenario: ScenarioRanking): Promise<string>;
}
