import RingBuffer from "@code/RingBuffer"

const buffer = new RingBuffer<number>(3)

describe("RingBuffer", () => {
  test("Push", () => {
    buffer.push(1)
    buffer.push(2)
    buffer.push(3)

    expect(buffer.get(0)).toBe(1)
    expect(buffer.get(1)).toBe(2)
    expect(buffer.get(2)).toBe(3)

    buffer.push(4)
    buffer.push(4)
    buffer.push(4)

    expect(buffer.buffer).toEqual([4, 4, 4])
  })

  test("Pop", () => {
    expect(buffer.pop()).toBe(4)
    expect(buffer.length).toBe(2)
    expect(buffer.pop()).toBe(4)
    expect(buffer.pop()).toBe(4)
    expect(buffer.length).toBe(0)
  })

  test("Get", () => {
    console.log(buffer.buffer)
    expect(buffer.get(0)).toBe(undefined)
    buffer.push(1)
    buffer.push(2)
    buffer.push(3)
    expect(buffer.get(2)).toBe(3)
    buffer.push(4)
    expect(buffer.get(0)).toBe(4)
  })
})
