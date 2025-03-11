import { test, describe, expect } from "bun:test"
import Map from "@code/Map"

describe("Map() test", () => {
  test("testing operations", () => {
    const map = new Map()

    map.set("foo", 55)
    expect(map.size()).toEqual(1)
    map.set("fool", 75)
    expect(map.size()).toEqual(2)
    map.set("foolish", 105)
    expect(map.size()).toEqual(3)
    map.set("bar", 69)
    expect(map.size()).toEqual(4)

    expect(map.get("bar")).toEqual(69)
    expect(map.get("blaz")).toEqual(undefined)

    map.delete("barblabr")
    expect(map.size()).toEqual(4)

    map.delete("bar")
    expect(map.size()).toEqual(3)
    expect(map.get("bar")).toEqual(undefined)

    map.set("61", 69)
    map.set(11, 69)
    map.set(11, 69)
  })

  test("testing 50 items", () => {
    const map = new Map()

    const data = [
      "Grayson",
      "Donald",
      "Hiram",
      "Nyah",
      "Stephany",
      "Rodrigo",
      "Delores",
      "Nikki",
      "Damion",
      "Chet",
      "Reta",
      "Omer",
      "Sunny",
      "Bulah",
      "Guillermo",
      "Arlie",
      "Donny",
      "Gay",
      "Bud",
      "Sebastian",
      "Jerald",
      "Lee",
      "Jordane",
      "Morris",
      "Hosea",
      "Nicola",
      "Vaughn",
      "Alvena",
      "Adolphus",
      "Darrell",
      "Ike",
      "Braulio",
      "Brady",
      "Rosalee",
      "Brent",
      "Lonnie",
      "Doug",
      "Amari",
      "Nya",
      "Penelope",
      "Juliet",
      "Nellie",
      "Melissa",
      "Danika",
      "Meggie",
      "Matilde",
      "Hazle",
      "Aron",
      "Kirk",
      "Samir",
    ]

    for (let i = 0; i < data.length; i++) {
      map.set(data[i], +(Math.random() * 10000).toFixed(0))
    }

    map.store.forEach((item, idx) =>
      console.log(
        `${idx}: [ ${item.map((item) => `${item.key}: ${item.value}`)} ]`
      )
    )
    console.log(`length: ${
      map.length
    }\nlength by counting store item:${map.store.reduce(
      (acc, curr) => (curr != null ? acc + 1 : acc + 0),
      0
    )}
    `)
    console.log("map.get('Grayson') =>", map.delete("Grayson"))
    console.log("map.get('Kirk') =>", map.delete("Kirk"))
    console.log("map.get('Reta') =>", map.delete("Reta"))
  })
})
