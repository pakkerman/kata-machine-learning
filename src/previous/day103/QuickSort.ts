export default function quick_sort(arr: number[]): void {
  sort(arr)
}

function sort(arr: number[], lo: number = 0, hi: number = arr.length): void {
  if (hi <= lo) return

  const idx = partition(arr, lo, hi)
  sort(arr, lo, idx - 1)
  sort(arr, idx + 1, hi)
}

function partition(arr: number[], lo: number, hi: number): number {
  let pivot = arr[hi]
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

