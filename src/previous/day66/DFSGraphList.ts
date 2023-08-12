export default function dfs(
  graph: WeightedAdjacencyList,
  source: number,
  needle: number
): number[] | null {
  const path: Array<number> = []
  const seen: Array<boolean> = new Array(graph.length).fill(false)

  explore(source)
  return path.length ? path : null

  function explore(curr: number): boolean {
    if (seen[curr]) return false
    seen[curr] = true
    path.push(curr)

    if (curr === needle) return true

    const list = graph[curr]
    for (let i = 0; i < list.length; i++) {
      if (explore(list[i].to)) return true
    }

    path.pop()
    return false
  }
}
