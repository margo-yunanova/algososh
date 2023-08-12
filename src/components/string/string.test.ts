import {
  reverseString,
  // reverseStringDelay
} from "./string";
import * as utils from "../../constants/utils";

// jest.setTimeout(20000);

describe("reverse string", () => {
  test.each([
    ["even string length", "привет"],
    ["odd string length", "кузинатра"],
    ["one char", "я"],
    ["empty string", ""],
  ])("%s", (_, initialValue) => {
    expect([...reverseString(initialValue)]).toMatchSnapshot();
  });
});

// describe("reverse string", () => {
//   let spyDelay: jest.SpyInstance<unknown>;
//   beforeEach(() => {
//     const originSetTimeout = setTimeout;

//     spyDelay = jest
//       // .spyOn(utils, "delay")
//       // .mockImplementation(() => Promise.resolve());
//       .spyOn(global, "setTimeout")
//       .mockImplementation((cb, ms) => originSetTimeout(cb, 0));
//   });
//   afterEach(() => {
//     jest.restoreAllMocks();
//   });

//   it("even string length", async () => {
//     const mockCallback = jest.fn();
//     await reverseStringDelay("привет", mockCallback);
//     expect(mockCallback).toMatchSnapshot();
//     expect(spyDelay).toHaveBeenCalledTimes(3);
//   });

//   it("odd string length", async () => {
//     const mockCallback = jest.fn();
//     await reverseStringDelay("кузинатра", mockCallback);
//     expect(mockCallback).toMatchSnapshot();
//     expect(spyDelay).toHaveBeenCalledTimes(5);
//   });

//   it("one char", async () => {
//     const mockCallback = jest.fn();
//     await reverseStringDelay("я", mockCallback);
//     expect(mockCallback).toMatchSnapshot();
//     expect(spyDelay).toHaveBeenCalledTimes(1);
//   });

//   it("empty string", async () => {
//     const mockCallback = jest.fn();
//     await reverseStringDelay("", mockCallback);
//     expect(mockCallback).toMatchSnapshot();
//     expect(spyDelay).toHaveBeenCalledTimes(0);
//   });
// });

// describe("reverse string", () => {
//   it("even string length", async () => {
//     const mockCallback = jest.fn();
//     await reverseStringDelay("привет", mockCallback);
//     expect(mockCallback).toMatchSnapshot();
//   });

//   it("odd string length", async () => {
//     const mockCallback = jest.fn();
//     await reverseStringDelay("кузинатра", mockCallback);
//     expect(mockCallback).toMatchSnapshot();
//   });

//   it("one char", async () => {
//     const mockCallback = jest.fn();
//     await reverseStringDelay("я", mockCallback);
//     expect(mockCallback).toMatchSnapshot();
//   });

//   it("empty string", async () => {
//     const mockCallback = jest.fn();
//     await reverseStringDelay("", mockCallback);
//     expect(mockCallback).toMatchSnapshot();
//   });
// });

// describe("reverse string", () => {
//   it("even string length", async () => {
//     expect(reverseString("привет")).toMatchSnapshot();
//   });

//   it("odd string length", async () => {
//     expect(reverseString("кузинатра")).toMatchSnapshot();
//   });

//   it("one char", async () => {
//     expect(reverseString("я")).toMatchSnapshot();
//   });

//   it("empty string", async () => {
//     expect(reverseString("")).toMatchSnapshot();
//   });
//});
