import { MaterialEvent } from "./models/materialEvent";

declare global {
  interface WindowEventMap {
    InjectMaterial: MaterialEvent;
  }
}
