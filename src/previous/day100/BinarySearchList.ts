export default function bs_list(haystack: number[], needle: number): boolean {
  let lo = 0
  let hi = haystack.length
  while (lo < hi) {
    const mid = Math.floor(lo + (hi - lo) / 2)
    const val = haystack[mid]
    if (val === needle) return true
    if (val < needle) lo = mid + 1
    else hi = mid
  }
  return false
}

