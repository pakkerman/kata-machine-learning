type Item<K, V> = { key: K; value: V }
type Bucket<K, V> = Array<Item<K, V>>

export default class Map<T extends string | number, V> {
  public length: number
  public capacity: number
  public store: Array<Bucket<T, V>>

  constructor(capacity: number = 3) {
    this.length = 0
    this.capacity = capacity
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
    const hash = this.hash(key)
    const bucket = this.store[hash]
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key !== key) continue
      bucket[i].value = value
      return
    }

    this.length++
    this.resize()
    bucket.push({ key, value })
  }
  delete(key: T): V | undefined {
    const hash = this.hash(key)
    const bucket = this.store[hash]

    let out = undefined
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key !== key) continue
      out = bucket[i].value
      bucket[i] === bucket[bucket.length - 1]
      bucket.pop()
      this.length--
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
    if (this.length < this.capacity) return

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
