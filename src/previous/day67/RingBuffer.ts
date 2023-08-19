export default class RingBuffer<T> {
  public length: number
  public capacity: number
  public read: number
  public write: number
  public buffer: Array<T | undefined>

  constructor(capacity: number = 3) {
    this.length = 0
    this.capacity = capacity
    this.read = this.write = 0
    this.buffer = new Array(this.capacity).fill(undefined)
  }

  push(item: T): void {
    this.buffer[this.write] = item
    this.length++
    this.write = this.increamentPointer(this.write)

    if (this.read === this.write) {
      this.read = this.increamentPointer(this.read)
      this.length--
    }
  }
  get(idx: number): T | undefined {
    return this.buffer[idx]
  }
  pop(): T | undefined {
    const out = this.buffer[this.read]
    if (!out) return undefined
    this.buffer[this.read] = undefined
    this.length--
    if (this.length === 0) {
      this.write = this.read = 0
      return out
    }

    this.read = this.increamentPointer(this.read)
    return out
  }

  private increamentPointer(pointer: number): number {
    return (pointer + 1) % this.capacity
  }
}
