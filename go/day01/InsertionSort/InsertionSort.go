package insertion_sort

func InsertionSort(arr []int) {
	for i := 0; i < len(arr); i++ {
		for k := i; k > 0; k-- {
			if arr[k-1] <= arr[k] {
				continue
			}

			tmp := arr[k]
			arr[k] = arr[k-1]
			arr[k-1] = tmp
		}
	}
}
