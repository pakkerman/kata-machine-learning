type Slot<K, V> = { key: K; value: V }

export default class Map<T extends string | number, V> {
  public length: number
  public capacity: number
  public store: Array<Slot<T, V> | undefined>
  constructor() {
    this.length = 0
    this.capacity = 3
    this.store = new Array(this.capacity).fill(undefined)
  }

  get(key: T): V | undefined {
    const slotIdx = this.getSlot(key)
    return this.store[slotIdx]?.value
  }

  set(key: T, value: V): void {
    const slotIdx = this.getSlot(key)
    if (this.store[slotIdx] == undefined) {
      this.store[slotIdx] = { key, value }
      this.length++
      this.resize()
      return
    }

    this.store[slotIdx]!.value = value
    return
  }

  delete(key: T): V | undefined {
    const slotIdx = this.getSlot(key)
    if (this.store[slotIdx] == undefined) {
      return undefined
    }

    const out = this.store[slotIdx]!.value
    this.store[slotIdx] = undefined
    this.length--
    return out
  }

  size(): number {
    return this.length
  }

  private getSlot(key: T): number {
    let idx = this.hash(key)
    if (!this.store[idx]) return idx

    while (this.store[idx] != undefined && this.store[idx]?.key !== key) {
      idx = (idx + 1) % this.capacity
    }

    return idx
  }

  private hash(input: T): number {
    return (
      input
        .toString()
        .split("")
        .reduce((acc, curr) => acc + curr.charCodeAt(0), 7) % this.capacity
    )
  }

  private resize(): void {
    if (this.length < this.capacity) return

    const store = this.store
    this.store = new Array((this.capacity *= 2)).fill(undefined)
    for (const item of store) {
      if (!item) continue

      const { key, value } = item
      const slotIdx = this.getSlot(key)
      this.store[slotIdx] = { key, value }
    }
  }
}
