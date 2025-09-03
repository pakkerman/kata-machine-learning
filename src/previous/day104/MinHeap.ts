export default class MinHeap {
  public length: number
  public data: Array<number>

  constructor() {
    this.length = 0
    this.data = []
  }

  insert(value: number): void {
    this.data[this.length] = value
    this.heapifyUp(this.length)
    this.length++
  }

  delete(): number {
    if (this.length === 0) return -1

    const out = this.data[0]
    if (out == null) return -1

    this.length--
    this.data[0] = this.data[this.length]
    this.data.pop()
    this.heapifyDown(0)

    return out
  }

  private heapifyUp(idx: number): void {
    if (idx === 0) return

    const [parent, parentVal] = this.parent(idx)
    const childVal = this.data[idx]

    if (parentVal <= childVal) return

    this.data[idx] = parentVal
    this.data[parent] = childVal
    this.heapifyUp(parent)
  }

  private heapifyDown(idx: number): void {
    if (this.length <= idx) return
    const [left, leftVal] = this.left(idx)
    const [right, rightVal] = this.right(idx)
    const parentVal = this.data[idx]

    if (this.length <= left) return
    if (parentVal < leftVal && parentVal < rightVal) return

    if (leftVal < rightVal) {
      this.data[idx] = leftVal
      this.data[left] = parentVal
      this.heapifyDown(left)
    } else if (rightVal < leftVal) {
      this.data[idx] = rightVal
      this.data[right] = parentVal
      this.heapifyDown(right)
    }
  }

  private parent(idx: number): [idx: number, val: number] {
    const i = Math.floor((idx - 1) / 2)
    return [i, this.data[i]]
  }

  private left(idx: number): [idx: number, val: number] {
    const i = idx * 2 + 1
    return [i, this.data[i]]
  }
  private right(idx: number): [idx: number, val: number] {
    const i = idx * 2 + 2

    return [i, this.data[i]]
  }
}
