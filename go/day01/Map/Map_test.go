package basic_map

import (
	"fmt"
	"testing"
)

func TestMap(t *testing.T) {
	t.Run("testing Map Set()", func(t *testing.T) {
		m := MakeMap[int, int]()
		for _, item := range [][]int{{531, 8008}, {1, 1}, {2, 2}, {3, 3}, {4, 4}} {
			m.Set(item[0], item[1])
		}

		if m.length != 5 {
			t.Errorf("expected: %v, actual: %v", 5, m.length)
		}

		// same item
		m.Set(3, 8)
		m.Set(3, 8)
		m.Set(3, 8)

		if m.length != 5 {
			t.Errorf("expected: %v, actual: %v", 5, m.length)
		}

		for _, expected := range [][]int{{1, 1}, {2, 2}, {4, 4}, {3, 8}, {531, 8008}} {
			result := m.Get(expected[0])
			if result != expected[1] {
				t.Errorf("\nexpected: %v\nactual: %v", expected, result)
			}
		}
		fmt.Println(m.store)
	})

	t.Run("testing Delete()", func(t *testing.T) {
		m := MakeMap[int, int]()

		for _, item := range [][]int{{1, 1}, {2, 2}, {3, 3}, {4, 4}} {
			m.Set(item[0], item[1])
		}
		if m.length != 4 {
			t.Errorf("\nexpected: %v\nactual: %v", 4, m.length)
		}

		for _, expected := range []int{1, 2, 3, 4} {
			result := m.Delete(expected)
			if result != expected {
				t.Errorf("\nexpected: %v\nactual: %v", result, expected)
			}

		}

		if m.length != 0 {
			t.Errorf("\nexpected: %v\nactual: %v", 0, m.length)
		}
	})
}
