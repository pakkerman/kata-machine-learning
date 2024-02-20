export default function quick_sort(arr: number[]): void {
  sort(arr)

  function sort(
    arr: number[],
    lo: number = 0,
    hi: number = arr.length - 1
  ): void {
    if (hi <= lo) return

    const idx = partition(arr, lo, hi)
    sort(arr, lo, idx - 1)
    sort(arr, idx + 1, hi)
  }

  function partition(arr: number[], lo: number, hi: number): number {
    // Median-of-three pivot selection
    const mid = lo + Math.floor((hi - lo) / 2)
    const pivotIdx = getMedianIndex(arr, lo, mid, hi)
    const pivot = arr[pivotIdx]

    // Move pivot to the end
    let tmp = arr[pivotIdx]
    arr[pivotIdx] = arr[hi]
    arr[hi] = tmp

    let idx = lo - 1

    for (let i = lo; i < hi; i++) {
      if (pivot <= arr[i]) continue

      idx++
      const tmp = arr[i]
      arr[i] = arr[idx]
      arr[idx] = tmp
    }

    idx++
    tmp = arr[idx]
    arr[idx] = arr[hi]
    arr[hi] = tmp

    return idx
  }

  function getMedianIndex(
    arr: number[],
    a: number,
    b: number,
    c: number
  ): number {
    const aValue = arr[a]
    const bValue = arr[b]
    const cValue = arr[c]
    if (aValue > bValue) {
      if (bValue > cValue) return b
      else if (aValue > cValue) return c
      else return a
    } else {
      if (aValue > cValue) return a
      else if (bValue > cValue) return c
      else return b
    }
  }
}
