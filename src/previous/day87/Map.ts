type Item<K, V> = { key: K; value: V }
type Bucket<K, V> = Array<Item<K, V>>

export default class Map<T extends string | number, V> {
  public length: number
  public capacity: number
  public store: Array<Bucket<T, V>>
  constructor() {
    this.length = 0
    this.capacity = 1
    this.store = Array.from({ length: this.capacity }, () => [])
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
      if (item.key === key) {
        item.value = value
        return
      }
    }

    bucket.push({ key, value })
    this.length++
    this.resize()
  }
  delete(key: T): V | undefined {
    const hash = this.hash(key)
    let bucket = this.getEmptyBucket(hash, key)

    let out = undefined
    for (const item of bucket) {
      if (item.key === key) {
        out = item.value

        this.length--
        item.key = bucket[bucket.length - 1].key
        item.value = bucket[bucket.length - 1].value
        bucket.pop()
        return out
      }
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

    console.log("resized")
  }

  // due review
  private getEmptyBucket(hash: number, key: T): Bucket<T, V> {
    let originalHash = hash

    while (true) {
      let bucket = this.store[hash]

      if (!bucket || bucket.length === 0) {
        return bucket
      }

      for (const item of bucket) {
        if (item.key === key) {
          return bucket
        }
      }

      hash = (hash + 1) % this.capacity
      // Check if we have searched all buckets
      if (hash === originalHash) break
    }

    return this.store[hash]
  }
}
