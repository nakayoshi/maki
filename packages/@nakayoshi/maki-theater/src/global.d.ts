import { ScenarioEvent } from "./models/scenarioEvent";

declare global {
  interface WindowEventMap {
    InjectScenario: ScenarioEvent;
  }
}
