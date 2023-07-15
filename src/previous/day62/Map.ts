type Item<K, V> = { key: K; value: V }
type Bucket<K, V> = Array<Item<K, V>>

export default class Map<T extends string | number, V> {
  private length: number
  private capacity: number
  private store: Bucket<T, V>[]
  constructor(capacity: number = 3) {
    this.length = 0
    this.capacity = capacity
    this.store = Array.from({ length: this.capacity }, () => [])
  }

  get(key: T): V | undefined {
    const hash = this.hash(key)

    let out: V | undefined = undefined
    for (let i = 0; i < this.store[hash].length; i++) {
      if (this.store[hash][i].key === key) out = this.store[hash][i].value
    }

    return out
  }
  set(key: T, value: V): void {
    const hash = this.hash(key)
    for (let i = 0; i < this.store[hash].length; i++) {
      if (this.store[hash][i].key === key) {
        this.store[hash][i].value = value
        return
      }
    }

    this.length++
    this.store[hash].push({ key, value })
    this.resize()
  }
  delete(key: T): V | undefined {
    const hash = this.hash(key)
    console.log(this.store)

    let out: V | undefined = undefined
    for (let i = 0; i < this.store[hash].length; i++) {
      if (this.store[hash][i].key === key) {
        out = this.store[hash][i].value
        this.store[hash][i] = this.store[hash][this.store[hash].length - 1]
        this.length--
      }
    }

    this.store[hash].pop()
    console.log(this.store)
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
        .reduce((a, b) => a + b + 13) % this.capacity
    )
  }
  private resize(): void {
    if (this.length < this.capacity) return
    this.capacity *= 2
    const data = this.store
    this.store = Array.from({ length: this.capacity }, () => [])
    for (let i = 0; i < this.store[i].length; i++) {
      const bucket = data[i]
      for (let k = 0; k < bucket.length; k < 0) {
        const hash = this.hash(bucket[k].key)
        this.store[hash].push(bucket[k])
      }
    }
  }
}
