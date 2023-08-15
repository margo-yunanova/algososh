import Stack, { IStack } from "./Stack";

describe("stack", () => {
  let stack: IStack<number>;

  beforeEach(() => {
    stack = new Stack<number>();
  });
  test("should empty", () => {
    expect(stack.getSize()).toBe(0);
    stack.push(1);
    stack.push(2);
    stack.clear();
    expect(stack.getElements()).toHaveLength(0);
  });

  describe("with data", () => {
    beforeEach(() => {
      stack.push(1);
      stack.push(2);
    });
    test("push item", () => {
      expect(stack.getElements()).toEqual([1, 2]);
    });

    test("pop item", () => {
      stack.pop();
      expect(stack.getElements()).toEqual([1]);
    });

    test("get last item", () => {
      expect(stack.peek()).toEqual(2);
      stack.pop();
      expect(stack.peek()).toEqual(1);
    });

    test("iterator", () => {
      expect([...stack]).toEqual([1, 2]);
    });
  });
});
