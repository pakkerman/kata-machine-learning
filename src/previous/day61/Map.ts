type Item<K, V> = {
  key: K
  value: V
}

type Bucket<K, V> = Array<Item<K, V>>

export default class Map<T extends string | number, V> {
  private length: number
  private capacity: number
  private store: Array<Bucket<T, V>>
  constructor(capacity: number = 3) {
    this.length = 0
    this.capacity = capacity
    this.store = Array.from({ length: this.capacity }, () => [])
  }

  get(key: T): V | undefined {
    const hash = this.hash(key)
    const bucket = this.store[hash]

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) return bucket[i].value
    }

    return undefined
  }
  set(key: T, value: V): void {
    this.length++
    const hash = this.hash(key)

    for (let i = 0; i < this.store[hash].length; i++) {
      if (this.store[hash][i].key === key) {
        this.store[hash][i].value = value
        return
      }
    }

    this.store[hash].push({ key, value })
  }
  delete(key: T): V | undefined {
    let out = undefined
    const hash = this.hash(key)

    let idx = -1
    for (let i = 0; i < this.store[hash].length; i++) {
      if (this.store[hash][i].key === key) {
        out = this.store[hash][i]
        idx = i
        break
      }
    }

    if (!out) return undefined
    this.length--

    this.store[hash][idx] = this.store[hash][this.store[hash].length - 1]
    this.store[hash].pop()
    return out.value
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
  }
}
