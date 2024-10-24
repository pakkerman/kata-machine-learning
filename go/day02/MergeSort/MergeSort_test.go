package merge_sort

import (
	"reflect"
	"testing"
)

func TestMergeSort(t *testing.T) {
	tests := []struct {
		name     string
		arr      []int
		expected []int
	}{
		{
			name:     "testing array [69, 531, 4, 2, 0, 8008]",
			arr:      []int{69, 531, 4, 2, 0, 8008},
			expected: []int{0, 2, 4, 69, 531, 8008},
		},
		{
			name:     "testing array [37, 13, 37, 13]",
			arr:      []int{37, 13, 37, 13},
			expected: []int{13, 13, 37, 37},
		},
		{
			name:     "testing array [7, 7, 7, 7, 7, 7, 7]",
			arr:      []int{7, 7, 7, 7, 7, 7, 7},
			expected: []int{7, 7, 7, 7, 7, 7, 7},
		},
	}

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			MergeSort(tc.arr)

			if !reflect.DeepEqual(tc.arr, tc.expected) {
				t.Errorf("fail on array %v", tc.arr)
			}
		})
	}
}
