type Item<K, V> = { key: K; value: V }
type Bucket<K, V> = Array<Item<K, V>>

export default class Map<T extends string | number, V> {
  public length: number
  public capacity: number
  public store: Array<Bucket<T, V>>

  constructor(capacity: number = 3) {
    this.length = 0
    this.capacity = capacity
    this.store = Array.from({ length: capacity }, () => [])
  }

  get(key: T): V | undefined {
    const hash = this.hash(key)
    const bucket = this.store[hash]
    for (const item of bucket) {
      if (item.key === key) return item.value
    }
    return undefined
  }

  set(key: T, value: V): void {
    let hash = this.hash(key)
    const bucket = this.store[hash]
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket[i].value = value
        return
      }
    }

    this.store[hash].push({ key, value })
    this.length++
    this.resize()
  }

  delete(key: T): V | undefined {
    const hash = this.hash(key)
    const bucket = this.store[hash]
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        this.length--
        const removedItem = bucket[i]
        bucket.splice(i, 1) // Remove the item from the bucket
        return removedItem.value
      }
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
        .reduce((acc, curr) => acc + curr.charCodeAt(0), 37) % this.capacity
    )
  }
  private resize(): void {
    if (this.length < this.capacity) return

    const store = this.store
    this.store = Array.from({ length: (this.capacity *= 2) }, () => [])
    for (let i = 0; i < store.length; i++) {
      const bucket = this.store[i]
      for (let k = 0; k < bucket.length; k++) {
        const hash = this.hash(bucket[k].key)
        this.store[hash].push(bucket[k])
      }
    }
  }
}
