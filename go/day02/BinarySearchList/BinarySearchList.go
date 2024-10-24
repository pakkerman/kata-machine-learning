package binary_search_list

func BinarySearchList(haystack []int, needle int) bool {
	lo := 0
	hi := len(haystack)

	for lo < hi {
		mid := lo + ((hi - lo) / 2)
		val := haystack[mid]

		if needle == val {
			return true
		}

		if needle < val {
			hi = mid
		} else {
			lo = mid + 1
		}
	}

	return false
}
