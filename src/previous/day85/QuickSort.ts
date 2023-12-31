export default function quick_sort(arr: number[]): void {
  sort(0, arr.length - 1)

  function sort(lo: number, hi: number): void {
    if (hi <= lo) return

    const idx = partition(lo, hi)
    sort(idx + 1, hi)
    sort(lo, idx - 1)
  }

  function partition(lo: number, hi: number): number {
    let pivot = arr[hi]
    let idx = lo - 1
    for (let i = lo; i < hi; i++) {
      if (arr[i] >= pivot) continue
      idx++
      ;[arr[i], arr[idx]] = [arr[idx], arr[i]]
    }

    idx++
    arr[hi] = arr[idx]
    arr[idx] = pivot
    return idx
  }
}
