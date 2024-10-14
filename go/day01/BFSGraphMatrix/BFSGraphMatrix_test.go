package bfs_graph_matrix

import (
	"reflect"
	"testing"

	data_structs "github.com/pakkermandev/kata-machine-learning/DataStructs"
)

func TestBFSGraphMatrix(t *testing.T) {
	t.Run("testing BFS", func(t *testing.T) {
		result := BFSGraphMatrix(data_structs.Matrix1, 0, 6)
		expected := []int{0, 1, 4, 5, 6}

		if !reflect.DeepEqual(result, expected) {
			t.Errorf("\nexpected: %v\nactual: %v", expected, result)
		}
	})
}
