export default function quick_sort(arr: number[]): void {
  recurse(arr)

  function recurse(
    arr: number[],
    lo: number = 0,
    hi: number = arr.length - 1
  ): void {
    if (hi <= lo) return

    const idx = partition(arr, lo, hi)
    recurse(arr, lo, idx - 1)
    recurse(arr, idx + 1, hi)
  }

  function partition(arr: number[], lo: number, hi: number): number {
    let medianIdx = getMedianIdx(arr, lo, hi)
    const tmp = arr[hi]
    arr[hi] = arr[medianIdx]
    arr[medianIdx] = arr[hi]
    arr[hi] = tmp

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

  function getMedianIdx(arr: number[], lo: number, hi: number): number {
    const mid = Math.floor(lo + (hi - lo) / 2)
    const midVal = [arr[lo], arr[mid], arr[hi]].sort()[1]
    if (midVal === arr[lo]) return lo
    if (midVal === arr[hi]) return hi
    return mid
  }
}

