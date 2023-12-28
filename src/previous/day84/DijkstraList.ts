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
    const curr = getLowestUnvisited(seen, dists)

    seen[curr] = true
    const list = arr[curr]
    for (let { to: edge, weight } of list) {
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
  return seen.some((bool, idx) => !bool && dists[idx] < Infinity)
}

function getLowestUnvisited(seen: boolean[], dists: number[]): number {
  let lowest = Infinity
  let idx = -1
  for (let i = 0; i < seen.length; i++) {
    if (seen[i]) continue
    if (lowest < dists[i]) continue
    lowest = dists[i]
    idx = i
  }

  return idx
}
