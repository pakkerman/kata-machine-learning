import MinHeap from "./MinHeap"

import { list1 } from "../../__tests__/graph"

export default function dijkstra_list(
  source: number,
  sink: number,
  arr: WeightedAdjacencyList
): number[] {
  const heap = new MinHeap()
  const dists: number[] = new Array(arr.length).fill(Infinity)
  const prev: number[] = new Array(arr.length).fill(-1)

  heap.insert(source)
  dists[source] = 0

  while (heap.length) {
    const curr = heap.delete()
    console.log(`\tdelete ${curr} from heap: [${heap.data}]`)
    const list = arr[curr]

    console.log("\tlooking at", curr, "list: ", list)

    for (let i = 0; i < list.length; i++) {
      console.log("\theap:", heap.data)
      console.log("\tdists:", dists)
      console.log("\tprev:", prev)
      const { to: edge, weight } = list[i]
      console.log("\t\tcurrent loop: ", "edge", edge, "weight", weight)
      const dist = weight + dists[curr]
      console.log(`\t\tif(${dist} >= ${dists[edge]}) is`, dist >= dists[edge])
      if (dist >= dists[edge]) continue
      console.log(`\t\tupdate dists[${edge}] to ${dist}`)

      dists[edge] = dist
      prev[edge] = curr
      heap.insert(edge)
      console.log(`\t\tpush ${edge} to heap: [${heap.data}]`)
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

console.log(dijkstra_list(0, 6, list1))
