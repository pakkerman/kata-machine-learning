class TrieNode {
  word?: string
  children: Map<string, TridNode>
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
    for (let i = 0; i < item.length; i++) {
      const char = item[i].toLowerCase()
      if (!curr.children.has(char)) curr.children.set(char, new TrieNode())
      curr = curr.children.get(char)
    }
    curr.word = item
  }

  find(partial: string): string[] {
    let curr = this.root
    for (let char of partial) {
      char = char.toLowerCase()
      if (!curr.children.has(char)) return []
      curr = curr.children.get(char)
    }

    const out: string[] = []
    recurse(curr)
    return out

    function recurse(curr: TrieNode) {
      if (curr.word) out.push(curr.word)

      for (const child of curr.children.values()) {
        recurse(child)
      }
    }
  }

  delete(item: string): void {
    recurse(this.root)
    function recurse(curr: TrieNode, idx: number = 0): boolean {
      if (idx === item.length) {
        delete curr.word
        return curr.children.size === 0
      }

      const child = curr.children.get(item[idx])
      if (!child) return false
      if (!recurse(child, idx + 1)) return false

      curr.children.delete(item[idx])
      return curr.children.size === 0
    }
  }
}

