import { getHeapSnapshot } from "v8";

export interface HeapData {
  key: number;
  value: number;
}

/**
 * Binary min kvheap
 * @param key keys are used to sort the array.
 * @param value values are stored with the key.
 */
export class BinaryMinHeapKV {
  heap: HeapData[];
  constructor() {
    this.heap = [];
  }

  /**
   * Gets parent index
   * @param index
   * @returns {number} parent index
   */
  private getParent = (index: number) => {
    return Math.floor((index - 1) / 2);
  };

  /**
   * Get index of left child of parent
   * @param parent parent index
   * @returns {number} left child index
   */
  private getLeft = (parent: number) => {
    return parent * 2 + 1;
  };

  /**
   * Get index for right child of parent
   * @param parent parent index
   * @returns {number} right child index
   */
  private getRight = (parent: number) => {
    return parent * 2 + 2;
  };

  /**
   * Swaps index1 and index2 in the heap.
   * @param index1 index of heap to swap
   * @param index2 index of heap to swap
   */
  private swap = (index1: number, index2: number) => {
    let t = this.heap[index1];
    this.heap[index1] = this.heap[index2];
    this.heap[index2] = t;
  };

  /**
   * Determines whether key of indexA is less than key of indexB
   * @param indexA index of heap
   * @param indexB index of heap to compare to
   * @returns {boolean} true if A.key < B.key otherwise false.
   */
  private isKeyALessThanB = (indexA: number, indexB: number) => {
    if (this.heap[indexA].key < this.heap[indexB].key) {
      return true;
    }
    return false;
  };

  /**
   * Recursively sifts down HeapData at index until min heap is preserved
   * @param index index of heap to sift down
   */
  private siftDown = (index: number) => {
    let { heap, getLeft, getRight, isKeyALessThanB, siftDown, swap } = this;
    if (index >= 0) {
      let left = getLeft(index);
      let right = getRight(index);
      // have to check if they are undefined before comparisons.
      if (heap[left] && heap[right]) {
        // need to make sure at least one of them is lower before we swap...
        if (isKeyALessThanB(left, index) || isKeyALessThanB(right, index)) {
          // will swap right with index if left === right.
          let lowerIndex = isKeyALessThanB(left, right) ? left : right;
          swap(lowerIndex, index);
          siftDown(lowerIndex);
        }
      } else if (heap[left] && isKeyALessThanB(left, index)) {
        swap(left, index);
        siftDown(left);
      } else if (heap[right] && isKeyALessThanB(right, index)) {
        swap(right, index);
        siftDown(right);
      }
    }
  };

  /**
   * Inserts key, value into binary min heap.
   * @param key number used to sort binary minheap
   * @param value number also stored with key.
   */
  public insert = (key: number, value: number) => {
    let heapData: HeapData = { key: key, value: value };
    this.heap.push(heapData);

    let swapRecursive = (index: number) => {
      let parent = this.getParent(index);
      if (parent >= 0 && this.heap[parent].key > this.heap[index].key) {
        this.swap(index, parent);
        swapRecursive(parent);
      }
    };
    swapRecursive(this.heap.length - 1);
  };

  /**
   * Removes and returns the minimum value of the heap
   * @returns {HeapData} {key: number, value: number} of minimum of heap.
   */
  public extractMin = () => {
    let { heap, siftDown } = this;
    let min = {
      key: heap[0].key,
      value: heap[0].value
    };
    // replace first element with last element.
    heap[0] = heap[heap.length - 1];
    // remove last element from heap.
    heap.pop();
    // sift down the first element.
    siftDown(0);
    return min;
  };

  /**
   * Determines if the minheap is empty
   * @returns {boolean} true or false
   */
  public isEmpty = () => {
    if (this.heap.length > 0) {
      return false;
    }
    return true;
  };

  /**
   * Determines whether value is in the heap
   * @param value Value stored with key
   * @returns {boolean} true or false
   */
  public containsValue = (value: number) => {
    return this.heap.some(item => item.value === value);
  };
}
