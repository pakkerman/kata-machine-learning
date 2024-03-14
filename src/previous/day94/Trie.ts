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

  delete(item: string): void {
    recurse(this.root)

    function recurse(curr: TrieNode, idx: number = 0): boolean {
      if (idx === item.length) {
        delete curr.word
        return curr.children.size === 0
      }
      const char = item[idx]
      const child = curr.children.get(char)
      if (!child) return false
      if (!recurse(child, idx + 1)) return false
      curr.children.delete(char)
      return curr.children.size === 0
    }
  }
  find(partial: string): string[] {
    let curr = this.root
    for (const char of partial) {
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

