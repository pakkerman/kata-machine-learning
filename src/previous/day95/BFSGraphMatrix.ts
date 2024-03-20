export default function bfs(
  graph: WeightedAdjacencyMatrix,
  source: number,
  needle: number
): number[] | null {
  const queue: number[] = [source]
  const seen: boolean[] = new Array(graph.length).fill(false)
  const prev: number[] = new Array(graph.length).fill(-1)

  while (queue.length) {
    const curr = queue.shift() as number
    const adjs = graph[curr]
    for (let i = 0; i < adjs.length; i++) {
      if (seen[i] || adjs[i] === 0) continue

      seen[i] = true
      prev[i] = curr
      queue.push(i)
    }
  }

  let curr = needle
  const out: number[] = []
  if (prev[curr] === -1) return null
  while (prev[curr] !== -1) {
    out.push(curr)
    curr = prev[curr]
  }

  out.push(source)
  return out.reverse()
}

