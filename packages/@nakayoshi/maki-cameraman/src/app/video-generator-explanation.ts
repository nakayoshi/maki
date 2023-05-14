export type ExplanationFacialExpression =
  | "angry"
  | "embarrassed"
  | "fearful"
  | "joyful"
  | "normal"
  | "thinking";

export type ExplanationScene = {
  readonly text: string;
  readonly imageUrl: string;
  readonly facialExpression: ExplanationFacialExpression;
};

export type ScenarioExplanation = {
  readonly title: string;
  readonly scenes: readonly ExplanationScene[];
};

export interface IExplanationVideoGenerator {
  generate(scenario: ScenarioExplanation): Promise<string>;
}
