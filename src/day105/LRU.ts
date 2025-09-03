class Node<T> {
  public value: T
  public next?: Node<T>
  public prev?: Node<T>
  constructor(value: T) {
    this.value = value
  }
}

export default class LRU<K, V> {
  public length: number
  public capacity: number
  public head?: Node<V>
  public tail?: Node<V>
  public nodes: Map<K, Node<V>>
  public keys: Map<Node<V>, K>

  constructor(capacity: number) {
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
      this.trim()

      this.nodes.set(key, node)
      this.keys.set(node, key)
    } else {
      node.value = value
      this.detach(node)
      this.prepend(node)
    }
  }

  get(key: K): V | undefined {
    const node = this.nodes.get(key)
    if (!node) return undefined

    this.prepend(node)
    this.detach(node)

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

