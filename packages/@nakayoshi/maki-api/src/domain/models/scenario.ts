import { z } from "zod";

export const RankingItem = z.object({
  rank: z.number().int(),
  title: z.string(),
  description: z.string(),
  imageUrl: z.string().url().default("https://placehold.jp/300x300.png"),
});
export type RankingItem = z.infer<typeof RankingItem>;

export const Ranking = z.array(RankingItem);
export type Ranking = z.infer<typeof Ranking>;

export const Scenario = z.object({
  title: z.string(),
  items: z.array(RankingItem),
});

export type Scenario = z.infer<typeof Scenario>;
