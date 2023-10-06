export default function bs_list(haystack: number[], needle: number): boolean {
  // Binary search is [lo, hi)
  let lo = 0
  let hi = haystack.length
  while (lo < hi) {
    const mid = Math.floor(lo + (hi - lo) / 2)
    const val = haystack[mid]
    if (val === needle) return true
    if (needle < val) {
      hi = mid
    } else {
      //because the lo is inclusve, so while the mid is already been checked in this iteration, we can do mid + 1, let the next iteration start with the mid + 1 item
      lo = mid + 1
    }
  }
  return false
}
