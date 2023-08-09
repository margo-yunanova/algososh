import { reverseString } from "./string";
// jest.setTimeout(20000);

describe("reverse string2", () => {
  it("even string length", async () => {
    expect([...reverseString("привет")]).toMatchSnapshot();
  });

  it("odd string length", async () => {
    expect([...reverseString("кузинатра")]).toMatchSnapshot();
  });

  it("one char", async () => {
    expect([...reverseString("я")]).toMatchSnapshot();
  });

  it("empty string", async () => {
    expect([...reverseString("")]).toMatchSnapshot();
  });
});

// describe("reverse string", () => {
//   it("even string length", async () => {
//     const mockCallback = jest.fn();
//     await reverseString("привет", mockCallback);
//     expect(mockCallback).toMatchSnapshot();
//   });

//   it("odd string length", async () => {
//     const mockCallback = jest.fn();
//     await reverseString("кузинатра", mockCallback);
//     expect(mockCallback).toMatchSnapshot();
//   });

//   it("one char", async () => {
//     const mockCallback = jest.fn();
//     await reverseString("я", mockCallback);
//     expect(mockCallback).toMatchSnapshot();
//   });

//   it("empty string", async () => {
//     const mockCallback = jest.fn();
//     await reverseString("", mockCallback);
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
