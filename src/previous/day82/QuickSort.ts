export default function quick_sort(arr: number[]): void {
  // console.log(`arr: [${arr}]`)
  sort(arr, 0, arr.length - 1)

  function sort(arr: number[], lo: number, hi: number): void {
    if (lo >= hi) return

    const idx = partition(arr, lo, hi)
    sort(arr, lo, idx - 1)
    sort(arr, idx + 1, hi)
  }

  function partition(arr: number[], lo: number, hi: number): number {
    const mid = [
      arr[lo],
      arr[Math.floor(lo + (hi - lo) / 2)],
      arr[hi],
    ].sort()[1]

    const pivot = arr[hi]
    // console.log(`lo: ${lo}, hi: ${hi}, mid: ${mid}, pivot: ${pivot}`)

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
