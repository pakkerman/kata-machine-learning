export default class RingBuffer<T> {
  public length: number
  public capacity: number
  public read: number
  public write: number
  public buffer: Array<T | undefined>

  constructor(capacity: number = 3) {
    this.length = 0
    this.capacity = capacity
    this.read = 0
    this.write = 0
    this.buffer = new Array(capacity).fill(undefined)
  }

  push(item: T): void {
    this.buffer[this.write] = item
    this.write = (this.write + 1) % this.capacity

    if (this.length < this.capacity) {
      this.length++
    }

    if (this.read === this.write) {
      this.read = (this.read + 1) % this.capacity
    }
  }
  get(idx: number): T | undefined {
    return this.buffer[idx]
  }
  pop(): T | undefined {
    const out = this.buffer[this.read]
    this.buffer[this.read] = undefined
    this.read = (this.read + 1) % this.capacity

    this.length--
    if (this.length === 0) {
      this.read = this.write = 0
      return out
    }

    return out
  }
}

