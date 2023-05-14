import { z } from "zod";

export const ScenarioRanking = z.object({
  title: z.string(),
  items: z.array(
    z.object({
      rank: z.number().int(),
      name: z.string(),
      description: z.string(),
      imagePrompt: z.string(),
    })
  ),
});

export const ScenarioExplanation = z.object({
  title: z.string(),
  scenes: z.array(
    z.object({
      text: z.string(),
      facialExpression: z.union([
        z.literal("angry"),
        z.literal("embarrassed"),
        z.literal("fearful"),
        z.literal("joyful"),
        z.literal("normal"),
        z.literal("thinking"),
      ]),
      imagePrompt: z.string(),
    })
  ),
});

export type ScenarioRanking = z.infer<typeof ScenarioRanking>;
export type ScenarioExplanation = z.infer<typeof ScenarioExplanation>;

export interface IRankingScenarioService {
  createScenario(prompt: string, model?: string): Promise<ScenarioRanking>;
}

export interface IExplanationScenarioService {
  createScenario(prompt: string, model?: string): Promise<ScenarioExplanation>;
}
