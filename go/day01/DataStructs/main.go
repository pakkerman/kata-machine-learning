package data_structs

type GraphEdge struct {
	To     int
	Weight int
}

type (
	WeightedAdjacencyList   [][]GraphEdge
	WeightedAdjacencyMatrix [][]int
)
