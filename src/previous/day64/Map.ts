type Item<K, V> = { key: K; value: V }
type Bucket<K, V> = Array<Item<K, V>>

export default class Map<T extends string | number, V> {
  private length: number
  private capacity: number
  private store: Bucket<T, V>[]
  constructor(capacity: number = 3) {
    this.length = 0
    this.capacity = capacity
    this.store = Array.from({ length: capacity }, () => [] as Bucket<T, V>)
  }

  get(key: T): V | undefined {
    const hash = this.hash(key)
    for (let i = 0; i < this.store[hash].length; i++) {
      if (this.store[hash][i].key === key) return this.store[hash][i].value
    }
    return undefined
  }
  set(key: T, value: V): void {
    const hash = this.hash(key)
    const bucket = this.store[hash]
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket[i].value = value
        return
      }
    }

    const item = { key, value }
    this.length++
    this.store[hash].push(item)
    this.resize()
  }
  delete(key: T): V | undefined {
    const hash = this.hash(key)
    const bucket = this.store[hash]
    if (bucket.length === 0) return undefined

    let out = undefined
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key !== key) continue
      out = bucket[i].value
      bucket[i] = bucket[bucket.length - 1]
    }

    if (out == undefined) return undefined

    this.length--
    bucket.pop()
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
        .reduce((a, b) => a + b + 7, 13) % this.capacity
    )
  }

  private resize(): void {
    if (this.length < this.capacity) return
    const data = this.store
    this.store = Array.from({ length: (this.capacity *= 2) }, () => [])

    data.forEach((bucket) =>
      bucket.forEach((item) => {
        const hash = this.hash(item.key)
        this.store[hash].push(item)
      })
    )
    console.log("resized!", this.store)
  }
}
