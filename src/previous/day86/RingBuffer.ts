export default class RingBuffer<T> {
  public length: number
  private capacity: number
  private read: number
  private write: number
  public buffer: Array<T | undefined>

  constructor() {
    this.length = this.read = this.write = 0
    this.capacity = 3
    this.buffer = new Array(this.capacity).fill(undefined)
  }

  push(item: T): void {
    this.buffer[this.write] = item
    this.write = (this.write + 1) % this.capacity
    if (this.length < this.capacity) this.length++
    if (this.read === this.write) this.read = (this.read + 1) % this.capacity
  }
  get(idx: number): T | undefined {
    return this.buffer[idx]
  }
  pop(): T | undefined {
    const out = this.buffer[this.read]
    if (out == undefined) return undefined

    this.length--
    if (this.length === 0) {
      this.read = this.write = 0
      this.buffer = new Array(this.capacity).fill(undefined)
      return out
    }

    this.buffer[this.read] = undefined
    this.read = (this.read + 1) % this.capacity
    return out
  }
}
