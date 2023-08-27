import Trie from "@code/Trie"

test("Trie", function () {
  const trie = new Trie()

  //   trie.insert("fo")
  // trie.delete("fo")

  // og tests

  // trie.insert("ca")
  // trie.insert("cat")
  // trie.insert("cats")
  // trie.insert("carrer")
  // expect(trie.find("ca").sort()).toEqual(["ca", "carrer", "cat", "cats"])
  // trie.delete("ca")
  // expect(trie.find("ca").sort()).toEqual(["carrer", "cat", "cats"])

  trie.insert("foo")
  trie.insert("fool")
  trie.insert("foolish")
  trie.insert("bar")
  trie.insert("cat")

  console.log(trie.find(""))

  expect(trie.find("fo").sort()).toEqual(["foo", "fool", "foolish"])

  trie.delete("fool")
  trie.delete("cat")

  expect(trie.find("fo").sort()).toEqual(["foo", "foolish"])

  console.log(trie.find(""))

  // added test to make sure it will delete unworded nodes
  trie.delete("foo")
  trie.delete("foolish")
  expect(trie.find("bar").sort()).toEqual(["bar"])
  console.log(trie.find(""))
})
