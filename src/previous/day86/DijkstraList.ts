import MinHeap from "./MinHeap"

export default function dijkstra_list(
  source: number,
  sink: number,
  arr: WeightedAdjacencyList
): number[] {
  const heap = new MinHeap()
  const dists: number[] = new Array(arr.length).fill(Infinity)
  const prev: number[] = new Array(arr.length).fill(-1)
  dists[source] = 0
  heap.insert(source)

  arr.forEach((item, idx) =>
    console.log(
      idx,
      item.map((item) => item.to)
    )
  )
  while (heap.length) {
    let curr = heap.delete()

    const list = arr[curr]
    for (let i = 0; i < list.length; i++) {
      const { to: edge, weight } = list[i]
      const dist = dists[curr] + weight
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
