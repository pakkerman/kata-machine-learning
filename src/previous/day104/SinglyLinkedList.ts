class Node<T> {
  public value: T
  public next: Node<T> | undefined
  constructor(value: T) {
    this.value = value
  }
}

export default class SinglyLinkedList<T> {
  public length: number
  public head: Node<T> | undefined
  public tail: Node<T> | undefined

  constructor() {
    this.length = 0
    this.head = undefined
    this.tail = undefined
  }

  prepend(item: T): void {
    const node = new Node(item)
    this.length++

    if (!this.head) {
      this.head = this.tail = node
      return
    }

    node.next = this.head
    this.head = node
  }

  insertAt(item: T, idx: number): void {
    if (idx === 0) return this.prepend(item)
    if (idx === this.length - 1) return this.append(item)

    const curr = this.getNode(idx)
    if (!curr) throw Error("idx out of range")

    const node = new Node(item)
    this.length++

    node.next = curr.next
    curr.next = node
    node.value = curr.value
    curr.value = item
  }

  append(item: T): void {
    const node = new Node(item)
    this.length++
    if (!this.tail) {
      this.head = this.tail = node
      return
    }

    this.tail.next = node
    this.tail = node
  }

  remove(item: T): T | undefined {
    let curr = this.head
    for (let i = 0; i < this.length; i++) {
      if (!curr) return undefined
      if (curr.value === item) return this.removeAt(i)
      curr = curr.next
    }
    return undefined
  }

  get(idx: number): T | undefined {
    return this.getNode(idx)?.value
  }

  removeAt(idx: number): T | undefined {
    const node = this.getNode(idx)
    if (!node) return undefined

    const out = node.value
    this.length--
    if (this.length === 0) {
      this.head = this.tail = undefined
      return out
    }

    if (node === this.head) this.head = this.head.next
    if (node === this.tail) this.tail = this.getNode(idx - 1)
    if (node.next === this.tail) this.tail = node
    if (node.next) {
      node.value = node.next.value
      node.next = node.next.next
    }
    return out
  }

  getNode(idx: number): Node<T> | undefined {
    let curr = this.head
    for (let i = 0; i < idx; i++) {
      if (!curr) return undefined

      curr = curr.next
    }

    return curr
  }
}
