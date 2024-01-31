type Item<K, V> = { key: K; value: V }
type Bucket<K, V> = Array<Item<K, V>>

export default class Map<T extends string | number, V> {
  private length: number
  private capacity: number
  public store: Array<Bucket<T, V>>
  constructor(capacity: number = 2) {
    this.length = 0
    this.capacity = capacity
    this.store = Array.from({ length: capacity }, () => [])
  }

  get(key: T): V | undefined {
    const hash = this.hash(key)
    let bucket = this.getEmptyBucket(hash, key)

    for (const item of bucket) {
      if (item.key === key) return item.value
    }

    return undefined
  }
  set(key: T, value: V): void {
    const hash = this.hash(key)
    let bucket = this.getEmptyBucket(hash, key)

    for (const item of bucket) {
      if (item.key !== key) continue

      item.value = value
      return
    }

    this.length++
    this.resize()
    bucket.push({ key, value })
  }
  delete(key: T): V | undefined {
    const hash = this.hash(key)
    let bucket = this.getEmptyBucket(hash, key)

    let out = undefined
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key !== key) continue

      out = bucket[i].value
      bucket[i] = bucket[bucket.length - 1]
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
        .reduce((acc, curr) => acc + curr.charCodeAt(0) + 7, 0) % this.capacity
    )
  }

  private getEmptyBucket(hash: number, key: T): Bucket<T, V> {
    let bucket = this.store[hash]
    while (bucket && bucket.length && key !== bucket[0].key) {
      hash = (hash + 1) % this.capacity
      bucket = this.store[hash]
    }

    return bucket
  }

  private resize(): void {
    if (this.length < this.capacity) return

    const store = this.store
    this.store = Array.from({ length: (this.capacity *= 2) }, () => [])

    for (const bucket of store) {
      for (const { key, value } of bucket) {
        const hash = this.hash(key)
        let storeBucket = this.getEmptyBucket(hash, key)
        storeBucket.push({ key, value })
      }
    }
    console.log("resized!")
  }
}
