export type RankingItem = {
  readonly rank: number;
  readonly title: string;
  readonly description: string;
  readonly imageUrl?: string;
};

export type ScenarioRanking = {
  readonly title: string;
  readonly items: readonly RankingItem[];
};

export interface IRankingVideoGenerator {
  generate(scenario: ScenarioRanking): Promise<string>;
}
