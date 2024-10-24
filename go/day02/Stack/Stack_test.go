package stack

import "testing"

func TestStack(t *testing.T) {
	t.Run("testing Stack", func(t *testing.T) {
		s := MakeStack[int]()

		for _, item := range []int{1, 2, 3} {
			s.Push(item)
		}

		peek := s.Peek()
		if peek != 1 {
			t.Errorf("\nExpected: %v\nActual: %v", 1, peek)
		}

		for _, expectedResult := range []int{3, 2, 1} {
			val := s.Pop()
			if val != expectedResult {
				t.Errorf("\nExpected: %v\nActual: %v", expectedResult, val)
			}
		}
	})
}
