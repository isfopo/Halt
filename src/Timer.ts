import { SECOND } from "./helpers/time";

export type State = "ready" | "running" | "ended";

export interface CallbackParams {}

export interface OnSecondParams extends CallbackParams {
  remaining: number;
}

export interface onFinishParams extends CallbackParams {}

export interface StartOptions {
  /**
   * A callback function that will be invoked every second with the remaining time.
   *
   * This optional property can be provided in the `StartOptions` parameter when starting the timer.
   * The callback receives an object of type `OnSecondParams`, which includes the remaining time in milliseconds.
   * This allows the user to perform actions or updates based on the countdown progression.
   */
  onSecond?: (params: OnSecondParams) => void;
  /**
   * A callback function that will be invoked when the timer reaches zero.
   *
   * This optional property can be provided in the `StartOptions` parameter when starting the timer.
   * The callback receives an object of type `onFinishParams`, which can be used to perform actions
   * or updates once the countdown has completed. This allows users to handle any necessary logic
   * after the timer ends, such as notifying the user or triggering other events.
   */
  onFinish?: (params: onFinishParams) => void;
}

export interface StopOptions {}

export class Timer {
  private _end: number | undefined;
  private interval: NodeJS.Timeout | undefined;

  private _state: State;

  /**
   * Retrieves the current state of the timer.
   *
   * This getter method allows users to access the current state of the timer, which can be
   * one of the following: "ready", "running", or "ended". This can be useful for checking
   * the timer's status before attempting to start, stop, or reset it, ensuring that the
   * user can handle the timer's behavior appropriately based on its state.
   *
   * @returns {State} The current state of the timer.
   */
  get state(): State {
    return this._state;
  }

  /**
   * Retrieves the end time of the timer.
   *
   * This getter method provides access to the end time of the timer, which is the
   * moment when the countdown will finish. If the timer has not been started yet,
   * this value will be `undefined`. This can be useful for determining how much
   * time is left in the countdown or for any other calculations that require the
   * end time of the timer.
   *
   * @returns {number | undefined} The end time of the timer in milliseconds since the
   * epoch, or `undefined` if the timer has not been started.
   */
  get end(): number | undefined {
    return this._end;
  }

  constructor() {
    this._state = "ready";
  }

  /**
   * Starts the timer for the specified duration.
   *
   * This method initiates a countdown timer that runs for the given `duration` in milliseconds.
   * If the timer is already running, an error will be thrown. The state of the timer will be changed
   * to "running". The method accepts optional callback functions: `onSecond`, which is called every
   * second with the remaining time, and `onFinish`, which is called when the timer reaches zero.
   *
   * @param duration - The duration for the timer in milliseconds.
   * @param options - An optional object containing callback functions:
   *      - `onSecond`: A callback that will be invoked every second with an object containing the remaining time.
   *      - `onFinish`: A callback that will be invoked once the timer ends.
   *
   * @throws {Error} If the timer is already running when this method is called.
   */
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

  /**
   * Stops the timer and marks its state as "ended".
   *
   * This method clears the ongoing interval, effectively stopping the countdown.
   * It updates the state of the timer to indicate that it has ended.
   * After calling this method, the timer can be reset or started again.
   *
   * @param options - An optional object; currently unused.
   */
  public stop({}: StopOptions): void {
    clearInterval(this.interval);

    this._state = "ended";
  }

  /**
   * Resets the timer to its initial state.
   *
   * This method stops any ongoing countdown by clearing the interval if it's currently running.
   * It updates the state of the timer to "ready" and clears the end time, allowing the timer
   * to be started anew. After this method is called, the timer can be restarted with a new duration.
   */
  public reset(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }

    this._state = "ready";
    this._end = undefined;
  }
}
