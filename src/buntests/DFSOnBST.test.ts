import dfs from "@code/DFSOnBST"
import { tree } from "../__tests__/tree"

describe("DFS on BST", () => {
  test("", () => {
    expect(dfs(tree, 45)).toEqual(true)
    expect(dfs(tree, 7)).toEqual(true)
    expect(dfs(tree, 69)).toEqual(false)
  })
})
