type Item<K, V> = { key: K; value: V }
type Bucket<K, V> = Array<Item<K, V>>

export default class Map<T extends string | number, V> {
  public length: number
  public capacity: number
  private store: Array<Bucket<T, V>>
  constructor() {
    this.length = 0
    this.capacity = 3
    this.store = Array.from({ length: this.capacity }, () => [])
  }

  get(key: T): V | undefined {
    const hash = this.hash(key)
    const bucket = this.store[hash]

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key !== key) continue
      return bucket[i].value
    }

    return undefined
  }
  set(key: T, value: V): void {
    console.log("setting:", key, value)
    const hash = this.hash(key)
    console.log(hash)
    const bucket = this.store[hash]

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key !== key) continue
      bucket[i].value = value
      return
    }

    const item = { key, value }
    bucket.push(item)
    this.length++
    this.resize()

    console.log(this.store)
  }
  delete(key: T): V | undefined {
    const hash = this.hash(key)
    const bucket = this.store[hash]

    // The item exist
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key !== key) continue
      const out = bucket[i].value
      bucket[i] = bucket[bucket.length - 1]
      bucket.pop()
      this.length--
      return out
    }

    // The item doesn't exist
    return undefined
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
    if (this.length <= this.capacity) return

    const data = this.store
    this.store = Array.from({ length: (this.capacity *= 2) }, () => [])

    for (let i = 0; i < data.length; i++) {
      const bucket = data[i]
      for (let k = 0; k < bucket.length; k++) {
        const hash = this.hash(bucket[k].key)
        this.store[hash].push(bucket[k])
      }
    }
  }
}
