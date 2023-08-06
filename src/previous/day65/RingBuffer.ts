export default class RingBuffer<T> {
  public length: number
  public capacity: number
  private head: number
  private tail: number
  public buffer: Array<T | undefined>

  constructor(capacity: number = 3) {
    this.length = 0
    this.capacity = capacity
    this.head = this.tail = 0
    this.buffer = new Array(this.capacity).fill(undefined)
  }

  push(item: T): void {
    console.log("pushing", this.buffer, "head", this.head, "tail", this.tail)
    if (this.length === this.capacity)
      this.head = this.head + (1 % this.capacity)
    this.length++
    this.buffer[this.tail] = item
    this.tail = (this.tail + 1) % this.capacity
    console.log(
      "after pushing",
      this.buffer,
      "head",
      this.head,
      "tail",
      this.tail
    )
  }
  get(idx: number): T | undefined {
    return this.buffer[idx]
  }
  pop(): T | undefined {
    console.log("popping", this.buffer, "head", this.head, "tail", this.tail)
    const out = this.buffer[this.head]
    if (!out) return undefined

    this.buffer[this.head] = undefined
    this.length--
    if (this.length === 0) {
      this.head = this.tail = 0
      return out
    }

    this.head = (this.head + 1) % this.capacity
    console.log(
      "after popping",
      this.buffer,
      "head",
      this.head,
      "tail",
      this.tail
    )
    return out
  }
}
