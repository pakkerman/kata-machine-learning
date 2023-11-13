import { blue, yellow, green } from "../../ConsoleColors"

export default function quick_sort(arr: number[]): void {
  qs(arr, 0, arr.length - 1)
}

function qs(arr: number[], lo: number, hi: number, indent: string = ""): void {
  console.log(indent, blue, `Fn(arr: [${arr}], lo: ${lo}, hi: ${hi})`)
  indent += "  "

  console.log(indent, yellow, `Basecase: ${lo >= hi ? "true" : "false"}`)
  if (lo >= hi) return

  const idx = partition(arr, lo, hi, indent)
  console.log(indent, `idx: ${idx}`)
  console.log(indent, `qs: [${arr.slice(lo, idx - 1)}]`)
  qs(arr, lo, idx - 1, indent)
  console.log(indent, `qs: [${arr.slice(idx + 1, hi)}]`)
  qs(arr, idx + 1, hi, indent)
}

function partition(
  arr: number[],
  lo: number,
  hi: number,
  indent: string
): number {
  console.log(indent, blue, `Partition(arr: [${arr}], lo: ${lo}, hi: ${hi})`)
  indent += "  "
  const pivot = arr[hi]
  let idx = lo - 1
  console.log(indent, `pivot: ${pivot}, idx: ${lo - 1}`)
  console.log(indent, yellow, `forloop(i = ${lo}, i < ${hi})`)
  for (let i = lo; i < hi; i++) {
    console.log(indent + "  ", yellow, `for(i = ${i}, idx: ${idx})`)
    console.log(
      indent + "  ",
      yellow,
      `arr[${i}]: ${arr[i]} >= pivot: ${pivot}: ${
        arr[i] >= pivot ? "continue" : "false"
      }`
    )
    if (arr[i] >= pivot) continue

    idx++
    const tmp = arr[idx]
    arr[idx] = arr[i]
    arr[i] = tmp
    console.log(
      indent + "  ",
      `idx + 1: ${idx}, swap: ${arr[idx]} and ${arr[i]}, arr: ${arr}`
    )
  }
  idx++
  arr[hi] = arr[idx]
  arr[idx] = pivot
  return idx
}

function getMediumIdx(arr: number[], lo: number, hi: number): number {
  return arr.lastIndexOf(
    [arr[lo], arr[Math.floor(arr.length / 2)], arr[hi]].sort()[1]
  )
}

const arr = [9, 3, 7, 4, 69, 420, 42]
quick_sort(arr)
