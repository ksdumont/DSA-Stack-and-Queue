class _DoubleNode {
  constructor(value) {
    this.value = value;
    this.previous = null;
    this.next = null;
  }
}
class DoubleQueue {
  constructor() {
    this.first = null;
    this.last = null;
  }
  enqueue(data) {
    const node = new _DoubleNode(data);
    if (this.first === null) {
      this.first = node;
    }
    if (this.last) {
      node.previous = this.last;
      this.last.next = node;
    }
    this.last = node;
  }
  dequeue(data) {
    if (this.first === null) {
      return;
    }
    const node = this.first;
    this.first = this.first.next;
    this.first.previous = null;
    if (node === this.last) {
      this.last = null;
    }
    return node.value;
  }
}
module.exports = DoubleQueue;
