import MinHeap from "./MinHeap"

export default function dijkstra_list(
  source: number,
  sink: number,
  arr: WeightedAdjacencyList
): number[] {
  const seen: boolean[] = new Array(arr.length).fill(false)
  const prev: number[] = new Array(arr.length).fill(-1)
  const dists: number[] = new Array(arr.length).fill(Infinity)
  dists[source] = 0

  const minheap = new MinHeap()
  minheap.insert(source)

  while (minheap.length) {
    const curr = minheap.delete()
    const list = arr[curr]
    for (let i = 0; i < list.length; i++) {
      const { to: edge, weight } = list[i]
      if (seen[edge]) continue
      const dist = dists[curr] + weight
      if (dist < dists[edge]) {
        dists[edge] = dist
        prev[edge] = curr
        minheap.insert(edge)
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
