package quick_sort

func QuickSort(arr []int) error {
	sort(arr, 0, len(arr)-1)

	return nil
}

func sort(arr []int, lo, hi int) {
	if hi <= lo {
		return
	}

	idx := partition(arr, lo, hi)
	sort(arr, idx+1, hi)
	sort(arr, lo, idx-1)
}

func partition(arr []int, lo, hi int) int {
	pivot := arr[hi]
	idx := lo - 1
	for i := lo; i < hi; i++ {
		if arr[hi] < arr[i] {
			continue
		}

		idx++
		tmp := arr[i]
		arr[i] = arr[idx]
		arr[idx] = tmp
	}

	idx++
	arr[hi] = arr[idx]
	arr[idx] = pivot
	return idx
}
