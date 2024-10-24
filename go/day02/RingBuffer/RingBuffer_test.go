package ring_buffer

import (
	"fmt"
	"reflect"
	"testing"
)

func TestRingBufferPush(t *testing.T) {
	tests := []struct {
		name     string
		items    []int
		expected []int
	}{
		{
			name:     "testing Push(), to capacity",
			items:    []int{1, 3, 6},
			expected: []int{1, 3, 6},
		},

		{
			name:     "testing Push(), not to capacity",
			items:    []int{531, 8008},
			expected: []int{531, 8008, 0},
		},
		{
			name:     "testing Push(), the point of override",
			items:    []int{1, 3, 69, 69, 69},
			expected: []int{69, 69, 69},
		},
		{
			name:     "testing Push(), looping twice",
			items:    []int{42, 8, 9, 420, 59, 83, 37, 872, 77},
			expected: []int{37, 872, 77},
		},
	}

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			buffer := MakeRingBuffer[int](3)

			for _, item := range tc.items {
				buffer.Push(item)
			}

			if !reflect.DeepEqual(buffer.data, tc.expected) {
				t.Errorf("fail Push()\nexpected: %v\nactual: %v\n", tc.expected, buffer.data)
			}
		})
	}
}

func TestRingBufferPop(t *testing.T) {
	t.Run("testing Pop()", func(t *testing.T) {
		buffer := MakeRingBuffer[int](5)
		out := []int{1, 2, 3, 4, 5}

		for _, item := range out {
			buffer.Push(item)
		}

		fmt.Println(buffer.data)

		for _, item := range out {
			val, err := buffer.Pop()
			if err != nil {
				t.Errorf("Error when popping value %v", item)
			}
			if val != item {
				t.Errorf("fail Pop()\nexpected: %v\nactual: %v\n", item, val)
			}
		}
	})

	t.Run("testing Pop()", func(t *testing.T) {
		buffer := MakeRingBuffer[int](3)
		out := []int{1, 2, 3, 4, 5, 6}
		for _, item := range out {
			buffer.Push(item)
		}

		for _, item := range []int{4, 5, 6} {
			val, err := buffer.Pop()
			if err != nil {
				t.Errorf("Error when popping value %v", item)
			}
			if val != item {
				t.Errorf("fail pop()\nexpected: %v\nactual: %v\n", item, val)
			}

		}
	})
}
