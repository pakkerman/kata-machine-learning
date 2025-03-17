export default function bfs(head: BinaryNode<number>, needle: number): boolean {
  const queue: BinaryNode<number>[] = [head]

  while (queue.length) {
    const curr = queue.shift()!
    const val = curr.value
    if (val === needle) return true

    if (curr.left) queue.push(curr.left)
    if (curr.right) queue.push(curr.right)
  }
  return false
}

