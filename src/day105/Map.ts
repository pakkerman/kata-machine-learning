type Item<K, V> = { key: K; value: V }
type Bucket<K, V> = Array<Item<K, V>>

// next time, pick one of the two, linear probing or spearate chaining,
// right now the code is mixin of the two, which is not making sense

export default class Map<T extends string | number, V> {
  public length: number
  public capacity: number
  public store: Array<Bucket<T, V>>
  private maxProbes: number
  constructor(capacity: number = 5) {
    this.length = 0
    this.capacity = capacity
    this.store = Array.from({ length: this.capacity }, () => [])
    this.maxProbes = 8
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
    let hash = this.hash(key)
    console.log("setting", key, value, "hash: ", hash)
    let bucket = this.store[hash]
    let count = this.capacity
    for (let i = 0; i < this.maxProbes; i++) {
      hash = (hash + 1) % this.capacity
      console.log("bump hash by 1: ", hash)
      bucket = this.store[hash]
      count--
    }
    console.log(bucket)

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket[i].value = value
        return
      }
    }

    bucket.push({ key, value })
    this.length++

    this.resize()
  }

  delete(key: T): V | undefined {
    const hash = this.hash(key)
    const bucket = this.store[hash]

    let out = undefined
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key !== key) continue

      out = bucket[i].value
      this.length--
      const newBucket = []

      for (let k = 0; k < bucket.length; k++) {
        if (bucket[k].key === key) continue
        newBucket.push(bucket[k])
      }

      this.store[hash] = newBucket
    }

    return out
  }
  size(): number {
    return this.length
  }

  private hash(input: T) {
    return this.fnv1a32(String(input)) % this.capacity
  }

  private fnv1a32(input: string): number {
    // 32-bit FNV-1a for UTF-16 code units; if you need UTF-8, encode first
    let h = 0x811c9dc5 >>> 0 // offset basis
    for (let i = 0; i < input.length; i++) {
      h ^= input.charCodeAt(i)
      h = Math.imul(h, 0x01000193) // FNV prime 16777619
    }
    return h >>> 0
  }

  private resize(): void {
    if (this.length < this.capacity) return

    const old = this.store
    this.store = Array.from({ length: (this.capacity *= 2) }, () => [])

    for (let i = 0; i < old.length; i++) {
      const bucket = old[i]
      for (let k = 0; k < bucket.length; k++) {
        let hash = this.hash(bucket[k].key)
        let count = this.capacity
        for (let i = 0; i < this.maxProbes; i++) {
          hash = (hash + 1) % this.capacity
        }
        this.store[hash].push(bucket[k])
      }
    }
  }
}
