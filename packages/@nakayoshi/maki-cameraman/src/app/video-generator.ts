export type RankingItem = {
  title: string;
  description: string;
  imageUrl: string;
  rank: number;
};

export interface IVideoGenerator {
  generate(type: "text", text: string): Promise<string>;
  generate(type: "ranking", items: RankingItem[]): Promise<string>;
}
