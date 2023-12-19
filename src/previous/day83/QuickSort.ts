export default function quick_sort(arr: number[]): void {
  sort(arr)

  function sort(
    arr: number[],
    lo: number = 0,
    hi: number = arr.length - 1
  ): void {
    if (lo >= hi) return

    const idx = partition(arr, lo, hi)
    sort(arr, lo, idx - 1)
    sort(arr, idx + 1, hi)
  }

  function partition(arr: number[], lo: number, hi: number): number {
    const pivot = arr[hi]
    let idx = lo - 1
    for (let i = lo; i < hi; i++) {
      if (arr[i] >= pivot) continue

      idx++
      const temp = arr[i]
      arr[i] = arr[idx]
      arr[idx] = temp
    }

    idx++
    arr[hi] = arr[idx]
    arr[idx] = pivot
    return idx
  }
}
