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
    "Weimann",
    "O'Keefe",
    "Walsh",
    "D'Amore",
    "Nolan",
    "Considine",
    "Larson",
    "Parisian",
    "Kohler",
    "Mitchell",
    "Turner",
    "Steuber",
    "Bauch",
    "Thiel",
    "Kovacek",
    "Gulgowski",
    "Greenfelder",
    "DuBuque",
    "Zboncak",
    "Steuber",
    "Bergstrom",
    "Heller",
    "Zulauf",
    "Heathcote",
    "Hahn",
    "Ledner",
    "Kozey",
    "Kris",
    "Strosin",
    "Goodwin",
    "Daniel",
    "Purdy",
    "Conn",
    "Donnelly",
    "Lubowitz",
    "Lubowitz",
    "Conn",
    "Gleichner",
    "Hegmann",
    "Corwin",
    "Kohler",
    "Larkin",
    "Aufderhar",
    "Hermiston",
    "Boyle",
    "Stiedemann",
    "Bernier",
    "Hermiston",
    "D'Amore",
    "Carter",
    "Dooley",
    "Stiedemann",
    "Herzog",
    "Keeling",
    "Cummings",
    "Oberbrunner",
    "Bode",
    "Huels",
    "Ledner",
    "Strosin",
    "DuBuque",
    "Schamberger",
    "Herzog",
    "Tremblay",
    "Franey",
    "Hettinger",
    "Williamson",
    "Dare",
    "Mraz",
    "Renner",
    "Hoeger",
    "Schamberger",
    "Hoeger",
    "Douglas",
    "Maggio",
    "Ondricka",
    "Kutch",
    "Weimann",
    "Blick",
    "Yost",
    "Harber",
    "McKenzie",
    "Braun",
    "Parisian",
    "Ullrich",
    "Borer",
    "Klein",
    "Franey",
    "Moen",
    "Goldner",
    "Bednar",
    "Trantow",
    "Gusikowski",
    "D'Amore",
    "Skiles",
    "Leannon",
    "Hackett",
    "Quigley",
    "Dare",
    "Mosciski",
  ]

  for (let item of data) map.set(item, +(Math.random() * 10000).toFixed(0))

  let emptyBucketCount = 0
  let bucketWithMoreThanOneItem = 0
  for (let i = 0; i < map.store.length; i++) {
    if (map.store[i].length === 0) emptyBucketCount++
    if (map.store[i].length > 1) bucketWithMoreThanOneItem++
  }

  console.log(map.store)
  console.log(
    "map data length:",
    map.size(),
    "\nmap size:",
    map.store.length,
    "\nEmpty Buckets:",
    emptyBucketCount,
    "\nBucket with more than one items",
    bucketWithMoreThanOneItem
  )

  console.log(map.get("Franey"))
})
