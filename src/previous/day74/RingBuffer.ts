export default class RingBuffer<T> {
  public length: number
  private capacity: number
  private read: number
  private write: number
  private buffer: Array<T | undefined>

  constructor(capacity: number = 3) {
    this.length = 0
    this.capacity = capacity
    this.read = this.write = 0
    this.buffer = new Array(this.capacity).fill(undefined)
  }

  push(item: T): void {
    this.buffer[this.write] = item
    this.length++
    this.moveWrite()

    if (this.read === this.write) this.moveRead()
  }
  get(idx: number): T | undefined {
    return this.buffer[idx]
  }
  pop(): T | undefined {
    if (this.length === 0) return undefined
    const out = this.buffer[this.read]
    this.buffer[this.read] = undefined
    this.length--
    if (this.length === 0) {
      this.read = this.write = 0
      return out
    }

    this.moveRead()
    return out
  }

  private moveRead(): void {
    this.read = (this.read + 1) % this.capacity
  }
  private moveWrite(): void {
    this.write = (this.write + 1) % this.capacity
  }
}
