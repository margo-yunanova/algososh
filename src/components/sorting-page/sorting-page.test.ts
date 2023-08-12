import { Direction } from "../../types/direction";
import { TSortState, bubbleSort } from "./sorting-page";
import * as utils from "../../constants/utils";

describe("bubble sort", () => {
  type TMockSetState = () => TSortState;

  let result: number[];
  const mockSetState = (setState: TMockSetState) => {
    const state = setState();
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

  describe("should sort Ascending", () => {
    test("some items", async () => {
      await bubbleSort([3, 2, 1], Direction.Ascending, mockSetState);
      expect(result).toEqual([1, 2, 3]);
    });

    test("with one item", () => {
      expect(async () => {
        await bubbleSort([3], Direction.Ascending, mockSetState);
      }).not.toThrow();
    });

    test("empty array", async () => {
      await bubbleSort([], Direction.Ascending, mockSetState);
      expect(result).toEqual([]);
    });
  });

  describe("should sort Descending", () => {
    test("some items", async () => {
      await bubbleSort([3, 5, 1], Direction.Descending, mockSetState);
      expect(result).toEqual([5, 3, 1]);
    });

    test("with one item", () => {
      expect(async () => {
        await bubbleSort([3], Direction.Descending, mockSetState);
      }).not.toThrow();
    });

    test("empty array", async () => {
      await bubbleSort([], Direction.Descending, mockSetState);
      expect(result).toEqual([]);
    });
  });
});
