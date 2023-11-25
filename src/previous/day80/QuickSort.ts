export default function quick_sort(arr: number[]): void {
  qs(arr, 0, arr.length - 1)
}

function qs(arr: number[], lo: number, hi: number): void {
  if (lo >= hi) return

  const idx = partition(arr, lo, hi)
  qs(arr, lo, idx - 1)
  qs(arr, idx + 1, hi)
}

function partition(arr: number[], lo: number, hi: number): number {
  const pivot = getMedium(arr, lo, hi)
  let idx = lo - 1
  for (let i = lo; i < hi; i++) {
    if (arr[i] > pivot) continue
    idx++
    const tmp = arr[i]
    arr[i] = arr[idx]
    arr[idx] = tmp
  }

  idx++
  const tmp = arr[hi]
  arr[hi] = arr[idx]
  arr[idx] = tmp
  return idx
}

function getMedium(arr: number[], lo: number, hi: number): number {
  return [arr[lo], arr[Math.floor(lo + (hi - lo) / 2)], arr[hi]].sort()[1]
}
