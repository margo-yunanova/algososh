import { Direction } from "../../types/direction";
import {
  TSortState,
  bubbleSort,
  selectionSort,
  selectionSort2,
} from "./sorting-page";
import * as utils from "../../constants/utils";
import fc from "fast-check";

describe.each([
  ["bubbleSort", bubbleSort],
  ["selectionSort", selectionSort],
  ["selectionSort2", selectionSort2],
])("%s", (_, func) => {
  type TMockSetState = () => TSortState;

  let result: number[];

  const mockSetState = (state: TMockSetState | TSortState) => {
    if (typeof state === "function") {
      state = state();
    }
    if (state.sortedArray) {
      result = state.sortedArray;
    }
  };

  beforeEach(() => {
    result = [];
    jest.spyOn(utils, "delay").mockImplementation(() => Promise.resolve());
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test.each([
    ["some items", [3, 2, 1], [1, 2, 3]],
    ["one item", [3], [3]],
    ["empty array", [], []],
  ])("Sort ascending %s", async (_, initialData, expected) => {
    await func(initialData, Direction.Ascending, mockSetState);
    expect(result).toEqual(expected);
  });

  test.each([
    ["some items", [3, 5, 1], [5, 3, 1]],
    ["one item", [3], [3]],
    ["empty array", [], []],
  ])("Sort descending %s", async (_, initialData, expected) => {
    await func(initialData, Direction.Descending, mockSetState);
    expect(result).toEqual(expected);
  });

  test.each([
    {
      direction: Direction.Ascending,
      compareFn: (a: number, b: number) => a - b,
    },
    {
      direction: Direction.Descending,
      compareFn: (a, b) => b - a,
    },
  ])("Random sort $direction", async ({ direction, compareFn }) => {
    await fc.assert(
      fc.asyncProperty(fc.array(fc.integer()), async (initialData) => {
        result = [];
        const temp = [...initialData];
        await func(initialData, direction, mockSetState);
        expect(result).toEqual(temp.sort(compareFn));
      })
    );
  });
});
