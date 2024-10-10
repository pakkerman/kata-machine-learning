package dijkstra_list

import (
	"math"
	"slices"

	data_structs "github.com/pakkermandev/kata-machine-learning/DataStructs"
	minheap "github.com/pakkermandev/kata-machine-learning/MinHeap"
)

func DijkstraList(source, sink int, arr data_structs.WeightedAdjacencyList) []int {
	heap := minheap.MakeMinHeap()
	prev := make([]int, len(arr))
	dists := make([]int, len(arr))
	for i := range dists {
		dists[i] = math.MaxInt
		prev[i] = -1
	}

	heap.Insert(source)
	dists[source] = 0

	for 0 < heap.Size() {
		curr := heap.Delete()
		list := arr[curr]
		for _, item := range list {
			weight := item.Weight
			edge := item.To

			dist := dists[curr] + weight
			if dists[edge] <= dist {
				continue
			}

			dists[edge] = dist
			prev[edge] = curr
			heap.Insert(edge)

		}
	}

	var out []int

	curr := sink
	for prev[curr] != -1 {
		out = append(out, curr)
		curr = prev[curr]
	}

	out = append(out, source)
	slices.Reverse(out)
	return out
}
