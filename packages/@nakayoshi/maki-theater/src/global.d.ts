import { InjectScenarioEvent } from "./models/scenarioEvent";

declare global {
  interface WindowEventMap {
    InjectScenario: InjectScenarioEvent;
  }
}
