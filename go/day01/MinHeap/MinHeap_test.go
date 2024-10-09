package minheap

import (
	"reflect"
	"testing"
)

func TestMinHeap(t *testing.T) {
	t.Run("testing insert", func(t *testing.T) {
		heap := MakeMinHeap()
		items := []int{69, 420, 8008, 531, 42, 520, 1, 2, 3, 4, 5, 6, 7, 0, 777, 666}
		expected := []int{0, 2, 1, 3, 4, 7, 6, 531, 69, 420, 5, 8008, 42, 520, 777, 666}
		for _, item := range items {
			heap.Insert(item)
		}

		if !reflect.DeepEqual(expected, heap.heap) {
			t.Errorf("insertion fail\nexpected: %v\nactual: %v\n", expected, heap.heap)
		}

		if heap.Size() != 16 {
			t.Errorf("heap size error")
		}

		var output []int
		size := len(heap.heap)
		for i := 0; i < size; i++ {
			output = append(output, heap.Delete())
		}

		if len(output) != 16 {
			t.Errorf("missing deleted element(s)")
		}

		if len(heap.heap) != 0 {
			t.Errorf("after deletion heap should be empty")
		}
	})
}
