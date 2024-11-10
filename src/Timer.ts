import { SECOND } from "./helpers/time";

export type State = "ready" | "running" | "ended";

export interface CallbackParams {}

export interface OnSecondParams extends CallbackParams {
  remaining: number;
}

export interface onFinishParams extends CallbackParams {}

export interface StartOptions {
  onSecond?: (params: OnSecondParams) => void;
  onFinish?: (params: onFinishParams) => void;
}

export interface StopOptions {}

export class Timer {
  private _end: number | undefined;
  private interval: NodeJS.Timeout | undefined;

  private _state: State;

  get state() {
    return this._state;
  }

  get end() {
    return this._end;
  }

  constructor() {
    this._state = "ready";
  }

  public start(
    duration: number,
    { onSecond, onFinish }: StartOptions = {}
  ): void {
    if (this._state !== "ready") {
      throw new Error("Timer is already running");
    }
    this._state = "running";

    this._end = Date.now() + duration;

    this.interval = setInterval(() => {
      const remaining = this.end! - Date.now();
      onSecond?.({ remaining });

      if (remaining <= 0) {
        clearInterval(this.interval);
        this._state = "ended";
        onFinish?.({});
      }
    }, SECOND);
  }

  public stop({}: StopOptions): void {
    clearInterval(this.interval);

    this._state = "ended";
  }

  public reset(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }

    this._state = "ready";
    this._end = undefined;
  }
}
