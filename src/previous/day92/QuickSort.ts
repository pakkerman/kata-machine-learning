export default function quick_sort(arr: number[]): void {
  sort(arr)

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
    const mid = Math.floor(lo + (hi - lo) / 2)
    let pivotIdx = getMedianIndex(arr, lo, mid, hi)
    ;[arr[pivotIdx], arr[hi]] = [arr[hi], arr[pivotIdx]]

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
}

function getMedianIndex(
  arr: number[],
  a: number,
  b: number,
  c: number
): number {
  const aValue = arr[a]
  const bValue = arr[b]
  const cValue = arr[c]
  if (aValue > bValue) {
    if (bValue > cValue) return b
    else if (aValue > cValue) return c
    else return a
  } else {
    if (aValue > cValue) return a
    else if (bValue > cValue) return c
    else return b
  }
}
