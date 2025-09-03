class Node<T> {
  public value: T | undefined
  public next?: Node<T>
  constructor(value: T | undefined) {
    this.value = value
  }
}

export default class SinglyLinkedList<T> {
  public length: number
  public head?: Node<T>
  public tail?: Node<T>

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
    if (idx <= 0) return this.prepend(item)
    if (this.length - 1 <= idx) return this.append(item)

    const { curr } = this.getNode(idx)
    if (!curr) throw new Error("invalid idx")

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
    for (let i = 0; i < this.length && curr; i++) {
      if (curr.value === item) return this.removeAt(i)
      curr = curr.next
    }

    return undefined
  }

  get(idx: number): T | undefined {
    return this.getNode(idx).curr?.value
  }
  removeAt(idx: number): T | undefined {
    if (idx < 0 || this.length <= idx) return undefined

    const { prev, curr } = this.getNode(idx)
    if (!curr) return undefined

    const out = curr.value
    this.length--
    if (this.length === 0) {
      this.head = this.tail = undefined
      return out
    }

    if (this.head === curr) this.head = this.head.next
    if (this.tail === curr) this.tail = prev
    if (this.tail === curr.next) this.tail = curr
    if (curr.next) {
      curr.value = curr.next.value
      curr.next = curr.next.next
    }

    return out
  }

  private getNode(idx: number): {
    curr: Node<T> | undefined
    prev: Node<T> | undefined
  } {
    let curr = this.head
    let prev = undefined
    for (let i = 0; i < idx && curr; i++) {
      prev = curr
      curr = curr.next
    }

    return { prev, curr }
  }
}
