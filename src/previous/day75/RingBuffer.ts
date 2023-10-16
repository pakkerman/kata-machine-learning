export default class RingBuffer<T> {
  public length: number
  private capacity: number
  private read: number
  private write: number
  private buffer: Array<T | undefined>

  constructor() {
    this.length = 0
    this.capacity = 3
    this.read = this.write = 0
    this.buffer = new Array(this.capacity).fill(undefined)
  }

  push(item: T): void {
    this.buffer[this.write] = item
    if (this.length < this.capacity) this.length++
    this.moveWrite()
    if (this.read === this.write) this.moveRead()
  }
  get(idx: number): T | undefined {
    return this.buffer?.[idx]
  }
  pop(): T | undefined {
    const out = this.buffer[this.read]
    if (out === undefined) return undefined
    this.buffer[this.read] = undefined
    this.length--
    if (this.length === 0) {
      this.read = this.write = 0
      return out
    }

    this.moveRead()
    return out
  }

  private moveWrite(): void {
    this.write = (this.write + 1) % this.capacity
  }
  private moveRead(): void {
    this.read = (this.read + 1) % this.capacity
  }
}
