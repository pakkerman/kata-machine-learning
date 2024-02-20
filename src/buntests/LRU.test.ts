import { describe, test, expect } from "bun:test"
import LRU from "@code/LRU"

console.clear()

const lru = new LRU(3)
const item = [
  { key: "A", value: "1" },
  { key: "B", value: "2" },
  { key: "C", value: "3" },
  { key: "D", value: "4" },
  { key: "E", value: "5" },
  { key: "F", value: "6" },
  { key: "G", value: "7" },
  { key: "H", value: "8" },
  { key: "I", value: "9" },
  { key: "J", value: "10" },
  { key: "K", value: "11" },
]

describe("LRU test", () => {
  test("update()", () => {
    lru.update(item[0].key, item[0].value)
    lru.update(item[1].key, item[1].value)
    lru.update(item[2].key, item[2].value)
    lru.update(item[3].key, item[3].value)
  })

  test("get()", () => {
    expect(lru.get(item[0].key)).toBe(undefined)
    expect(lru.get(item[1].key)).toBe(item[1].value)
    expect(lru.get(item[2].key)).toBe(item[2].value)
    expect(lru.get(item[3].key)).toBe(item[3].value)
  })

  test("more tests", () => {
    item.forEach((item) => lru.update(item.key, item.value))

    expect(lru.get(item.at(-1)?.key)).toBe(item.at(-1)?.value)

    for (let item of lru.nodes.keys()) console.log(item)
    for (let item of lru.keys.keys()) console.log(item.value)
  })
})
