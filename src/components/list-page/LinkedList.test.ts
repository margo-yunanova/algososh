import { LinkedList } from "./LinkedList";

describe("empty list", () => {
  let linkedList: LinkedList<number>;

  beforeEach(() => {
    linkedList = new LinkedList();
  });
  test("constructor", () => {
    expect(linkedList.toArray()).toEqual([]);
  });
  test("append", () => {
    linkedList.append(1);
    expect(linkedList.toArray()).toEqual([1]);
  });

  test("prepend", () => {
    linkedList.prepend(1);
    expect(linkedList.toArray()).toEqual([1]);
  });

  describe("addByIndex", () => {
    test("index < 0", () => {
      expect(() => {
        linkedList.addByIndex(0, -1);
      }).toThrow();
    });

    test("correct index", () => {
      linkedList.addByIndex(0, 0);
      expect(linkedList.toArray()).toEqual([0]);
    });

    test("index > list size", () => {
      expect(() => {
        linkedList.addByIndex(0, 2);
      }).toThrow();
    });
  });

  test("deleteByIndex", () => {
    expect(() => {
      linkedList.deleteByIndex(0);
    }).toThrow();
  });

  test("deleteHead", () => {
    expect(() => {
      linkedList.deleteHead();
    }).toThrow();
  });

  test("deleteTail", () => {
    expect(() => {
      linkedList.deleteTail();
    }).toThrow();
  });

  test("toArray", () => {
    expect(linkedList.toArray()).toEqual([]);
  });

  test("iterator", () => {
    expect([...linkedList][5]).toBeUndefined();
  });
});

describe("not empty list", () => {
  let linkedList: LinkedList<number>;

  beforeEach(() => {
    linkedList = new LinkedList([1, 2, 3]);
  });
  test("constructor", () => {
    expect(linkedList.toArray()).toEqual([1, 2, 3]);
  });

  test("append", () => {
    linkedList.append(4);
    expect(linkedList.toArray()).toEqual([1, 2, 3, 4]);
  });

  test("prepend", () => {
    linkedList.prepend(0);
    expect(linkedList.toArray()).toEqual([0, 1, 2, 3]);
  });

  describe("addByIndex", () => {
    test("index < 0", () => {
      expect(() => {
        linkedList.addByIndex(0, -1);
      }).toThrow();
    });

    test("correct index", () => {
      linkedList.addByIndex(2.5, 2);
      expect(linkedList.toArray()).toEqual([1, 2, 2.5, 3]);
    });

    test("index > list size", () => {
      expect(() => {
        linkedList.addByIndex(0, 5);
      }).toThrow();
    });
  });

  describe("deleteByIndex", () => {
    test("index < 0", () => {
      expect(() => {
        linkedList.deleteByIndex(-1);
      }).toThrow();
    });

    test("index = 0", () => {
      linkedList.deleteByIndex(0);
      expect(linkedList.toArray()).toEqual([2, 3]);
    });

    test("correct index", () => {
      linkedList.deleteByIndex(2);
      expect(linkedList.toArray()).toEqual([1, 2]);
    });

    test("index > list size", () => {
      expect(() => {
        linkedList.deleteByIndex(5);
      }).toThrow();
    });
  });

  test("deleteHead", () => {
    linkedList.deleteHead();
    expect(linkedList.toArray()).toEqual([2, 3]);
  });

  describe("deleteTail", () => {
    test("clear list", () => {
      linkedList.deleteTail();
      linkedList.deleteTail();
      linkedList.deleteTail();
      expect(linkedList.toArray()).toEqual([]);
    });

    test("last item", () => {
      linkedList.deleteTail();
      expect(linkedList.toArray()).toEqual([1, 2]);
    });
  });

  test("toArray", () => {
    expect(linkedList.toArray()).toEqual([1, 2, 3]);
  });

  test("iterator", () => {
    expect([...linkedList][1]).toBe(2);
    expect([...linkedList][5]).toBeUndefined();
  });
});
