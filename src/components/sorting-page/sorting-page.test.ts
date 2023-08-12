import { Direction } from "../../types/direction";
import {
  TSortState,
  bubbleSort,
  selectionSort,
  selectionSort2,
} from "./sorting-page";
import * as utils from "../../constants/utils";

for (const func of [bubbleSort, selectionSort, selectionSort2])
  describe(`#${func.name}`, () => {
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

    describe("Ascending", () => {
      test("some items", async () => {
        await func([3, 2, 1], Direction.Ascending, mockSetState);
        expect(result).toEqual([1, 2, 3]);
      });

      test("with one item", async () => {
        await func([3], Direction.Ascending, mockSetState);
      });

      test("empty array", async () => {
        await func([], Direction.Ascending, mockSetState);
        expect(result).toEqual([]);
      });
    });

    describe("Decending", () => {
      test("some items", async () => {
        await func([3, 5, 1], Direction.Descending, mockSetState);
        expect(result).toEqual([5, 3, 1]);
      });

      test("with one item", async () => {
        await func([3], Direction.Descending, mockSetState);
      });

      test("empty array", async () => {
        await func([], Direction.Descending, mockSetState);
        expect(result).toEqual([]);
      });
    });
  });
