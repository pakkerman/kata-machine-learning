import MinHeap from "previous/day100/MinHeap"

export default function dijkstra_list(
  source: number,
  sink: number,
  arr: WeightedAdjacencyList
): number[] {
  const heap = new MinHeap()
  const prev: number[] = new Array(arr.length).fill(-1)
  const dists: number[] = new Array(arr.length).fill(Infinity)

  heap.insert(source)
  dists[source] = 0

  while (heap.length) {
    const curr = heap.delete()
    if (curr === sink) break

    const list = arr[curr]
    for (let i = 0; i < list.length; i++) {
      const { to: edge, weight } = list[i]
      const dist = weight + dists[curr]

      if (dists[edge] <= dist) continue

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

