export default function quick_sort(arr: number[]): void {
  sort(arr)
}

function sort(
  arr: number[],
  lo: number = 0,
  hi: number = arr.length - 1
): void {
  if (hi <= lo) return

  const idx = partition(arr, lo, hi)
  sort(arr, idx + 1, hi)
  sort(arr, lo, idx - 1)
}

function partition(
  arr: number[],
  lo: number = 0,
  hi: number = arr.length - 1
): number {
  const mid = Math.floor(lo + (hi - lo) / 2)
  const medium = [arr[lo], arr[mid], arr[hi]].sort()[1] // value
  const mediumIdx = arr.lastIndexOf(medium)
  const pivot = arr[mediumIdx]
  const tmp = arr[mediumIdx]
  arr[mediumIdx] = arr[hi]
  arr[hi] = tmp

  let idx = lo - 1
  for (let i = lo; i < hi; i++) {
    if (pivot <= arr[i]) continue

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

