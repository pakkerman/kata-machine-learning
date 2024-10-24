package queue

import "testing"

func TestQueue(t *testing.T) {
	t.Run("testing Enque()", func(t *testing.T) {
		q := MakeQueue[int]()

		for _, item := range []int{1, 2, 3} {
			q.Enque(item)
		}

		v := q.Peek()
		if v != 1 {
			t.Errorf("\nExpected: 1\nActual: %v", v)
		}
	})

	t.Run("testing Dequeue()", func(t *testing.T) {
		q := MakeQueue[int]()

		for _, item := range []int{1, 2, 3} {
			q.Enque(item)
		}

		v := q.Peek()
		if v != 1 {
			t.Errorf("\nExpected: 1\nActual: %v", v)
		}

		for _, expectedResult := range []int{1, 2, 3} {
			val, _ := q.Deque()
			if val != expectedResult {
				t.Errorf("\nExpected: 1\nActual: %v", expectedResult)
			}
		}
	})
}
