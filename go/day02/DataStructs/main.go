package data_structs

type GraphEdge struct {
	To     int
	Weight int
}

type (
	WeightedAdjacencyList   [][]GraphEdge
	WeightedAdjacencyMatrix [][]int
)

type BinaryTreeNode[T comparable] struct {
	Value T
	Left  *BinaryTreeNode[T]
	Right *BinaryTreeNode[T]
}

type BinaryTree[T comparable] struct {
	Root   *BinaryTreeNode[T]
	Length int
}
