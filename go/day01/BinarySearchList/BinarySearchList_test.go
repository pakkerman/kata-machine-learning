package binary_search_list

import (
	"testing"
)

func TestBinarySearchList(t *testing.T) {
	t.Run("testing binary search list", func(t *testing.T) {
		input := []int{1, 2, 3, 4, 5, 24, 25, 33, 37, 88, 99, 123, 117, 531, 8008}
		target := 37
		result := BinarySearchList(input, target)

		if result != true {
			t.Errorf("search fail")
		}
	})

	t.Run("testing binary search list", func(t *testing.T) {
		input := []int{}
		for i := 0; i < 1000; i += 3 {
			input = append(input, i)
		}
		target := 999
		result := BinarySearchList(input, target)

		if result != true {
			t.Errorf("search fail")
		}
	})
}
