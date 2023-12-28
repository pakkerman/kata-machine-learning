export default function bs_list(haystack: number[], needle: number): boolean {
  // Binary search is [lo, hi), hi is exclusive, so that means hi is not the index of the last item when init lo and hi, so we can use length
  let lo = 0
  let hi = haystack.length
  while (lo < hi) {
    console.log(haystack.slice(lo, hi))
    const mid = Math.floor(lo + (hi - lo) / 2)
    const val = haystack[mid]

    if (val === needle) return true
    if (val < needle) lo = mid + 1
    else hi = mid
  }

  return false
}
