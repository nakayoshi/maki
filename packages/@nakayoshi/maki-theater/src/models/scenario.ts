type RankingItem = {
  rank: number;
  title: string;
  description: string;
  url: string;
};

export type RankingScenario = {
  title: string;
  items: RankingItem[];
};

type ExplanationFacialExpression =
  | "angry"
  | "embarrassed"
  | "fearful"
  | "joyful"
  | "normal"
  | "thinking";

type ExplanationScene = {
  text: string;
  facialExpression: ExplanationFacialExpression;
  imageUrl: string;
};

export type ExplanationScenario = {
  title: string;
  scenes: ExplanationScene[];
};
