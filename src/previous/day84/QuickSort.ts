export default function quick_sort(arr: number[]): void {
  // [lo, hi]
  sort(arr, 0, arr.length - 1)

  function sort(arr: number[], lo: number, hi: number): void {
    // console.log(arr.map((item) => item.toString().padStart(3, " ")))
    const arrows = new Array(arr.length).fill("   ")
    arrows[lo] = "^lo"
    arrows[hi] = "^hi"
    // console.log(arrows)
    if (lo >= hi) return

    const idx = partition(arr, lo, hi)
    arrows[idx] = "idx"
    // console.log(arrows)
    sort(arr, lo, idx - 1)
    sort(arr, idx + 1, hi)
  }

  function partition(arr: number[], lo: number, hi: number): number {
    let pivot = arr[hi]
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

// lo = 5, hi = 6, pivot = 69
// [420, 69]
// idx = 4
// forloop(i < 5, hi = 6)
// 420 >= 69: continue
// end loop
// idx++: 5
// swap hi and pivot
// [69, 420]
// return 5

// lo = 0, hi = 3
// [9, 3, 6, 4]
// idx: -1, pivot:4
// forLoop(i = 0, i < 3)
//    ith: 9, 9 >= 4: continue
// forLoop(i = 1, i < 3)
//    ith: 3, 3 >= 4: false
//    idx: 0, swap => [3, 9, 6, 4]
// forLoop(i = 2, i < 3)
//    ith: 6, 6 >= 4: continue
// forLoop ends
// idx++: 1
// swap hi and idx [3,4,6,9]
// return idx: 1

// lo = 0, hi = 6
// [9, 3, 6, 4, 69, 420, 42]
// idx: -1, pivot: 42
// forloop(i = 0, i < 6)
//    ith = 9, 9 >= 42: false
//    idx: 0, swap
// [9, 3, 6, 4, 69, 420, 42]
// forloop(i = 1, i < 6)
//    ith = 3, 3 >= 42: false
//    idx: 1, swap
// [9, 3, 6, 4, 69, 420, 42]
// forloop(i = 2, i < 6)
//    ith = 6, 6 >= 42: false
//    idx: 2, swap
// [9, 3, 6, 4, 69, 420, 42]
// forloop(i = 3, i < 6)
//    ith = 4, 4 >= 42: false
//    idx: 3, swap
// [9, 3, 6, 4, 69, 420, 42]
// forloop(i = 4, i < 6)
//    ith = 69, 69 >= 42: true
//    continue
// forloop(i = 5, i < 6)
//    ith = 420, 420 >= 42: true
//    continue
// forloop ends
// idx: 4, swap idx and hi
// [9, 3, 6, 4, 42, 420, 69]
// return idx: 4
