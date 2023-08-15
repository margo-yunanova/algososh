export interface IQueue<T> {
  peek: () => T;
  enqueue: (item: T) => void;
  dequeue: () => T;
  clear: () => void;
  isEmpty: () => boolean;
  [Symbol.iterator]: () => Iterator<T>;
  readonly head: number;
  readonly tail: number;
  readonly length: number;
}

export default class Queue<T> implements IQueue<T> {
  private readonly size: number;
  private container: T[];
  head = 0;
  tail = 0;
  length = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(this.size);
  }

  *[Symbol.iterator]() {
    for (let i = 0; i < this.size; i++) {
      yield this.container[i];
    }
  }

  enqueue(item: T) {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    this.container[this.tail % this.size] = item;
    this.tail++;
    this.length++;
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    const deletedItem = this.container[this.head % this.size];
    delete this.container[this.head % this.size];
    this.head++;
    this.length--;
    return deletedItem;
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return this.container[this.head % this.size];
  }

  clear() {
    this.container = Array(this.size);
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  }

  isEmpty() {
    return this.length === 0;
  }
}
