interface IStack<T> {
  peek: () => T | undefined;
  push: (item: T) => number;
  pop: () => T | undefined;
  clear: () => void;
  getElements: () => Array<T>;
  getSize: () => number;
  [Symbol.iterator]: () => Iterator<T>;
}

export default class Stack<T> implements IStack<T> {
  private container: T[] = [];

  *[Symbol.iterator]() {
    for (let i = 0; i < this.container.length; i++) {
      yield this.container[i];
    }
  }

  peek() {
    return this.container.at(-1);
  }

  push(item: T) {
    return this.container.push(item);
  }

  pop() {
    return this.container.pop();
  }

  clear() {
    this.container.length = 0;
  }

  getElements() {
    return this.container;
  }

  getSize() {
    return this.container.length;
  }
}
