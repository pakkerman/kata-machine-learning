type Item<K, V> = { key: K; value: V }
type Bucket<K, V> = Array<Item<K, V>>

export default class Map<T extends string | number, V> {
  public length: number
  private capacity: number
  private store: Array<Bucket<T, V>>
  constructor() {
    this.length = 0
    this.capacity = 3
    this.store = Array.from({ length: this.capacity }, () => [])
  }

  get(key: T): V | undefined {
    const hash = this.hash(key)
    for (const item of this.store[hash]) {
      if (item.key !== key) continue
      return item.value
    }
    return undefined
  }
  set(key: T, value: V): void {
    const hash = this.hash(key)
    for (const item of this.store[hash]) {
      if (key !== item.key) continue
      item.value = value
    }

    this.length++
    this.store[hash].push({ key, value })
  }
  delete(key: T): V | undefined {
    let out = undefined
    const hash = this.hash(key)
    const bucket = this.store[hash]
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key !== key) continue
      out = bucket[i].value
      this.length--
      bucket[i] = bucket[bucket.length - 1]
      bucket.pop()
      return out
    }

    return out
  }

  size(): number {
    return this.length
  }

  private hash(key: T): number {
    return (
      key
        .toString()
        .split("")
        .reduce((acc, curr) => acc + curr.charCodeAt(0) + 7, 0) % this.capacity
    )
  }

  private resize(): void {
    if (this.length < this.capacity) return
    console.log("resized")

    const store = this.store
    for (let i = 0; i < store.length; i++) {
      const bucket = store[i]
      for (let k = 0; k < bucket.length; k++) {
        const hash = this.hash(bucket[k].key)
        this.store[hash].push(bucket[k])
      }
    }
  }
}
