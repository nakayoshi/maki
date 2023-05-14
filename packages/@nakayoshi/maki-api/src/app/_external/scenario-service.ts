import { z } from "zod";

export const ScenarioRankingItem = z.object({
  rank: z.number().int(),
  name: z.string(),
  description: z.string(),
  imagePrompt: z.string(),
});

export const ScenarioRanking = z.object({
  title: z.string(),
  items: z.array(ScenarioRankingItem),
});

export type ScenarioRankingItem = z.infer<typeof ScenarioRankingItem>;
export type ScenarioRanking = z.infer<typeof ScenarioRanking>;

export interface IScenarioService {
  createScenario(
    type: "ranking",
    prompt: string,
    model?: string
  ): Promise<ScenarioRanking>;
}
