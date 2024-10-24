package dfs_on_bst

import data_structs "github.com/pakkermandev/kata-machine-learning/DataStructs"

func DFSonBST(bst *data_structs.BinaryTree[int], needle int) bool {
	var recurse func(curr *data_structs.BinaryTreeNode[int]) bool
	recurse = func(curr *data_structs.BinaryTreeNode[int]) bool {
		if curr == nil {
			return false
		}

		if curr.Value == needle {
			return true
		}

		return recurse(curr.Left) || recurse(curr.Right)
	}

	return recurse(bst.Root)
}
