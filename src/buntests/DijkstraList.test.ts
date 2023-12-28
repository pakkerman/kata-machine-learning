import { describe, test, expect } from "bun:test"
import dijkstra_list from "@code/DijkstraList"
import { list1, list2 } from "__tests__/graph"

describe("Dijkstra List Test", () => {
  test("testing ", () => {
    expect(dijkstra_list(0, 6, list1)).toEqual([0, 1, 4, 5, 6])
    expect(dijkstra_list(0, 3, list2)).toEqual([0, 2, 3])
  })
})
