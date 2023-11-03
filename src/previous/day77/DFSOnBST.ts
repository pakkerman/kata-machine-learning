export default function dfs(head: BinaryNode<number>, needle: number): boolean {
  return recurse(head)

  function recurse(curr: BinaryNode<number> | null): boolean {
    if (!curr) return false
    if (curr.value === needle) return true

    if (needle < curr.value) return recurse(curr.left)
    else return recurse(curr.right)
  }
}
