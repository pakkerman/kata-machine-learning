import { describe, test, expect } from "bun:test"
import bfs from "@code/BFSGraphMatrix"
import { matrix2 } from "../__tests__/graph"

console.log("matrix2: ")
matrix2.forEach((row) => console.log(row))

describe("BFSGraphMatrix Test", () => {
  test(() => {
    expect(bfs(matrix2, 0, 6)).toEqual([0, 1, 4, 5, 6])
    expect(bfs(matrix2, 6, 0)).toEqual(null)
  })
})
