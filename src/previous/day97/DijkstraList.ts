export default function dijkstra_list(
  source: number,
  sink: number,
  arr: WeightedAdjacencyList
): number[] {
  const seen: boolean[] = new Array(arr.length).fill(false)
  const dists: number[] = new Array(arr.length).fill(Infinity)
  const prev: number[] = new Array(arr.length).fill(-1)
  dists[source] = 0

  while (hasUnvisited(seen, dists)) {
    const curr = lowestUnvisited(seen, dists)
    const list = arr[curr]
    seen[curr] = true

    for (let i = 0; i < list.length; i++) {
      const { to: edge, weight } = list[i]
      const dist = dists[curr] + weight
      if (seen[edge]) continue
      if (dist < dists[edge]) {
        dists[edge] = dist
        prev[edge] = curr
      }
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
  return seen.some((s, i) => !s && dists[i] !== Infinity)
}

function lowestUnvisited(seen: boolean[], dists: number[]) {
  let lowest = Infinity
  let idx = -1
  for (let i = 0; i < seen.length; i++) {
    if (seen[i]) continue
    if (dists[i] < lowest) {
      idx = i
      lowest = dists[i]
    }
  }
  return idx
}
