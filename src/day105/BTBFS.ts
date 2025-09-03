export default function bfs(head: BinaryNode<number>, needle: number): boolean {
  // binary tree breath first search
  if (!head) return false

  const queue: BinaryNode<number>[] = [head]
  while (queue.length) {
    const curr = queue.pop()!

    if (curr.value === needle) return true
    if (curr.left) queue.push(curr.left)
    if (curr.right) queue.push(curr.right)
  }
  return false
}

