import { BinaryMinHeapKV, HeapData } from "./BinaryMinHeapKV";

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
