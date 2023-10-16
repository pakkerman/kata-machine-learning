export default function bfs(head: BinaryNode<number>, needle: number): boolean {
  const queue: (BinaryNode<number> | null)[] = [head]
  while (queue.length) {
    const curr = queue.shift()
    if (curr == undefined) continue
    if (curr.value === needle) return true

    if (needle < curr.value) queue.push(curr.left)
    else queue.push(curr.right)
  }
  return false
}
