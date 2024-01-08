type Item<K, V> = { key: K; value: V }
type Bucket<K, V> = Array<Item<K, V>>

export default class Map<T extends string | number, V> {
  public length: number
  public capacity: number
  public store: Array<Bucket<T, V>>

  constructor() {
    this.length = 0
    this.capacity = 3
    this.store = Array.from({ length: this.capacity }, () => [])
  }

  get(key: T): V | undefined {
    const hash = this.hash(key)
    const bucket = this.getNextEmptyBucket(hash, key)
    for (const item of bucket) {
      if (item.key !== key) continue
      return item.value
    }

    return undefined
  }
  set(key: T, value: V): void {
    const hash = this.hash(key)
    const bucket = this.getNextEmptyBucket(hash, key)
    for (const item of bucket) {
      if (item.key !== key) continue
      item.value = value
      return
    }

    this.store[hash].push({ key, value })
    this.length++
    this.resize()
  }

  delete(key: T): V | undefined {
    const hash = this.hash(key)
    const bucket = this.getNextEmptyBucket(hash, key)

    let out = undefined
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key !== key) continue
      this.length--
      out = bucket[i].value
      bucket[i] = bucket[bucket.length - 1]
      bucket.pop()
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

  private getNextEmptyBucket(hash: number, key: T): Bucket<T, V> {
    console.log(hash, key)
    let bucket = this.store[hash]
    console.log(bucket)
    while (bucket && bucket.length !== 0) {
      for (const item of bucket) {
        if (item.key !== key) {
          hash = (hash + 1) % this.capacity
          bucket = this.store[hash]
          continue
        }
        return bucket
      }
    }

    return bucket
  }

  private resize(): void {
    if (this.length < this.capacity) return

    const data = this.store
    this.store = Array.from({ length: (this.capacity *= 2) }, () => [])

    for (const bucket of data) {
      for (let i = 0; i < bucket.length; i++) {
        const hash = this.hash(bucket[i].key)
        this.store[hash].push(bucket[i])
      }
    }
  }
}
