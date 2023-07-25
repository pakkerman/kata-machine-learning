export default class RingBuffer<T> {
  public length: number
  public capacity: number
  public head: number
  public tail: number
  public buffer: Array<T | undefined>

  constructor(capacity: number = 3) {
    this.length = 0
    this.capacity = capacity
    this.head = 0
    this.tail = 0
    this.buffer = new Array(this.capacity).fill(undefined)
  }

  push(item: T): void {
    this.length++
    this.buffer[this.tail] = item
    this.tail = (this.tail + 1) % this.capacity
    if (this.tail === this.head) this.head = (this.head + 1) % this.capacity
  }
  get(idx: number): T | undefined {
    return this.buffer[idx]
  }
  pop(): T | undefined {
    const out = this.buffer[this.head]
    if (!out) return undefined
    this.length--
    this.buffer[this.head] = undefined

    if (this.length === 0) {
      this.buffer = new Array(this.capacity).fill(undefined)
      this.head = this.tail = 0
      return out
    }

    this.head = (this.head + 1) % this.capacity
    return out
  }
}
