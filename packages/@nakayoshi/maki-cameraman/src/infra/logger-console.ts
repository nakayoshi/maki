/* eslint-disable no-console */
import { BaseLogger, ILogger, Level, LogType } from "../domain/services/logger";

export class LoggerConsoleImpl extends BaseLogger implements ILogger {
  constructor(level: Level) {
    super(level);
  }

  log(type: LogType, message: string, meta: unknown): void {
    switch (type) {
      case "debug": {
        console.debug(message, meta);
        return;
      }
      case "info": {
        console.info(message, meta);
        return;
      }
      case "warn": {
        console.warn(message, meta);
        return;
      }
      case "error": {
        console.error(message, meta);
        return;
      }
    }
  }
}
