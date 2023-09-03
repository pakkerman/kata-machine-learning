import MinHeap from "./MinHeap"

export default function dijkstra_list(
  source: number,
  sink: number,
  arr: WeightedAdjacencyList
): number[] {
  // const seen: boolean[] = new Array(arr.length).fill(false)
  const prev: number[] = new Array(arr.length).fill(-1)
  const dists: number[] = new Array(arr.length).fill(Infinity)
  dists[source] = 0
  const heap = new MinHeap()
  heap.insert(source)

  while (heap.length) {
    const curr = heap.delete()
    // const curr = getLowestUnvisited(seen, dists)
    // seen[curr] = true

    const list = arr[curr]
    for (let i = 0; i < list.length; i++) {
      const { to: edge, weight } = list[i]
      // if (seen[edge]) continue

      const dist = dists[curr] + weight
      if (dist >= dists[edge]) continue
      dists[edge] = dist
      prev[edge] = curr
      heap.insert(edge)
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
  return seen.some((seen, idx) => !seen && dists[idx] < Infinity)
}

function getLowestUnvisited(seen: boolean[], dists: number[]): number {
  let lowest = Infinity
  let idx = 0

  for (let i = 0; i < seen.length; i++) {
    if (seen[i]) continue
    if (dists[i] >= lowest) continue
    idx = i
    lowest = dists[i]
  }

  return idx
}
