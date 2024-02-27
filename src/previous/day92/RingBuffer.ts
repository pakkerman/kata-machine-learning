export default class RingBuffer<T> {
  public length: number
  public capacity: number
  private write: number
  private read: number
  public buffer: Array<T | undefined>

  constructor(capacity: number = 3) {
    this.length = 0
    this.capacity = capacity
    this.read = this.write = 0
    this.buffer = new Array(this.capacity).fill(undefined)
  }

  push(item: T): void {
    this.buffer[this.write] = item
    this.write = (this.write + 1) % this.capacity
    if (this.write === this.read) this.read = (this.read + 1) % this.capacity
    if (this.length < this.capacity) this.length++
  }
  get(idx: number): T | undefined {
    return this.buffer[idx]
  }
  pop(): T | undefined {
    const out = this.buffer[this.read]
    this.buffer[this.read] = undefined
    this.length--
    if (this.length === 0) {
      this.read = this.write = 0
      return out
    }

    this.read = (this.read + 1) % this.capacity
    return out
  }
}
