import MinHeap from "./MinHeap"

export default function dijkstra_list(
  source: number,
  sink: number,
  arr: WeightedAdjacencyList
): number[] {
  const prev: number[] = new Array(arr.length).fill(-1)
  const dists: number[] = new Array(arr.length).fill(Infinity)
  dists[source] = 0

  const heap = new MinHeap()
  heap.insert(source)

  while (heap.length) {
    console.log(heap.data)
    const curr = heap.delete()

    const list = arr[curr]
    for (let i = 0; i < list.length; i++) {
      const { to: edge, weight } = list[i]
      const dist = dists[curr] + weight
      if (dist < dists[edge]) {
        dists[edge] = dist
        prev[edge] = curr
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
