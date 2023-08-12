import { Direction } from "../../types/direction";
import { TSortState, selectionSort2 } from "./sorting-page";
import * as utils from "../../constants/utils";
describe("should selection sort", () => {
  let result: number[];
  type TMockSetState = () => TSortState;

  const mockSetState = (state: TSortState | TMockSetState) => {
    if (typeof state === "function") {
      state = state();
    }

    result = state.sortedArray ? state.sortedArray : result;
  };

  beforeEach(() => {
    result = [];
    jest.spyOn(utils, "delay").mockImplementation(() => Promise.resolve());
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Ascending", () => {
    test("some items", async () => {
      await selectionSort2([3, 2, 1], Direction.Ascending, mockSetState);
      expect(result).toEqual([1, 2, 3]);
    });

    test("with one item", async () => {
      await selectionSort2([3], Direction.Ascending, mockSetState);
    });

    test("empty array", async () => {
      await selectionSort2([], Direction.Ascending, mockSetState);
      expect(result).toEqual([]);
    });
  });

  describe("Descending", () => {
    test("some items", async () => {
      await selectionSort2([3, 5, 1], Direction.Descending, mockSetState);
      expect(result).toEqual([5, 3, 1]);
    });

    test("with one item", async () => {
      await selectionSort2([3], Direction.Descending, mockSetState);
    });

    test("empty array", async () => {
      await selectionSort2([], Direction.Descending, mockSetState);
      expect(result).toEqual([]);
    });
  });
});
