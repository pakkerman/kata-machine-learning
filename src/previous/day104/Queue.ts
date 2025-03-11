class Node<T> {
  public value: T
  public next: Node<T>
  constructor(value: T) {
    this.value = value
  }
}

export default class Queue<T> {
  public length: number
  private head: Node<T> | undefined
  private tail: Node<T> | undefined

  constructor() {
    this.length = 0
  }

  enqueue(item: T): void {
    const node = new Node(item)
    this.length++
    if (!this.tail) {
      this.head = this.tail = node
      return
    }

    this.tail.next = node
    this.tail = node
  }

  deque(): T | undefined {
    if (!this.head) return undefined

    const out = this.head.value
    this.length--
    if (this.length === 0) {
      this.head = this.tail = undefined
      return out
    }

    this.head = this.head.next
    return out
  }

  peek(): T | undefined {
    return this.head?.value
  }
}

