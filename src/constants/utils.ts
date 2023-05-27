import { Direction } from "../types/direction";

export const randomArr = (min: number, max: number, maxNumber: number) => {
  const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
  return Array(randomNumber)
    .fill(0)
    .map(() => {
      const num = Math.floor(Math.random() * (maxNumber + 1));
      return num;
    });
};

export const swap = (
  array: Array<number | string>,
  firstIndex: number,
  secondIndex: number
) => {
  const temp = array[firstIndex];
  array[firstIndex] = array[secondIndex];
  array[secondIndex] = temp;
};

export const delay = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const compareArrayItems = (
  direction: Direction,
  array: Array<number>,
  firstIndex: number,
  secondIndex: number
) =>
  direction === Direction.Ascending
    ? array[firstIndex] > array[secondIndex]
    : array[firstIndex] < array[secondIndex];
