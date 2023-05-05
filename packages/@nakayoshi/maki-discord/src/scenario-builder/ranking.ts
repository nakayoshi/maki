import { z } from "zod";

export const RankingItem = z.object({
  rank: z.number().int(),
  title: z.string(),
  description: z.string(),
  imageUrl: z.string().url().default("https://placehold.jp/300x300.png"),
});
export type RankingItem = z.infer<typeof RankingItem>;

export const Scenario = z.array(RankingItem);
export type Scenario = z.infer<typeof Scenario>;
