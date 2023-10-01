type Item<K, V> = { key: K; value: V }
type Bucket<K, V> = Array<Item<K, V>>

export default class Map<T extends string | number, V> {
  public length: number
  private capacity: number
  private store: Array<Bucket<T, V>>
  constructor(capacity: number = 3) {
    this.length = 0
    this.capacity = capacity
    this.store = Array.from({ length: capacity }, () => [])
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
      if (key !== bucket[i].key) continue
      bucket[i].value = value
      return
    }

    this.length++
    bucket.push({ key, value })
  }
  delete(key: T): V | undefined {
    const hash = this.hash(key)
    const bucket = this.store[hash]

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key !== key) continue
      const out = bucket[i].value
      this.length--
      bucket[i] = bucket[bucket.length - 1]
      bucket.pop()
      return out
    }

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
        .reduce((acc, char) => {
          return acc + char.charCodeAt(0)
        }, 0) % this.capacity
    )
  }
}
