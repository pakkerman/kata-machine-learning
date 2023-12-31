export default function dijkstra_list(
  source: number,
  sink: number,
  arr: WeightedAdjacencyList
): number[] {
  const seen: boolean[] = new Array(arr.length).fill(false)
  const prev: number[] = new Array(arr.length).fill(-1)
  const dists: number[] = new Array(arr.length).fill(Infinity)
  dists[source] = 0

  while (hasUnvisited(seen, dists)) {
    const curr = getLowestUnvisited(seen, dists)
    seen[curr] = true
    for (const { to: edge, weight } of arr[curr]) {
      if (seen[edge]) continue
      const dist = weight + dists[curr]
      if (dists[edge] <= dist) continue
      dists[edge] = dist
      prev[edge] = curr
    }
  }

  const out: number[] = []
  let curr = sink
  while (prev[curr] !== -1) {
    out.push(curr)
    curr = prev[curr]
  }
  out.push(source)
  return out.reverse()
}

function hasUnvisited(seen: boolean[], dists: number[]): boolean {
  return seen.some((seen, idx) => !seen && dists[idx] !== Infinity)
}

function getLowestUnvisited(seen: boolean[], dists: number[]): number {
  let lowest = Infinity
  let idx = -1
  for (let i = 0; i < seen.length; i++) {
    if (seen[i]) continue
    if (lowest <= dists[i]) continue
    lowest = dists[i]
    idx = i
  }
  return idx
}
