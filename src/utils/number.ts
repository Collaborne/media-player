/** Round a number to 2 decimals(if necessary) */
export const toTwoDigits = (num: number) => Math.round(num * 100) / 100;
