export const randomArr = () => {
  const randomNumber = Math.floor(Math.random() * 15 + 3);
  return Array(randomNumber)
    .fill(0)
    .map(() => {
      const num = Math.floor(Math.random() * 101);
      return num;
    });
};

export const swap = (array: Array<number>, index: number): void => {
  const temp = array[index];
  array[index] = array[index + 1];
  array[index + 1] = temp;
};

export const delay = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
