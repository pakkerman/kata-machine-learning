package compare_binary_tree

import data_structs "github.com/pakkermandev/kata-machine-learning/DataStructs"

func CompareBinaryTree[T comparable](a, b *data_structs.BinaryTree[T]) bool {
	var recurse func(a, b *data_structs.BinaryTreeNode[T]) bool
	recurse = func(a, b *data_structs.BinaryTreeNode[T]) bool {
		if a == nil && b == nil {
			return true
		}
		if a == nil || b == nil {
			return false
		}
		if a.Value != b.Value {
			return false
		}

		return recurse(a.Left, b.Left) && recurse(a.Right, b.Right)
	}

	return recurse(a.Root, b.Root)
}
