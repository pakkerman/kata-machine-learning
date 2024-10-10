package btbfs

import data_structs "github.com/pakkermandev/kata-machine-learning/DataStructs"

func Btbfs(bs *data_structs.BinaryTree[int], needle int) bool {
	queue := []*data_structs.BinaryTreeNode[int]{bs.Root}
	for len(queue) != 0 {
		curr := queue[0]
		queue = queue[1:]

		if curr.Value == needle {
			return true
		}

		if curr.Left != nil {
			queue = append(queue, curr.Left)
		}

		if curr.Right != nil {
			queue = append(queue, curr.Right)
		}
	}

	return false
}
