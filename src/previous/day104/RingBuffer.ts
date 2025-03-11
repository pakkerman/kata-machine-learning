export default class RingBuffer<T> {
  public length: number
  public capacity: number
  public buffer: Array<T | undefined>
  private read: number
  private write: number

  constructor(capacity: number = 3) {
    this.length = 0
    this.capacity = capacity
    this.buffer = new Array(this.capacity)

    this.read = 0
    this.write = 0
  }

  push(item: T): void {
    this.buffer[this.write] = item
    if (this.length < this.capacity) this.length++

    this.write = (this.write + 1) % this.capacity
    if (this.read === this.write) {
      this.read = (this.read + 1) % this.capacity
    }
  }
  get(idx: number): T | undefined {
    return this.buffer[idx]
  }
  pop(): T | undefined {
    // get out the data with read pointer
    // check valid
    // set buffer at read pointer to undefined
    // take out length
    // check length if 0 set pointers to 0 and return
    // move read pointer
    // return out

    const out = this.buffer[this.read]
    if (out == undefined) return undefined

    this.buffer[this.read] = undefined
    this.length--
    if (this.length === 0) {
      this.read = 0
      this.write = 0
      return out
    }

    this.read = (this.read + 1) % this.capacity
    return out
  }
}
