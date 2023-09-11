// Prim's algorithm :: A method to calculate miniumn spanning tree
//  What is a miniumn spanning tree?
//    - Require no cycles
//    - For it to be miniumn spanning tree,
//        the graph requires to be strongly connected (ie. all notes must be connected)
//  1. Select a starting node
//  2. Put edge of current selected node into a list
//  3. Select edge that is the lowest value and to a node we haven't seen yet
//  4. Insert the edge from curr to new into mst
//  5. The newly selected node become the current node,
//  6. Repeat to step 2 until unvidited is empty or unreachable
//  7. Done

export default function prims(
  list: WeightedAdjacencyList
): WeightedAdjacencyList | null {
  const visited = new Array(list.length).fill(false)
  const mst: GraphEdge[][] = new Array(list.length).fill(null).map(() => [])

  // 1.
  visited[0] = true
  let curr = 0

  const edges: [number, GraphEdge][] = []

  do {
    // 2. Put all edges in the list
    for (const edge of list[curr]) {
      edges.push([curr, edge])

      // 3. Selecte edge that is lowest alue and to a node we haven't seen yet
      let lowest = Infinity
      let lowestEdge: [number, GraphEdge | null] = [-1, null]
      for (const edge of edges) {
        if (visited[edge[1].to] === false && edge[1].weight < lowest) {
          lowest = edge[1].weight
          lowestEdge = edge
        }
      }

      //  4. Insert the edge from curr to new into mst
      if (lowestEdge[1] !== null) {
        mst[lowestEdge[0]].push(lowestEdge[1])
        mst[lowestEdge[1].to].push({
          to: lowestEdge[0],
          weight: lowestEdge[1].weight,
        })
        visited[lowestEdge[1].to] = true
        edges.splice(edges.indexOf(lowestEdge as [number, GraphEdge]), 1)
      }
      //  5. The newly selected node become the current node
      curr = lowestEdge[1]?.to || -1
    }
  } while (visited.includes(false) && curr >= 0)

  return mst
}
