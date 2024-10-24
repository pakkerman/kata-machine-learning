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

var BinaryTree2 BinaryTree[int] = BinaryTree[int]{
	Root: &BinaryTreeNode[int]{
		Value: 950,
		Left: &BinaryTreeNode[int]{
			Value: 123,
			Left:  &BinaryTreeNode[int]{Value: 156},
			Right: &BinaryTreeNode[int]{Value: 531},
		},
		Right: &BinaryTreeNode[int]{
			Value: 1592,
			Left:  &BinaryTreeNode[int]{Value: 12923},
			Right: &BinaryTreeNode[int]{Value: 37},
		},
	},
}

var BinarySearchTree1 BinaryTree[int] = BinaryTree[int]{
	Root: &BinaryTreeNode[int]{
		Value: 20,
		Right: &BinaryTreeNode[int]{
			Value: 50,
			Right: &BinaryTreeNode[int]{Value: 100},
			Left: &BinaryTreeNode[int]{
				Value: 30,
				Right: &BinaryTreeNode[int]{Value: 45},
				Left:  &BinaryTreeNode[int]{Value: 29},
			},
		},
		Left: &BinaryTreeNode[int]{
			Value: 10,
			Right: &BinaryTreeNode[int]{Value: 15},
			Left: &BinaryTreeNode[int]{
				Value: 5,
				Left:  &BinaryTreeNode[int]{Value: 7},
			},
		},
	},
}
