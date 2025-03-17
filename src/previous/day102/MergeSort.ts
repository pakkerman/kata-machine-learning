export default function merge_sort(arr: number[]): void {
  fn(arr)

  function fn(arr: number[]): void {
    if (arr.length <= 1) return

    const mid = Math.floor(arr.length / 2)
    const left: number[] = []
    const right: number[] = []
    for (let i = 0; i < arr.length; i++) {
      if (i < mid) left.push(arr[i])
      else right.push(arr[i])
    }

    fn(left)
    fn(right)
    merge(arr, left, right)
  }

  function merge(arr: number[], left: number[], right: number[]): void {
    let i = 0
    let l = 0
    let r = 0

    while (l < left.length && r < right.length) {
      if (left[l] < right[r]) arr[i++] = left[l++]
      else arr[i++] = right[r++]
    }

    while (l < left.length) arr[i++] = left[l++]
    while (r < right.length) arr[i++] = right[r++]
  }
}

