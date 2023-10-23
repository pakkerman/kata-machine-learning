export default class RingBuffer<T> {
  public length: number
  public capacity: number
  public buffer: Array<T | undefined>
  private write: number
  private read: number

  constructor(capacity: number = 3) {
    this.length = 0
    this.capacity = capacity
    this.read = this.write = 0
    this.buffer = new Array(this.capacity).fill(undefined)
  }

  push(item: T): void {
    this.buffer[this.write] = item
    this.incrementWrite()
    if (this.length < this.capacity) this.length++
    if (this.read === this.write) this.incrementRead()
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

    this.incrementRead()
    return out
  }

  private incrementRead(): void {
    this.read = (this.read + 1) % this.capacity
  }
  private incrementWrite(): void {
    this.write = (this.write + 1) % this.capacity
  }
}
