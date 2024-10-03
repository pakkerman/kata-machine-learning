package bubble_sort

func BubbleSort(arr []int) {
	for i := 0; i < len(arr); i++ {
		for k := 0; k < len(arr)-i-1; k++ {
			if arr[k] < arr[k+1] {
				continue
			}

			tmp := arr[k]
			arr[k] = arr[k+1]
			arr[k+1] = tmp
		}
	}
}
