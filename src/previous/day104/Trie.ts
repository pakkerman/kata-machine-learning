class TrieNode {
  public children: Map<string, TrieNode>
  public word?: string
  constructor() {
    this.children = new Map()
  }
}

export default class Trie {
  root: TrieNode

  constructor() {
    this.root = new TrieNode()
  }

  insert(item: string): void {
    let curr = this.root
    for (let char of item) {
      char = char.toLowerCase()
      if (!curr.children.has(char)) {
        curr.children.set(char, new TrieNode())
      }

      curr = curr.children.get(char)!
    }

    curr.word = item
  }

  delete(item: string): void {
    let curr = this.root
    recurse(curr, 0)

    function recurse(curr: TrieNode, idx: number): boolean {
      if (idx === item.length) {
        if (curr.word) {
          delete curr.word
          return curr.children.size !== 0
        }
      }

      const char = item[idx].toLowerCase()
      const child = curr.children.get(char)
      if (!child) return false
      if (recurse(child, idx + 1)) return false

      curr = curr.children.get(char)!

      curr.children.delete(char)
      return curr.children.size !== 0
    }
  }

  find(partial: string): string[] {
    let curr = this.root

    for (let i = 0; i < partial.length; i++) {
      const char = partial[i].toLowerCase()
      if (!curr.children.has(char)) return []

      curr = curr.children.get(char)!
    }

    const out: string[] = []
    recurse(curr)
    return out

    function recurse(curr: TrieNode): void {
      if (curr.word) out.push(curr.word)

      for (const child of curr.children.values()) {
        recurse(child)
      }
    }
  }
}

