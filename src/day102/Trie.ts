class TrieNode {
  public word?: string
  public children: Map<string, TrieNode>
  constructor(word?: string) {
    this.word = word
    this.children = new Map()
  }
}

export default class Trie {
  private root
  constructor() {
    this.root = new TrieNode()
  }

  insert(item: string): void {
    let curr = this.root
    for (let i = 0; i < item.length; i++) {
      const char = item[i].toLowerCase()

      if (!curr.children.has(char)) {
        curr.children.set(char, new TrieNode())
      }

      curr = curr.children.get(char)!
    }

    curr.word = item
  }

  delete(item: string): void {
    recurse(this.root)

    function recurse(curr: TrieNode, idx: number = 0): boolean {
      if (idx === item.length) {
        if (curr.word) {
          delete curr.word
          return curr.children.size === 0
        }
      }

      const char = item[idx].toLowerCase()
      const child = curr.children.get(char)
      if (!child) return false
      if (!recurse(child, idx + 1)) return false

      child.children.delete(char)

      return curr.children.size === 0
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
      if (curr.word) {
        out.push(curr.word)
      }

      for (const child of curr.children.values()) {
        recurse(child)
      }
    }
  }
}

