export default function bfs(head: BinaryNode<number>, needle: number): boolean {
  const queue: BinaryNode<number>[] = [head]
  while (queue.length) {
    const curr = queue.shift()
    if (!curr) continue
    if (curr.value === needle) return true
    if (curr.left) queue.push(curr.left)
    if (curr.right) queue.push(curr.right)
  }
  return false
}

