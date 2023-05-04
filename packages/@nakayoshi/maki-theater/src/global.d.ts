import { InjectScenarioEvent } from "./models/scenarioEvent";
import { RankingItem } from "./models/data/RankingItem";

declare global {
  interface WindowEventMap {
    InjectScenario: InjectScenarioEvent;
  }

  export const __cameraman__getScenes: (() => RankingItem) | undefined;
  export const __cameraman__finish: (() => void) | undefined;
}
