export default class ArrayList<T> {
  public length: number
  public capacity: number
  public data: Array<T | undefined>

  constructor(capacity: number) {
    this.length = 0
    this.capacity = capacity
    this.data = new Array(this.capacity).fill(undefined)
  }

  prepend(item: T): void {
    this.length++
    this.resize()
    this.shiftRight(0, this.length - 1)

    this.data[0] = item
  }
  insertAt(item: T, idx: number): void {
    this.length++
    this.resize()
    this.shiftRight(idx, this.length - 1)
    this.data[idx] = item
  }
  append(item: T): void {
    this.length++
    this.resize()
    this.data[this.length - 1] = item
  }
  remove(item: T): T | undefined {
    let out = undefined
    for (let i = 0; i < this.length; i++) {
      if (this.data[i] !== item) continue

      out = this.data[i]
      this.length--
      this.shiftLeft(i, this.length + 1)
    }
    return out
  }
  get(idx: number): T | undefined {
    return this.data[idx]
  }
  removeAt(idx: number): T | undefined {
    const out = this.get(idx)
    if (out == undefined) return undefined

    this.length--
    if (this.length === 0) {
      this.capacity = 3
      this.data = new Array(this.capacity).fill(undefined)
      return out
    }

    this.shiftLeft(idx, this.length + 1)
    return out
  }

  private resize(): void {
    if (this.length < this.capacity) return

    const data = this.data
    this.data = new Array((this.capacity *= 2)).fill(undefined)

    for (let i = 0; i < data.length; i++) {
      this.data[i] = data[i]
    }

    console.log(`Array resized`)
  }

  private shiftRight(leftBound: number, rightBound: number): void {
    for (let i = rightBound; leftBound < i; i--) {
      this.data[i] = this.data[i - 1]
    }
  }

  private shiftLeft(leftBound: number, rightBound: number): void {
    for (let i = leftBound; i < rightBound; i++) {
      this.data[i] = this.data[i + 1]
    }
  }
}
