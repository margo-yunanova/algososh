import Queue, { IQueue } from "./Queue";

describe("queue", () => {
  let queue: IQueue<number>;
  beforeEach(() => {
    queue = new Queue(2);
  });

  test("should empty", () => {
    expect(queue.isEmpty()).toBeTruthy();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.clear();
    expect([...queue]).toEqual([undefined, undefined]);
  });

  describe("with data", () => {
    beforeEach(() => {
      queue.enqueue(1);
      queue.enqueue(2);
    });

    test("add item", () => {
      expect([...queue]).toEqual([1, 2]);
      expect(() => {
        queue.enqueue(3);
      }).toThrowError("Maximum length exceeded");
    });

    test("get first item", () => {
      expect(queue.peek()).toBe(1);
      queue.clear();
      expect(() => {
        queue.peek();
      }).toThrow(new Error("No elements in the queue"));
    });

    test("delete item", () => {
      expect(queue.dequeue()).toBe(1);
      expect(queue.dequeue()).toBe(2);
      expect(() => {
        queue.dequeue();
      }).toThrow(new Error("No elements in the queue"));
    });
  });
});
