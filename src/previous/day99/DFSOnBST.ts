export default function dfs(head: BinaryNode<number>, needle: number): boolean {
  return recurse(head)

  function recurse(curr: BinaryNode<number> | null): boolean {
    if (!curr) return false
    if (curr.value === needle) return true
    if (curr.value < needle) return recurse(curr.right)
    else return recurse(curr.left)
  }
}

