type Item<K, V> = { key: K; value: V }
type Bucket<K, V> = Array<Item<K, V>>

export default class Map<T extends string | number, V> {
  public length = 0
  public capacity = 0
  private store: Array<Bucket<T, V>>
  constructor(capacity: number = 3) {
    this.length = 0
    this.capacity = capacity
    this.store = Array.from({ length: this.capacity }, () => [] as Bucket<T, V>)
  }

  get(key: T): V | undefined {
    const hash = this.hash(key)
    const bucket = this.store[hash]

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) return bucket[i].value
    }
    return undefined
  }
  set(key: T, value: V): void {
    const hash = this.hash(key)
    const bucket = this.store[hash]

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key !== key) continue
      bucket[i].value = value
      return
    }

    this.length++
    this.store[hash].push({ key, value })
    this.resize()
  }
  delete(key: T): V | undefined {
    const hash = this.hash(key)
    const bucket = this.store[hash]

    const out = undefined
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key !== key) continue
      this.length--
      const out = bucket[i].value
      bucket[i] = bucket[bucket.length - 1]
      this.store[hash].pop()
      return out
    }

    return out
  }
  size(): number {
    return this.length
  }

  private hash(input: T): number {
    return (
      input
        .toString()
        .split("")
        .map((char) => char.charCodeAt(0))
        .reduce((acc, curr) => acc + curr + 13) % this.capacity
    )
  }

  private resize(): void {
    if (this.length <= this.capacity) return
    console.log(this.store)
    const store = this.store
    this.store = Array.from({ length: (this.capacity *= 2) }, () => [])

    for (let i = 0; i < store.length; i++) {
      const bucket = store[i]
      for (let k = 0; k < bucket.length; k++) {
        const hash = this.hash(bucket[k].key)
        this.store[hash].push(bucket[k])
      }
    }
    console.log(this.store)
  }
}
