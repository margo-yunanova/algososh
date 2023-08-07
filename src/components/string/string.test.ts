import { reverseString } from "./string";
jest.setTimeout(20000);

describe("reverse string", () => {
  it("even string length", async () => {
    const mockCallback = jest.fn();
    await reverseString("привет", mockCallback);
    expect(mockCallback).toMatchSnapshot();
  });

  it("odd string length", async () => {
    const mockCallback = jest.fn();
    await reverseString("кузинатра", mockCallback);
    expect(mockCallback).toMatchSnapshot();
  });

  it("one char", async () => {
    const mockCallback = jest.fn();
    await reverseString("я", mockCallback);
    expect(mockCallback).toMatchSnapshot();
  });

  it("empty string", async () => {
    const mockCallback = jest.fn();
    await reverseString("", mockCallback);
    expect(mockCallback).toMatchSnapshot();
  });
});
