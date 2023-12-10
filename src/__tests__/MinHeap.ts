import MinHeap from "@code/MinHeap"

test("min heap", function () {
  const heap = new MinHeap()

  expect(heap.length).toEqual(0)

  heap.insert(5)
  heap.insert(3)
  heap.insert(69)
  heap.insert(420)
  heap.insert(4)
  heap.insert(1)
  heap.insert(8)
  heap.insert(7)

  console.log("insert result >> [1, 4, 3, 7, 5, 69, 8, 420 ]", heap.data)

  expect(heap.length).toEqual(8)
  expect(heap.delete()).toEqual(1)
  expect(heap.delete()).toEqual(3)
  expect(heap.delete()).toEqual(4)
  expect(heap.delete()).toEqual(5)
  expect(heap.length).toEqual(4)
  expect(heap.delete()).toEqual(7)
  expect(heap.delete()).toEqual(8)
  expect(heap.delete()).toEqual(69)

  // Test the delete method to ensure it correctly removes the last item.
  // After deletion, the last item is copied to the top, followed by a heapifyDown() operation.
  // While the internal representation of the heap array is usually not exposed to external users,
  // for the purpose of observing Dijkstra's algorithm, certain elements are made public for printing.
  // It is noteworthy that after the delete operation, the last element may linger, causing the length
  // of the array to be off by one compared to the class's reported length. Typically, when the length
  // reaches 0, a new array is declared. Despite this internal discrepancy, external methods for
  // output and consumption will function correctly.
  expect(heap.data.length).toEqual(1)

  expect(heap.delete()).toEqual(420)
  expect(heap.length).toEqual(0)
})
