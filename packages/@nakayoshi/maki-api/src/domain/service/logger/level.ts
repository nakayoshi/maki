const LOG_TYPES = Object.freeze({
  DEBUG: 1 << 0,
  INFO: 1 << 1,
  WARN: 1 << 2,
  ERROR: 1 << 3,
});

export type LogType = "debug" | "info" | "warn" | "error";

export class Level {
  private constructor(private readonly level: number) {}

  satisfies(type: LogType): boolean {
    switch (type) {
      case "debug": {
        return Boolean(this.level & LOG_TYPES.DEBUG);
      }
      case "info": {
        return Boolean(this.level & LOG_TYPES.INFO);
      }
      case "warn": {
        return Boolean(this.level & LOG_TYPES.WARN);
      }
      case "error": {
        return Boolean(this.level & LOG_TYPES.ERROR);
      }
    }
  }

  static from(type: LogType): Level {
    switch (type) {
      case "debug": {
        return new Level(
          LOG_TYPES.DEBUG | LOG_TYPES.INFO | LOG_TYPES.WARN | LOG_TYPES.ERROR
        );
      }
      case "info": {
        return new Level(LOG_TYPES.INFO | LOG_TYPES.WARN | LOG_TYPES.ERROR);
      }
      case "warn": {
        return new Level(LOG_TYPES.WARN | LOG_TYPES.ERROR);
      }
      case "error": {
        return new Level(LOG_TYPES.ERROR);
      }
    }
  }
}
