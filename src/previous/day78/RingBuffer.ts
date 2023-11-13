export default class RingBuffer<T> {
  public length: number
  private capacity: number
  private write: number
  private read: number
  public buffer: (T | undefined)[]

  constructor(capacity: number = 3) {
    this.length = 0
    this.capacity = capacity
    this.write = this.read = 0
    this.buffer = new Array(3).fill(undefined)
  }

  push(item: T): void {
    this.buffer[this.write] = item
    this.moveWrite()
    if (this.length !== this.capacity) this.length++
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
      this.buffer = new Array(this.capacity).fill(undefined)
      return out
    }

    this.moveRead()
    return out
  }

  private moveWrite(): void {
    this.write = (this.write + 1) % this.capacity
    if (this.write === this.read) this.moveRead()
  }
  private moveRead(): void {
    this.read = (this.read + 1) % this.capacity
  }
}
