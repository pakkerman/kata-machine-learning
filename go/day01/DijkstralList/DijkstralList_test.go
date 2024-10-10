package dijkstra_list

import (
	"reflect"
	"testing"

	data_structs "github.com/pakkermandev/kata-machine-learning/DataStructs"
)

func TestDijkstraList(t *testing.T) {
	t.Run("testing DijkstraList with List1", func(t *testing.T) {
		expected := []int{0, 1, 4, 5, 6}
		actual := DijkstraList(0, 6, data_structs.List1)
		if !reflect.DeepEqual(actual, expected) {
			t.Errorf("testing List1\nexpected: %v\nactual: %v\n", actual, expected)
		}
	})

	t.Run("testing DijkstraList with List2", func(t *testing.T) {
		expected := []int{0, 2, 3}
		actual := DijkstraList(0, 3, data_structs.List2)
		if !reflect.DeepEqual(actual, expected) {
			t.Errorf("testing List1\nexpected: %v\nactual: %v\n", actual, expected)
		}
	})
}
