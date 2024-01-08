export default function dfs(head: BinaryNode<number>, needle: number): boolean {
  return recurse(head)

  function recurse(curr: BinaryNode<number> | null): boolean {
    if (!curr) return false
    if (curr.value === needle) return true

    return recurse(curr.left) || recurse(curr.right)
  }
}
