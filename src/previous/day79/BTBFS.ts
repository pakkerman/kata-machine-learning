export default function bfs(head: BinaryNode<number>, needle: number): boolean {
  const queue: (BinaryNode<number> | null)[] = [head]

  while (queue) {
    const curr = queue.shift()
    if (!curr) return false
    if (curr.value === needle) return true
    queue.push(curr.left)
    queue.push(curr.right)
  }
  return false
}
