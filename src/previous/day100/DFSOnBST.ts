export default function dfs(head: BinaryNode<number>, needle: number): boolean {
  return recurse(head)

  function recurse(curr: BinaryNode<number> | null): boolean {
    if (!curr) return false

    const value = curr.value
    if (value === needle) return true
    if (value < needle) return recurse(curr.right)
    else return recurse(curr.left)
  }
}

