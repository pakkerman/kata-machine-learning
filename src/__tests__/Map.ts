import MyMap from "@code/Map"

test("Map", function () {
  const map = new MyMap<string | number, number>()
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

  // more test

  const data = [
    { key: "Borders", value: 50105 },
    { key: "invoice", value: 27259 },
    { key: "port", value: 4912 },
    { key: "Card", value: 64254 },
    { key: "maximize", value: 30141 },
    { key: "Auto", value: 14109 },
    { key: "Account", value: 59812 },
    { key: "up", value: 23243 },
    { key: "payment", value: 26228 },
    { key: "secondary", value: 90223 },
    { key: "focused", value: 19561 },
    { key: "Internal", value: 65149 },
    { key: "Manat", value: 28765 },
    { key: "International", value: 71860 },
    { key: "Bedfordshire", value: 27490 },
    { key: "reboot", value: 39223 },
    { key: "source", value: 92559 },
    { key: "sized", value: 26539 },
    { key: "tailers", value: 66767 },
    { key: "iterate", value: 65466 },
    { key: "auxiliary", value: 74993 },
    { key: "envisioneer", value: 90505 },
    { key: "Arkansas", value: 5835 },
    { key: "Computer", value: 43392 },
    { key: "system", value: 75249 },
    { key: "Sausages", value: 55509 },
    { key: "Branding", value: 54160 },
    { key: "Cambridgeshire", value: 3123 },
    { key: "oriented", value: 44151 },
    { key: "matrix", value: 20148 },
  ]

  for (let { key, value } of data) map.set(key, value)

  console.log(map.store)
})
