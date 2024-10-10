package data_structs

var BinaryTree1 BinaryTree[int] = BinaryTree[int]{
	Root: &BinaryTreeNode[int]{
		Value: 9,
		Left: &BinaryTreeNode[int]{
			Value: 4,
			Left:  &BinaryTreeNode[int]{Value: 1},
			Right: &BinaryTreeNode[int]{Value: 5},
		},
		Right: &BinaryTreeNode[int]{
			Value: 13,
			Left:  &BinaryTreeNode[int]{Value: 11},
			Right: &BinaryTreeNode[int]{Value: 37},
		},
	},
}
