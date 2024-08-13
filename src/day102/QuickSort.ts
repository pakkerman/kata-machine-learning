export default function quick_sort(arr: number[]): void {
  fn(arr)

  function fn(
    arr: number[],
    lo: number = 0,
    hi: number = arr.length - 1
  ): void {
    if (lo >= hi) return

    const idx = partition(arr, lo, hi)

    fn(arr, idx + 1, hi)
    fn(arr, lo, idx - 1)
  }

  function partition(arr: number[], lo: number, hi: number): number {
    const pivot = arr[hi]
    let idx = lo - 1
    for (let i = lo; i < hi; i++) {
      if (arr[hi] < arr[i]) continue

      idx++
      const tmp = arr[idx]
      arr[idx] = arr[i]
      arr[i] = tmp
    }

    idx++
    arr[hi] = arr[idx]
    arr[idx] = pivot
    return idx
  }
}

