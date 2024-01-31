export default class RingBuffer<T> {
  public length: number
  public capacity: number
  private read: number
  private write: number
  public buffer: Array<T | undefined>

  constructor(capacity: number = 3) {
    this.length = 0
    this.capacity = capacity
    this.read = this.write = 0
    this.buffer = new Array(this.capacity).fill(undefined)
  }

  push(item: T): void {
    this.buffer[this.write] = item
    if (this.length < this.capacity) this.length++
    this.moveWrite()
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

    this.moveRead()
    return out
  }

  private moveRead(): void {
    this.read = (this.read + 1) % this.capacity
  }
  private moveWrite(): void {
    this.write = (this.write + 1) % this.capacity
    if (this.read === this.write) this.moveRead()
  }
}
