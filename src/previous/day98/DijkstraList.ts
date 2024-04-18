import MinHeap from "./MinHeap"

export default function dijkstra_list(
  source: number,
  sink: number,
  arr: WeightedAdjacencyList
): number[] {
  const heap = new MinHeap()
  const dists = new Array(arr.length).fill(Infinity)
  const prev = new Array(arr.length).fill(-1)
  heap.insert(source)
  dists[source] = 0

  while (heap.length) {
    const curr = heap.delete()

    for (let i = 0; i < arr[curr].length; i++) {
      const { to: edge, weight } = arr[curr][i]
      const dist = dists[curr] + weight
      if (dist < dists[edge]) {
        prev[edge] = curr
        dists[edge] = dist
        heap.insert(edge)
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

