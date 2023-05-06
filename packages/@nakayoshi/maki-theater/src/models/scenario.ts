export type RankingItem = {
  readonly rank: number;
  readonly title: string;
  readonly description: string;
  readonly url: string;
};

export type Scenario = {
  readonly title: string;
  readonly items: readonly RankingItem[];
};
