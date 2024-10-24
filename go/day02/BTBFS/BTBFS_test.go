package btbfs

import (
	"testing"

	data_structs "github.com/pakkermandev/kata-machine-learning/DataStructs"
)

func TestBTBFS(t *testing.T) {
	t.Run("testing BTBFS", func(t *testing.T) {
		result := Btbfs(&data_structs.BinaryTree1, 37)
		expected := true
		if result != expected {
			t.Errorf("expected: %v\nactual:%v\n", expected, result)
		}
	})

	t.Run("testing BTBFS", func(t *testing.T) {
		result := Btbfs(&data_structs.BinaryTree1, 69)
		expected := false
		if result != expected {
			t.Errorf("expected: %v\nactual:%v\n", expected, result)
		}
	})
}
