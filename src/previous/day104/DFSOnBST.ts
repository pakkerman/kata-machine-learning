export default function dfs(head: BinaryNode<number>, needle: number): boolean {
  if (!head) return false
  if (head.value === needle) return true

  return dfs(head.left, needle) || dfs(head.right, needle)
}

