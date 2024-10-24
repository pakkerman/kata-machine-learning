package lru

import (
	"testing"
)

func TestLRU(t *testing.T) {
	t.Run("testing LRU", func(t *testing.T) {
		l, err := MakeLRU[int, int](5)
		if err != nil {
			t.Error(err)
		}

		l.Update(1, 1)
		l.Update(2, 2)
		l.Update(3, 3)
		l.Update(4, 4)
		l.Update(5, 5)
		l.Update(6, 6)

		// should be only 5 elements
		if l.length != 5 {
			t.Errorf("length should be 5")
		}

		// ordering should be correct
		curr := l.head
		for _, item := range []int{6, 5, 4, 3, 2} {
			if curr.value != item {
				t.Errorf("ordering should be correct.")
			}
			curr = curr.next
		}

		// should correctly getting items and put in front of LRU
		l.Get(3)
		if l.head.value != 3 {
			t.Errorf("should correctly getting items, and update order")
		}
	})
}
