import prims from "@code/PrimsList"
import { list1 } from "./graph"

// https://www.youtube.com/watch?v=om4nY7nQyBQ  56:51
test("PrimsAlgorithm", function () {
  // there is only one right answer for this graph
  expect(prims(list1)).toEqual([
    [
      { to: 2, weight: 1 },
      { to: 1, weight: 3 },
    ],
    [
      { to: 0, weight: 3 },
      { to: 4, weight: 1 },
      { to: 3, weight: 3 },
    ],
    [
      { to: 0, weight: 1 },
      { to: 3, weight: 7 },
    ],
    [
      { to: 1, weight: 3 },
      { to: 2, weight: 7 },
      { to: 6, weight: 1 },
    ],
    [
      { to: 1, weight: 1 },
      { to: 5, weight: 2 },
    ],
    [
      { to: 4, weight: 2 },
      { to: 6, weight: 1 },
    ],
    [
      { to: 5, weight: 1 },
      { to: 3, weight: 1 },
    ],
  ])
})

// Original test
// test("PrimsAlgorithm", function () {
//   // there is only one right answer for this graph
//   expect(prims(list1)).toEqual([
//     [
//       { to: 2, weight: 1 },
//       { to: 1, weight: 3 },
//     ],
//     [
//       { to: 0, weight: 3 },
//       { to: 4, weight: 1 },
//     ],
//     [{ to: 0, weight: 1 }],
//     [{ to: 6, weight: 1 }],
//     [
//       { to: 1, weight: 1 },
//       { to: 5, weight: 2 },
//     ],
//     [
//       { to: 4, weight: 2 },
//       { to: 6, weight: 1 },
//     ],
//     [
//       { to: 5, weight: 1 },
//       { to: 3, weight: 1 },
//     ],
//   ])
// })
