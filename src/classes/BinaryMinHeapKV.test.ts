import { BinaryMinHeapKV, HeapData } from "./BinaryMinHeapKV";

describe("BinaryMinHeapKV Tests", () => {
  const mapKeys = (arr: HeapData[]) => {
    return arr.map(item => item.key);
  };

  it("Creates an empty heap in constructor", () => {
    let minheap = new BinaryMinHeapKV();
    expect(minheap.heap.length).toEqual(0);
  });

  it("Inserts an item correctly", () => {
    let minheap = new BinaryMinHeapKV();
    minheap.insert(1, 2);
    expect(minheap.heap.length).toEqual(1);

    minheap.insert(5, 2);
    expect(minheap.heap.length).toEqual(2);

    minheap.insert(0, 7);
    expect(mapKeys(minheap.heap)).toEqual([0, 5, 1]);

    minheap.insert(3, 2);
    expect(mapKeys(minheap.heap)).toEqual([0, 3, 1, 5]);

    minheap.insert(2, 1);
    expect(mapKeys(minheap.heap)).toEqual([0, 2, 1, 5, 3]);
  });

  it("returns the correct minimum value, and the array is reordered.", () => {
    let minheap = new BinaryMinHeapKV();
    minheap.insert(1, 2);
    minheap.insert(5, 3);
    minheap.insert(3, 4);
    minheap.insert(0, 7);
    minheap.insert(2, 1);
    expect(mapKeys(minheap.heap)).toEqual([0, 1, 3, 5, 2]);
    expect(minheap.extractMin().key).toEqual(0);
    expect(minheap.heap.length).toEqual(4);
    expect(mapKeys(minheap.heap)).toEqual([1, 2, 3, 5]);
    expect(minheap.extractMin().key).toEqual(1);
    expect(minheap.heap.length).toEqual(3);
    expect(mapKeys(minheap.heap)).toEqual([2, 5, 3]);
    expect(minheap.extractMin().key).toEqual(2);
    expect(minheap.heap.length).toEqual(2);
    expect(mapKeys(minheap.heap)).toEqual([3, 5]);
  });

  it("maintains the heap with a big array, and maintains keys", () => {
    let bigMinHeap = new BinaryMinHeapKV();
    let keys: number[] = [];
    for (let i = 0; i <= 60; i++) {
      keys.push(1);
    }
    for (let i = 0; i < 60; i++) {
      keys.push(0);
    }
    let values: number[] = [];
    for (let i = 0; i <= 120; i++) {
      values.push(i);
    }
    expect(keys.length).toEqual(121);
    expect(values.length).toEqual(121);

    keys.forEach((item, index) => {
      bigMinHeap.insert(keys[index], values[index]);
    });

    let extracted = [];
    for (let i = 0; i < 120; i++) {
      extracted.push(bigMinHeap.extractMin());
    }

    for (let i = 0; i < extracted.length - 1; i++) {
      expect(extracted[i].key).toBeLessThanOrEqual(extracted[i + 1].key);
      expect(extracted[i].value).toEqual(values[extracted[i].value]);
    }
  });
});
