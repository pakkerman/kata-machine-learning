export default class RingBuffer<T> {
  public length: number
  public capacity: number
  public head: number
  public tail: number
  public buffer: (T | undefined)[]

  constructor(capacity: number = 3) {
    this.length = 0
    this.capacity = capacity
    this.head = this.tail = 0
    this.buffer = new Array(this.capacity).fill(undefined)
  }

  push(item: T): void {
    this.length++
    this.buffer[this.tail] = item

    this.tail = (this.tail + 1) % this.capacity

    console.log(
      "inserted",
      this.buffer,
      `len: ${this.length}, tail: ${this.tail}`
    )
  }
  pop(): T | undefined {
    const out = this.buffer[this.head]
    if (out == undefined) return undefined
    this.length--

    this.buffer[this.head] = undefined

    if (this.length === 0) {
      this.head = this.tail = 0
      console.log(
        "popped",
        this.buffer,
        `len: ${this.length}, head:${this.head}`
      )
      return out
    }

    this.head = (this.head + 1) % this.capacity
    console.log("popped", this.buffer, `len: ${this.length}, head:${this.head}`)
    return out
  }
  get(idx: number): T | undefined {
    return this.buffer[idx]
  }
}
