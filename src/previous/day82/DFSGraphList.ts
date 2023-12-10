export default function dfs(
  graph: WeightedAdjacencyList,
  source: number,
  needle: number
): number[] | null {
  const path: number[] = []
  const seen: boolean[] = new Array(graph.length).fill(false)
  recurse(source)
  return path.length ? path : null

  function recurse(curr: number): boolean {
    if (seen[curr]) return false

    seen[curr] = true
    path.push(curr)
    if (curr === needle) return true

    const list = graph[curr]
    for (let i = 0; i < list.length; i++) {
      if (recurse(list[i].to)) return true
    }

    path.pop()
    return false
  }
}
