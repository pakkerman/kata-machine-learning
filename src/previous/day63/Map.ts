type Item<K, V> = { key: K; value: V }
type Bucket<K, V> = Item<K, V>[]

export default class Map<T extends string | number, V> {
  private length: number
  private capacity: number
  private store: Bucket<T, V>[]
  constructor() {
    this.length = 0
    this.capacity = 3
    this.store = Array.from({ length: this.capacity }, () => [])
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
    this.resize()

    for (let i = 0; i < this.store[hash].length; i++) {
      if (this.store[hash][i].key === key) {
        this.store[hash][i].value = value
        return
      }
    }

    this.length++
    this.store[hash].push({ key, value })
  }
  delete(key: T): V | undefined {
    const hash = this.hash(key)

    for (let i = 0; i < this.store[hash].length; i++) {
      if (this.store[hash][i].key === key) {
        const out = this.store[hash][i].value
        this.length--
        this.store[hash][i] = this.store[hash][this.store[hash].length - 1]
        this.store[hash].pop()
        return out
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
        .map((char) => char.charCodeAt(0))
        .reduce((a, b) => a + b + 29) % this.capacity
    )
  }

  private resize(): void {
    if (this.length <= this.capacity) return

    const store = this.store
    this.capacity *= 2
    this.store = Array.from({ length: this.capacity }, () => [])

    for (let i = 0; i < store.length; i++) {
      const bucket = store[i]
      for (let k = 0; k < bucket.length; k++) {
        const hash = this.hash(bucket[k].key)
        this.store[hash].push(bucket[k])
      }
    }
  }
}
