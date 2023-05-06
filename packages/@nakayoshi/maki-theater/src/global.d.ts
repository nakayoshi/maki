import { InjectScenarioEvent } from "./models/inject-scenario-event";
import { RankingItem } from "./models/scenario";

declare global {
  interface WindowEventMap {
    InjectScenario: InjectScenarioEvent;
  }

  export const __cameraman__getScenes: (() => RankingItem) | undefined;
  export const __cameraman__finish: (() => void) | undefined;
}
