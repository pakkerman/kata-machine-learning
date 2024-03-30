export default class ArrayList<T> {
  public length: number
  private capacity: number
  private data: Array<T | undefined>

  constructor(capacity: number = 3) {
    this.length = 0
    this.capacity = capacity
    this.data = new Array(this.capacity).fill(undefined)
  }

  prepend(item: T): void {
    this.length++
    this.resize()

    for (let i = this.length - 1; i > 0; i--) {
      this.data[i] = this.data[i - 1]
    }

    this.data[0] = item
  }

  insertAt(item: T, idx: number): void {
    if (idx === 0) return this.prepend(item)
    if (idx === this.length - 1) return this.append(item)

    this.length++
    this.resize()

    for (let i = this.length - 1; i > idx; i--) {
      this.data[i] = this.data[i - 1]
    }
    this.data[idx] = item
  }

  append(item: T): void {
    this.length++
    this.resize()
    this.data[this.length - 1] = item
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

    this.length--
    if (this.length === 0) {
      this.capacity = 3
      this.data = new Array(this.capacity).fill(undefined)
      return out
    }

    for (let i = idx; i < this.length + 1; i++) {
      this.data[i] = this.data[i + 1]
    }
    return out
  }

  private resize(): void {
    if (this.length < this.capacity) return

    this.data = Array.from(
      { length: (this.capacity *= 2) },
      (_, i) => this.data[i]
    )
  }
}

