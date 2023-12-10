export default function bfs(
  graph: WeightedAdjacencyMatrix,
  source: number,
  needle: number
): number[] | null {
  const queue: number[] = [source]
  const prev: number[] = new Array(graph.length).fill(-1)
  const seen: boolean[] = new Array(graph.length).fill(false)

  while (queue.length) {
    const curr = queue.shift() as number
    const adjs = graph[curr]
    for (let i = 0; i < adjs.length; i++) {
      if (seen[i] || adjs[i] === 0) continue
      prev[i] = curr
      seen[i] = true
      queue.push(i)
    }
  }

  if (prev[needle] === -1) return null

  const out: number[] = []
  let curr = needle
  while (prev[curr] !== -1) {
    out.push(curr)
    curr = prev[curr]
  }
  out.push(source)
  return out.reverse()
}
