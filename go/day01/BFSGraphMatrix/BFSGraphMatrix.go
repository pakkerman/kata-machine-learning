package bfs_graph_matrix

import (
	data_structs "github.com/pakkermandev/kata-machine-learning/DataStructs"
)

func BFSGraphMatrix(graph data_structs.WeightedAdjacencyMatrix, source, needle int) []int {
	queue := []int{source}
	prev := make([]int, len(graph))
	seen := make([]bool, len(graph))

	for i := 0; i < len(graph); i++ {
		prev[i] = -1
		seen[i] = false
	}

	seen[source] = true
	for len(queue) != 0 {
		curr := queue[0]
		queue = queue[1:]

		adjs := graph[curr]
		for i := range adjs {
			if adjs[i] == 0 || seen[i] {
				continue
			}

			seen[i] = true
			prev[i] = curr
			queue = append(queue, i)

		}

	}

	var out []int
	curr := needle
	for prev[curr] != -1 {
		out = append(out, curr)
		curr = prev[curr]
	}

	out = append(out, source)

	var reverse []int
	for i := 0; i < len(out); i++ {
		reverse = append(reverse, out[len(out)-i-1])
	}

	return reverse
}
