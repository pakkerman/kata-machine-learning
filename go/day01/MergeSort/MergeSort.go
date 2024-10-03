package merge_sort

func MergeSort(arr []int) {
	sort(arr)
}

func sort(arr []int) {
	if len(arr) <= 1 {
		return
	}

	mid := len(arr) / 2
	var left []int
	var right []int

	for i := 0; i < len(arr); i++ {
		if i < mid {
			left = append(left, arr[i])
		} else {
			right = append(right, arr[i])
		}
	}

	sort(left)
	sort(right)
	merge(arr, left, right)
}

func merge(arr, left, right []int) {
	i := 0
	l := 0
	r := 0

	for {
		if l < len(left) && r < len(right) {
			if left[l] < right[r] {
				arr[i] = left[l]
				i++
				l++
			} else {
				arr[i] = right[r]
				i++
				r++
			}
		} else if l < len(left) {
			arr[i] = left[l]
			i++
			l++
		} else if r < len(right) {
			arr[i] = right[r]
			i++
			r++
		} else {
			break
		}
	}
}
