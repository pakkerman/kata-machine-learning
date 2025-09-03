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
    this.resize()

    for (let i = this.length; i > 0; i--) {
      this.data[i] = this.data[i - 1]
    }

    this.data[0] = item
    this.length++
  }

  insertAt(item: T, idx: number): void {
    if (idx === 0) return this.prepend(item)
    if (idx === this.length - 1) return this.append(item)

    this.resize()

    for (let i = this.length; i > idx; i--) {
      this.data[i] = this.data[i - 1]
    }

    this.data[idx] = item
    this.length++
  }

  append(item: T): void {
    this.resize()
    this.data[this.length] = item
    this.length++
  }

  remove(item: T): T | undefined {
    for (let i = 0; i < this.length; i++) {
      if (this.data[i] === item) return this.removeAt(i)
    }
    return undefined
  }

  get(idx: number): T | undefined {
    return this.data[idx]
  }

  removeAt(idx: number): T | undefined {
    const out = this.data[idx]
    if (out == undefined) return undefined

    if (this.length === 0) {
      this.capacity = 3
      this.data = new Array(this.capacity).fill(undefined)
      return out
    }

    for (let i = idx; i < this.length; i++) {
      this.data[i] = this.data[i + 1]
    }

    this.length--
    return out
  }

  private resize() {
    if (this.length < this.capacity) return

    const data = this.data
    this.data = new Array((this.capacity *= 2)).fill(undefined)
    for (let i = 0; i < data.length; i++) {
      this.data[i] = data[i]
    }
  }
}

