type Item<K, V> = { key: K; value: V; hash?: number }
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
    const bucket = this.getEmptyBucket(hash, key)
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) return bucket[i].value
    }

    return undefined
  }
  set(key: T, value: V): void {
    let hash = this.hash(key)
    const bucket = this.getEmptyBucket(hash, key)

    // let attempt = 0

    // // Look for an empty slot using linear probing
    // while (
    //   this.store[hash].length > 0 &&
    //   this.store[hash].every((item) => item.key !== key)
    // ) {
    //   attempt++
    //   hash = this.getNextBucket(hash, attempt)
    // }

    // const hash = this.hash(key)
    // for (let i = 0; i < bucket.length; i++) {
    //   if (bucket[i].key !== key) continue
    //   bucket[i].value = value
    //   return
    // }
    if (bucket.length === 0) {
      bucket.push({ key, value, hash })

      this.length++
      this.resize()
      return
    }

    if (bucket[0].key === key) {
      bucket[0].value = value
      return
    }
  }
  delete(key: T): V | undefined {
    let hash = this.hash(key)
    const bucket = this.getEmptyBucket(hash, key)

    // let attempt = 0

    // // Look for the item using linear probing
    // while (
    //   this.store[hash].length > 0 &&
    //   this.store[hash].every((item) => item.key !== key)
    // ) {
    //   attempt++
    //   hash = this.getNextBucket(hash, attempt)
    // }

    // // const hash = this.hash(key)
    // const bucket = this.store[hash]
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
    for (let i = 0; i < store.length; i++) {
      let bucket = store[i]
      for (let k = 0; k < bucket.length; k++) {
        const hash = this.hash(bucket[k].key)
        const emptyBucket = this.getEmptyBucket(hash, bucket[k].key)
        emptyBucket.push({ ...bucket[k], hash })
      }
    }
  }

  private getNextBucket(hash: number, attempt: number): number {
    // Linear probing: move to the next slot
    return (hash + attempt) % this.capacity
  }

  private getEmptyBucket(hash: number, key: T): Bucket<T, V> {
    while (
      this.store[hash].length !== 0 &&
      this.store[hash].every((item) => item.key != key)
    ) {
      hash = (hash + 1) % this.capacity
    }
    return this.store[hash]
  }
}
