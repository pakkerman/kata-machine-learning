class TrieNode {
  word?: string
  children: Map<string, TrieNode>
  constructor() {
    this.children = new Map()
  }

  setWord(word: string) {
    this.word = word
  }

  getWord(): string | void {
    return this.word
  }

  deleteWord(): void {
    delete this.word
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
      char = char.toLowerCase()
      if (!curr.children.has(char)) curr.children.set(char, new TrieNode())
      curr = curr.children.get(char)!
    }
    curr.setWord(item)
  }
  delete(item: string): void {
    recurse(this.root)

    function recurse(curr: TrieNode, idx: number = 0): boolean {
      if (idx === item.length) {
        if (curr.getWord()) curr.deleteWord()
        return curr.children.size === 0
      }

      const char = item[idx].toLowerCase()
      const child = curr.children.get(char)
      if (!child) return false
      if (!recurse(child, idx + 1)) return false

      curr.children.delete(char)
      return curr.children.size === 0
    }
  }
  find(partial: string): string[] {
    let curr = this.root
    for (let char of partial) {
      char = char.toLowerCase()
      if (!curr.children.has(char)) return []
      curr = curr.children.get(char)!
    }

    const out: string[] = []
    recurse(curr)
    return out

    function recurse(curr: TrieNode): void {
      if (curr.getWord()) out.push(curr.getWord()!)
      for (const child of curr.children.values()) recurse(child)
    }
  }
}
