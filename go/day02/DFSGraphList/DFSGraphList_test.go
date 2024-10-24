package dfs_graph_list

import (
	"fmt"
	"testing"

	data_structs "github.com/pakkermandev/kata-machine-learning/DataStructs"
)

func TestDFSGraphList(t *testing.T) {
	t.Run("testing DFS on adjacency graph", func(t *testing.T) {
		fmt.Println(DFSGraphList(data_structs.List1, 0, 6))
		fmt.Println(DFSGraphList(data_structs.List2, 0, 6))
	})
}
