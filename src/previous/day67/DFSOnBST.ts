export default function dfs(head: BinaryNode<number>, needle: number): boolean {
  return search(head)

  function search(curr: BinaryNode<number> | null): boolean {
    if (!curr) return false
    if (needle === curr.value) return true
    if (needle < curr.value) return search(curr.left)
    return search(curr.right)
  }
}
