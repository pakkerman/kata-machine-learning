export default function quick_sort(arr: number[]): void {
  sort(arr, 0, arr.length - 1)
}

function sort(arr: number[], lo: number, hi: number): void {
  if (hi < lo) return

  const idx = partition(arr, lo, hi)

  sort(arr, idx + 1, hi)
  sort(arr, lo, idx - 1)
}

function partition(arr: number[], lo: number, hi: number) {
  const pivot = arr[hi]
  let idx = lo - 1

  for (let i = lo; i < hi; i++) {
    if (pivot < arr[i]) continue

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

