package dfs_graph_list

import (
	data_structs "github.com/pakkermandev/kata-machine-learning/DataStructs"
)

func DFSGraphList(graph data_structs.WeightedAdjacencyList, source int, needle int) []int {
	var path []int
	seen := make([]bool, len(graph))
	for i := range seen {
		seen[i] = false
	}

	var recurse func(curr int) bool
	recurse = func(curr int) bool {
		if seen[curr] {
			return false
		}

		path = append(path, curr)
		seen[curr] = true
		if curr == needle {
			return true
		}

		list := graph[curr]
		for _, node := range list {
			edge := node.To
			if seen[edge] {
				continue
			}
			if recurse(edge) {
				return true
			}
		}

		path = path[:len(path)-1]
		return false
	}

	recurse(source)
	return path
}
