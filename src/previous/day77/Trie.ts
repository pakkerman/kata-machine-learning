import { blue, yellow, green } from "../../ConsoleColors"

class TrieNode {
  public word?: string
  public children: Map<string, TrieNode>
  constructor(word?: string) {
    this.word = word
    this.children = new Map()
  }
}

export default class Trie {
  private root: TrieNode
  constructor() {
    this.root = new TrieNode()
  }

  insert(item: string): void {
    let curr = this.root
    for (const char of item) {
      if (!curr.children.has(char)) curr.children.set(char, new TrieNode())
      curr = curr.children.get(char)!
    }
    curr.word = item
  }
  find(partial: string): string[] {
    let curr = this.root
    for (const char of partial) {
      if (!curr.children.has(char)) return []
      curr = curr.children.get(char)!
    }

    const out: string[] = []
    getWords(curr)
    return out

    function getWords(curr: TrieNode): void {
      if (curr.word) out.push(curr.word)
      for (const child of curr.children.values()) getWords(child)
    }
  }

  delete(item: string): void {
    console.log("deleteing", item)
    deleteWord(this.root)

    function deleteWord(
      curr: TrieNode,
      idx: number = 0,
      indent: string = ""
    ): boolean {
      console.log(indent, blue, `# fn ${item[idx]}`)
      indent += "  "
      if (idx === item.length) {
        if (curr.word) {
          console.log(indent, `deleting ${curr.word}`)
          delete curr.word
        }
        console.log(indent, yellow, `return childsize = ${curr.children.size}`)
        return curr.children.size === 0
      }

      const char = item[idx]
      const child = curr.children.get(char)
      if (!child) return false
      if (!deleteWord(child, idx + 1, indent)) return false

      curr.children.delete(char)

      return curr.children.size === 0
    }
  }
}
