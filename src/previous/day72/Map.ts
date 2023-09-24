type Item<K, V> = { key: K; value: V }
type Bucket<K, V> = Array<Item<K, V>>

export default class Map<T extends string | number, V> {
  private length: number
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
      if (key !== bucket[i].key) continue
      return bucket[i].value
    }

    return undefined
  }

  set(key: T, value: V): void {
    const hash = this.hash(key)
    const bucket = this.store[hash]

    for (let i = 0; i < bucket.length; i++) {
      if (key !== bucket[i].key) continue
      this.resize()
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
      if (key !== bucket[i].key) continue

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
        .reduce((acc, char) => acc + char.charCodeAt(0) + 29, 3) % this.capacity
    )
  }

  private resize(): void {
    if (this.length <= this.capacity) return

    const data = this.store
    this.capacity *= 2
    this.store = Array.from({ length: this.capacity }, () => [])

    for (let i = 0; i < data.length; i++) {
      const bucket = data[i]
      for (let k = 0; k < bucket.length; k++) {
        const hash = this.hash(bucket[k].key)
        this.store[hash].push(bucket[k])
      }
    }

    console.log("Map resized", this.store)
  }
}
