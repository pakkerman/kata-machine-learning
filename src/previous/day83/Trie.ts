class TrieNode {
  word?: string
  children: Map<string, TrieNode>
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
    for (let char of item) {
      if (!curr.children.has(char)) curr.children.set(char, new TrieNode())
      curr = curr.children.get(char)!
    }

    curr.word = item
  }

  delete(item: string): void {
    recurse(this.root, 0)

    function recurse(curr: TrieNode, idx: number): boolean {
      if (idx === item.length) {
        if (curr.word) delete curr.word
        return curr.children.size === 0
      }

      const char = item[idx]
      const child = curr.children.get(char)
      if (!child || !recurse(child, idx + 1)) return false

      curr.children.delete(char)
      return curr.children.size === 0
    }
  }
  find(partial: string): string[] {
    let curr = this.root
    for (let char of partial) {
      if (!curr.children.has(char)) return []
      curr = curr.children.get(char)!
    }

    const out: string[] = []
    recurse(curr)
    return out

    function recurse(curr: TrieNode): void {
      if (curr.word) out.push(curr.word)
      for (let child of curr.children.values()) recurse(child)
    }
  }
}
