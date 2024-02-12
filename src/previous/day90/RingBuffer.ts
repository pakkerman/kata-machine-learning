export default class RingBuffer<T> {
  public length: number = 0
  public capacity: number = 0
  public read: number = 0
  public write: number = 0
  public buffer: Array<T | undefined> = []

  constructor(capacity: number = 3) {
    this.capacity = capacity
  }

  push(item: T): void {
    this.buffer[this.write] = item
    if (this.length < this.capacity) this.length++

    this.write = (this.write + 1) % this.capacity
    if (this.read === this.write) this.read = (this.read + 1) % this.capacity
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
