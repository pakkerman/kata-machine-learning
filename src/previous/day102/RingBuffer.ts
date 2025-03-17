export default class RingBuffer<T> {
  public length: number
  public capacity: number
  private read: number
  private write: number
  public buffer: Array<T | undefined>

  constructor() {
    this.length = 0
    this.capacity = 3
    this.read = 0
    this.write = 0
    this.buffer = []
  }

  push(item: T): void {
    this.buffer[this.write] = item
    if (this.length < this.capacity) this.length++

    this.write = (this.write + 1) % this.capacity
    if (this.read === this.write) {
      this.read = (this.read + 1) % this.capacity
    }
  }

  get(idx: number): T | undefined {
    return this.buffer[idx]
  }

  pop(): T | undefined {
    const out = this.buffer[this.read]
    if (out == undefined) return undefined

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

