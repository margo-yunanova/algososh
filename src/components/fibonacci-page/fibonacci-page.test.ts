import { getFibonacciSequence } from "./fibonacci-page";

describe("fibonacci sequence", () => {
  test("getFibonacciSequence(1)", () => {
    expect(getFibonacciSequence(1)).toEqual([1, 1]);
  });

  test("getFibonacciSequence(4)", () => {
    expect(getFibonacciSequence(4)).toEqual([1, 1, 2, 3, 5]);
  });

  test("getFibonacciSequence(30)", () => {
    expect(getFibonacciSequence(30)).toMatchSnapshot();
  });
});
