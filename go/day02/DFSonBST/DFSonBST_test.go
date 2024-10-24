package dfs_on_bst

import (
	"testing"

	data_structs "github.com/pakkermandev/kata-machine-learning/DataStructs"
)

func TestDFSonBST(t *testing.T) {
	t.Run("testing DFS on BST", func(t *testing.T) {
		result := DFSonBST(&data_structs.BinarySearchTree1, 100)
		expected := true
		if result != expected {
			t.Errorf("expected: %v\n actual: %v\n", expected, result)
		}
	})
	t.Run("testing DFS on BST", func(t *testing.T) {
		result := DFSonBST(&data_structs.BinarySearchTree1, 69)
		expected := false
		if result != expected {
			t.Errorf("expected: %v\n actual: %v\n", expected, result)
		}
	})
}
