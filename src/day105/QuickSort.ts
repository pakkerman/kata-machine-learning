export default function quick_sort(arr: number[]): void {
  sort(arr, 0, arr.length - 1)

  function sort(arr: number[], lo: number, hi: number) {
    if (hi <= lo) return

    const idx = partition(arr, lo, hi)
    sort(arr, idx + 1, hi)
    sort(arr, lo, idx - 1)
  }

  function partition(arr: number[], lo: number, hi: number) {
    const medianIdx = getMedianIdx(arr, lo, hi)
    const tmp = arr[hi]
    arr[hi] = arr[medianIdx]
    arr[medianIdx] = tmp

    const pivot = arr[hi]
    let idx = lo - 1

    for (let i = lo; i < hi; i++) {
      if (pivot <= arr[i]) continue

      idx++
      const tmp = arr[i]
      arr[i] = arr[idx]
      arr[idx] = tmp
    }

    idx++
    arr[hi] = arr[idx]
    arr[idx] = pivot
    return idx
  }

  function getMedianIdx(arr: number[], lo: number, hi: number) {
    const mid = Math.floor(lo + (hi - lo) / 2)
    const midVal = [arr[lo], arr[mid], arr[hi]].sort()[1]

    if (midVal < arr[lo]) return lo
    if (arr[hi] < midVal) return hi
    return mid
  }
}
