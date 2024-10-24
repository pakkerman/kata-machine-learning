package compare_binary_tree

import (
	"testing"

	data_structs "github.com/pakkermandev/kata-machine-learning/DataStructs"
)

func TestCompareBinaryTrees(t *testing.T) {
	t.Run("testing compareBinaryTree", func(t *testing.T) {
		result := CompareBinaryTree(&data_structs.BinaryTree1, &data_structs.BinaryTree1)
		expected := true
		if result != expected {
			t.Errorf("expected: %v\nactual: %v\n", expected, result)
		}
	})

	t.Run("testing compareBinaryTree", func(t *testing.T) {
		result := CompareBinaryTree(&data_structs.BinaryTree1, &data_structs.BinaryTree2)
		expected := false
		if result != expected {
			t.Errorf("expected: %v\nactual: %v\n", expected, result)
		}
	})
}
