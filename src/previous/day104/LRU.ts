// least recently used

class Node<T> {
  public value: T
  public next: Node<T> | undefined
  public prev: Node<T> | undefined

  constructor(value: T) {
    this.value = value
  }
}

export default class LRU<K, V> {
  private length: number
  private capacity: number
  private head?: Node<V>
  private tail?: Node<V>
  private nodes: Map<K, Node<V>>
  private keys: Map<Node<V>, K>

  constructor(capacity: number = 10) {
    this.length = 0
    this.capacity = capacity
    this.nodes = new Map()
    this.keys = new Map()
  }

  update(key: K, value: V): void {
    const node = this.nodes.get(key)
    if (!node) {
      const node = new Node(value)
      this.length++

      this.prepend(node)

      this.nodes.set(key, node)
      this.keys.set(node, key)

      this.trim()
    } else {
      this.detach(node)
      this.prepend(node)
    }
  }

  get(key: K): V | undefined {
    const node = this.nodes.get(key)
    if (!node) return undefined

    this.detach(node)
    this.prepend(node)

    return node.value
  }

  private prepend(node: Node<V>): void {
    if (!this.head) {
      this.head = this.tail = node
      return
    }

    node.next = this.head
    this.head.prev = node
    this.head = node
  }
  private detach(node: Node<V>): void {
    if (node.next) node.next.prev = node.prev
    if (node.prev) node.prev.next = node.next
    if (node === this.head) this.head = this.head.next
    if (node === this.tail) this.tail = this.tail.prev
  }
  private trim(): void {
    if (this.length <= this.capacity) return

    const tail = this.tail!
    const key = this.keys.get(tail)!

    this.nodes.delete(key)
    this.keys.delete(tail)

    this.detach(tail)
    this.length--
  }
}

