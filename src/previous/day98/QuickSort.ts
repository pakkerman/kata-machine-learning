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

function partition(arr: number[], lo: number, hi: number): number {
  const medium = [arr[lo], arr[Math.floor(lo + (hi - lo) / 2)], arr[hi]].sort()
  const medIdx = arr.indexOf(medium[1])
  ;[arr[medIdx], arr[hi]] = [arr[hi], arr[medIdx]]

  const pivot = arr[hi]
  let idx = lo - 1
  for (let i = lo; i < hi; i++) {
    if (arr[i] < pivot) {
      idx++
      const tmp = arr[i]
      arr[i] = arr[idx]
      arr[idx] = tmp
    }
  }

  idx++
  arr[hi] = arr[idx]
  arr[idx] = pivot
  return idx
}

