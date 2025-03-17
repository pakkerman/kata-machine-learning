export default function bfs(
  graph: WeightedAdjacencyMatrix,
  source: number,
  needle: number
): number[] | null {
  const queue: number[] = [source]
  const seen: boolean[] = new Array(graph.length).fill(false)
  const prev: number[] = new Array(graph.length).fill(-1)

  while (queue.length) {
    const curr = queue.shift()!
    if (curr === needle) break

    const adjs = graph[curr]
    for (let i = 0; i < adjs.length; i++) {
      if (adjs[i] === 0) continue
      if (seen[i]) continue

      seen[i] = true
      prev[i] = curr
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

