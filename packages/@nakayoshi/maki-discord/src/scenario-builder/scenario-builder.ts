import { Scenario } from "./ranking";

export interface IScenarioBuilder {
  buildRanking(keyword: string): Promise<Scenario>;
}
