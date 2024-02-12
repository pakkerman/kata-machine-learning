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
    const bucket = this.findEmptyBucket(key)
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) return bucket[i].value
    }

    return undefined
  }
  set(key: T, value: V): void {
    const bucket = this.findEmptyBucket(key)
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
    const bucket = this.findEmptyBucket(key)
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key !== key) continue

      this.length--
      const tmp = bucket[i]
      bucket[i] = bucket[bucket.length - 1]
      bucket[bucket.length - 1] = tmp
      return bucket.pop()!.value
    }

    return undefined
  }

  size(): number {
    return this.length
  }

  private hash(input: T): number {
    return (
      input
        .toString()
        .split("")
        .reduce((acc, curr) => acc + curr.charCodeAt(0) + 17, 0) % this.capacity
    )
  }

  private findEmptyBucket(key: T): Bucket<T, V> {
    let hash = this.hash(key)
    let bucket = this.store[hash]
    while (bucket.length && bucket[0].key !== key) {
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
        let storeBucket = this.findEmptyBucket(key)
        storeBucket.push({ key, value })
      }
    }
    console.log("resized!")
  }
}
