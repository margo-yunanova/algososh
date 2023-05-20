class LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null;
  constructor(value: T, next: LinkedListNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}

interface TLinkedList<T> {
  [Symbol.iterator](): Iterator<T>;
  prepend(value: T): void;
  append(value: T): void;
  addByIndex(value: T, index: number): void;
  //TODO нужно ли возвращать элементы?
  deleteByIndex(index: number): void;
  deleteHead(): void;
  deleteTail(): void;
  //toArray(): Array<T>;
}

export class LinkedList<T> implements TLinkedList<T> {
  private size: number;
  head: LinkedListNode<T> | null;

  constructor(array: Array<T> = []) {
    this.size = 0;
    this.head = null;

    for (const item of array) {
      this.append(item);
    }
  }

  *[Symbol.iterator]() {
    // let current = this.head;
    // while (current !== null) {
    //   yield current.value;
    //   current = current.next;
    // }

    for (let current = this.head; current !== null; current = current.next) {
      yield current.value;
    }
  }
  prepend(value: T) {
    const node = new LinkedListNode(value);
    if (this.head === null) {
      this.head = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
    this.size++;
  }

  append(value: T) {
    const node = new LinkedListNode(value);
    if (this.head === null) {
      this.head = node;
    } else {
      for (let current = this.head; current !== null; current = current.next) {
        if (current.next === null) {
          current.next = node;
          break;
        }
      }
    }
    this.size++;
  }

  addByIndex(value: T, index: number) {
    if (index < 0 || index > this.size) {
      throw new Error("Хрен тебе");
    } else if (this.head === null || index === 0) {
      this.prepend(value);
    } else {
      for (
        let previous = this.head, next = previous.next;
        index > 0 && next !== null;
        index--, previous = next, next = previous.next
      ) {
        if (index - 1 === 0) {
          const node = new LinkedListNode(value, next);
          previous.next = node;
        }
      }
    }
    this.size++;
  }

  deleteByIndex(index: number) {
    if (index < 0 || index > this.size) {
      throw new Error("Хрен тебе");
    } else if (this.head === null || index === 0) {
      this.deleteHead();
    } else {
      for (
        let previous = this.head, next = previous.next;
        index > 0 && next !== null;
        index--, previous = next, next = previous.next
      ) {
        if (index - 1 === 0) {
          previous.next = next.next ?? null;
        }
      }
    }
    this.size--;
  }

  deleteHead() {
    if (this.head === null) {
      throw new Error("Список и так пустой");
    } else {
      const newHead = this.head.next;
      this.head = newHead;
    }
    this.size--;
  }

  deleteTail() {
    if (this.head === null) {
      throw new Error("Список и так пустой");
    } else if (this.head.next === null) {
      this.head = null;
    } else {
      for (
        let current = this.head;
        current.next !== null;
        current = current.next
      ) {
        if (current.next.next === null) {
          current.next = null;
          break;
        }
      }
    }
    this.size--;
  }

  //toArray() {}
}
