/**
 * Constant representing the duration of one second in milliseconds.
 * This value is used for time-related calculations within the Timer class,
 * specifically in intervals and duration calculations.
 */
export const SECOND = 1000;

export const MINUTE = SECOND * 60;

export const HOUR = MINUTE * 60;

/**
 * Converts a given value in seconds to milliseconds.
 * This function multiplies the input value by the constant SECOND,
 * allowing for easy conversion from seconds to milliseconds.
 *
 * @param value - The number of seconds to convert.
 * @returns The equivalent duration in milliseconds.
 */
export const seconds = (value: number) => value * SECOND;

/**
 * Converts a given value in minutes to milliseconds.
 * This function multiplies the input value by the constant SECOND,
 * allowing for easy conversion from minutes to milliseconds.
 *
 * @param value - The number of minutes to convert.
 * @returns The equivalent duration in milliseconds.
 */
export const minutes = (value: number) => value * MINUTE;

/**
 * Converts a given value in hours to milliseconds.
 * This function multiplies the input value by the constant SECOND,
 * allowing for easy conversion from hours to milliseconds.
 *
 * @param value - The number of hours to convert.
 * @returns The equivalent duration in milliseconds.
 */
export const hours = (value: number) => value * HOUR;
