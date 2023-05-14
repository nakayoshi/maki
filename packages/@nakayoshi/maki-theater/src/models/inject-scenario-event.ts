import { ExplanationScenario, RankingScenario } from "./scenario";

export type InjectRankingScenarioEvent = CustomEvent<RankingScenario>;
export type InjectExplanationScenarioEvent = CustomEvent<ExplanationScenario>;
