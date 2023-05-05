export interface IVideoBuilder {
  buildRanking(keyword: string): Promise<string>;
}
