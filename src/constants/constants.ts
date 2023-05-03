export const randomArr = () => {
  const randomNumber = Math.floor(Math.random() * 15 + 3);
  return Array(randomNumber)
    .fill(0)
    .map(() => {
      const num = Math.floor(Math.random() * 101);
      return num;
    });
};
