import type { Level, LogType } from "./level";
import { ILogger } from "./logger";

export abstract class BaseLogger implements ILogger {
  constructor(private readonly level: Level) {}

  abstract log(type: LogType, message: string, meta: unknown): void;

  debug(message: string, meta?: unknown): void {
    if (this.level.satisfies("debug")) {
      this.log("debug", message, meta);
    }
  }

  info(message: string, meta?: unknown): void {
    if (this.level.satisfies("info")) {
      this.log("info", message, meta);
    }
  }

  warn(message: string, meta?: unknown): void {
    if (this.level.satisfies("warn")) {
      this.log("warn", message, meta);
    }
  }

  error(message: string, meta?: unknown): void {
    if (this.level.satisfies("error")) {
      this.log("error", message, meta);
    }
  }
}
