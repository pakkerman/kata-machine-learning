import { describe, test, expect } from "bun:test"
import Trie from "@code/Trie"

describe("Trie Tests", () => {
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
  test("insert 100 words", () => {
    const trie = new Trie()

    const words = [
      "Zakary",
      "Opal",
      "Paolo",
      "Gertrude",
      "Lacey",
      "Adalberto",
      "Moses",
      "Zackary",
      "Eva",
      "Herta",
      "Dominique",
      "Christophe",
      "Mark",
      "Deontae",
      "Tressie",
      "Kevin",
      "Jeremy",
      "Angelica",
      "Elmira",
      "Clinton",
      "Ettie",
      "Dwight",
      "Lori",
      "Jesus",
      "Francesca",
      "Wade",
      "Henry",
      "Libbie",
      "Dahlia",
      "Lora",
      "Angeline",
      "Ivy",
      "Elissa",
      "Jevon",
      "Earline",
      "Ettie",
      "Mark",
      "Weldon",
      "Lane",
      "Tiffany",
      "Green",
      "Kelli",
      "Tiffany",
      "Bradly",
      "Jimmie",
      "Elian",
      "Leora",
      "Keegan",
      "Natalie",
      "Josefina",
      "Kenny",
      "Foster",
      "Green",
      "Kitty",
      "Lyric",
      "Simone",
      "Nadia",
      "Tiara",
      "Fredy",
      "Roosevelt",
      "Isaiah",
      "Penelope",
      "Herman",
      "Pauline",
      "Carlee",
      "Ramon",
      "Kattie",
      "Erling",
      "Jefferey",
      "Bell",
      "Abe",
      "Robbie",
      "Haylee",
      "Gordon",
      "Kale",
      "Bud",
      "Wyatt",
      "Kiel",
      "Gino",
      "Coty",
      "Bruce",
      "Moises",
      "Domenica",
      "Deven",
      "Minerva",
      "Houston",
      "Aurore",
      "Alexandrea",
      "Renee",
      "Birdie",
      "Hester",
      "Janessa",
      "Tyrese",
      "Easter",
      "Katrina",
      "Janessa",
      "Rosa",
      "Kristian",
      "Brisa",
      "Brandon",
    ]

    for (let i = 0; i < words.length; i++) {
      trie.insert(words[i])
    }

    // case sensitive
    const a = trie.find("A")
    expect(a).toEqual([
      "Adalberto",
      "Angelica",
      "Angeline",
      "Abe",
      "Aurore",
      "Alexandrea",
    ])
  })
})
