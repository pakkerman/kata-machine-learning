class Node<T> {
  public value: T
  public prev: Node<T> | undefined
  constructor(value: T) {
    this.value = value
  }
}

export default class Stack<T> {
  public length: number
  private head: Node<T> | undefined
  private tail: Node<T> | undefined

  constructor() {
    this.length = 0
  }

  push(item: T): void {
    const node = new Node(item)
    this.length++
    if (!this.tail) {
      this.head = this.tail = node
      return
    }

    node.prev = this.tail
    this.tail = node
  }

  pop(): T | undefined {
    if (!this.tail) return undefined

    const out = this.tail.value
    this.length--
    if (this.length === 0) {
      this.head = this.tail = undefined
      return out
    }

    this.tail = this.tail.prev
    return out
  }

  peek(): T | undefined {
    return this.head?.value
  }
}

