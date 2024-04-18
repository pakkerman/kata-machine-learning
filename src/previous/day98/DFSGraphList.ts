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

    path.push(curr)
    seen[curr] = true

    if (curr === needle) return true

    const list = graph[curr]
    for (const { to: edge } of list) {
      if (recurse(edge)) return true
    }

    path.pop()
    return false
  }
}

