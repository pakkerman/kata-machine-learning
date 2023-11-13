class TrieNode {
  public word?: string
  public children: Map<string, TrieNode>
  constructor(word?: string) {
    this.word = word
    this.children = new Map()
  }
}

export default class Trie {
  public root: TrieNode
  constructor() {
    this.root = new TrieNode()
  }

  insert(item: string): void {
    let curr = this.root
    for (let i = 0; i < item.length; i++) {
      const char = item[i]
      if (!curr.children.has(char)) curr.children.set(char, new TrieNode())
      curr = curr.children.get(char)!
    }
    curr.word = item
  }

  delete(item: string): void {
    deleteWord(this.root)

    function deleteWord(curr: TrieNode, idx: number = 0): boolean {
      if (idx === item.length) {
        delete curr.word
        return curr.children.size === 0
      }

      const char = item[idx]
      const child = curr.children.get(char)
      if (!child) return false
      if (!deleteWord(child, idx + 1)) return false

      curr.children.delete(char)

      return curr.children.size === 0
    }
  }
  find(partial: string): string[] {
    let curr = this.root
    for (let i = 0; i < partial.length; i++) {
      const char = partial[i]
      if (!curr.children.has(char)) return []
      curr = curr.children.get(char)!
    }

    const out: string[] = []
    getWords(curr)
    return out

    function getWords(curr: TrieNode): void {
      if (curr.word) out.push(curr.word)
      for (const child of curr.children.values()) {
        getWords(child)
      }
    }
  }
}
