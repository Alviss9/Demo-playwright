const assert = require('node:assert/strict');
const { describe, it } = require('node:test');

class Heap {
  constructor(compare = (a, b) => a - b) {
    this.items = [];
    this.compare = compare;
  }

  get size() {
    return this.items.length;
  }

  get isEmpty() {
    return this.size === 0;
  }

  peek() {
    return this.items[0];
  }

  push(value) {
    this.items.push(value);
    this.#siftUp(this.size - 1);
  }

  pop() {
    if (this.isEmpty) {
      return undefined;
    }

    const root = this.items[0];
    const last = this.items.pop();

    if (!this.isEmpty) {
      this.items[0] = last;
      this.#siftDown(0);
    }

    return root;
  }

  #siftUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.compare(this.items[index], this.items[parentIndex]) >= 0) {
        break;
      }

      [this.items[index], this.items[parentIndex]] = [
        this.items[parentIndex],
        this.items[index],
      ];
      index = parentIndex;
    }
  }

  #siftDown(index) {
    while (true) {
      const leftIndex = 2 * index + 1;
      const rightIndex = 2 * index + 2;
      let priorityIndex = index;

      if (
        leftIndex < this.size &&
        this.compare(this.items[leftIndex], this.items[priorityIndex]) < 0
      ) {
        priorityIndex = leftIndex;
      }

      if (
        rightIndex < this.size &&
        this.compare(this.items[rightIndex], this.items[priorityIndex]) < 0
      ) {
        priorityIndex = rightIndex;
      }

      if (priorityIndex === index) {
        break;
      }

      [this.items[index], this.items[priorityIndex]] = [
        this.items[priorityIndex],
        this.items[index],
      ];
      index = priorityIndex;
    }
  }
}

class PriorityQueue {
  constructor(comparePriority = (a, b) => a - b) {
    this.order = 0;
    this.heap = new Heap((a, b) => {
      const priorityDifference = comparePriority(a.priority, b.priority);
      return priorityDifference === 0 ? a.order - b.order : priorityDifference;
    });
  }

  get size() {
    return this.heap.size;
  }

  get isEmpty() {
    return this.heap.isEmpty;
  }

  enqueue(value, priority) {
    this.heap.push({ value, priority, order: this.order });
    this.order += 1;
  }

  peek() {
    return this.heap.peek()?.value;
  }

  dequeue() {
    return this.heap.pop()?.value;
  }
}

describe('Heap algorithm', () => {
  it('handles empty state and returns undefined when empty', () => {
    const heap = new Heap();

    assert.equal(heap.isEmpty, true);
    assert.equal(heap.size, 0);
    assert.equal(heap.peek(), undefined);
    assert.equal(heap.pop(), undefined);
  });

  it('returns values in ascending order for a min-heap', () => {
    const heap = new Heap();
    const values = [7, 3, 9, 1, 5, 3, -2];

    values.forEach((value) => heap.push(value));

    assert.equal(heap.peek(), -2);
    assert.equal(heap.size, values.length);
    assert.deepEqual(
      Array.from({ length: values.length }, () => heap.pop()),
      [...values].sort((a, b) => a - b),
    );
    assert.equal(heap.isEmpty, true);
  });

  it('returns values in descending order for a max-heap', () => {
    const heap = new Heap((a, b) => b - a);
    const values = [7, 3, 9, 1, 5, 3, -2];

    values.forEach((value) => heap.push(value));

    assert.equal(heap.peek(), 9);
    assert.deepEqual(
      Array.from({ length: values.length }, () => heap.pop()),
      [...values].sort((a, b) => b - a),
    );
    assert.equal(heap.isEmpty, true);
  });
});

describe('Priority Queue algorithm', () => {
  it('handles empty state and returns undefined when empty', () => {
    const queue = new PriorityQueue();

    assert.equal(queue.isEmpty, true);
    assert.equal(queue.size, 0);
    assert.equal(queue.peek(), undefined);
    assert.equal(queue.dequeue(), undefined);
  });

  it('dequeues values by ascending priority', () => {
    const queue = new PriorityQueue();

    queue.enqueue('low', 5);
    queue.enqueue('urgent', 1);
    queue.enqueue('normal', 3);

    assert.equal(queue.peek(), 'urgent');
    assert.equal(queue.size, 3);
    assert.deepEqual(
      [queue.dequeue(), queue.dequeue(), queue.dequeue()],
      ['urgent', 'normal', 'low'],
    );
    assert.equal(queue.isEmpty, true);
  });

  it('preserves insertion order for values with equal priority', () => {
    const queue = new PriorityQueue();

    queue.enqueue('first', 2);
    queue.enqueue('second', 2);
    queue.enqueue('highest priority', 1);

    assert.deepEqual(
      [queue.dequeue(), queue.dequeue(), queue.dequeue()],
      ['highest priority', 'first', 'second'],
    );
  });

  it('supports descending priority with a custom comparator', () => {
    const queue = new PriorityQueue((a, b) => b - a);

    queue.enqueue('medium', 5);
    queue.enqueue('highest', 10);
    queue.enqueue('lowest', 1);

    assert.deepEqual(
      [queue.dequeue(), queue.dequeue(), queue.dequeue()],
      ['highest', 'medium', 'lowest'],
    );
  });
});
