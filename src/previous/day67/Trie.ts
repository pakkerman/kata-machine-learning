type TrieNode = {
  word?: string
  children: Map<string, TrieNode>
}

export default class Trie {
  private root: TrieNode
  constructor() {
    this.root = { children: new Map() }
  }

  insert(item: string): void {
    let curr = this.root
    for (let i = 0; i < item.length; i++) {
      const char = item[i]

      if (!curr.children.has(char))
        curr.children.set(char, { children: new Map() })
      curr = curr.children.get(char)!
    }

    curr.word = item
  }
  find(partial: string): string[] {
    let curr = this.root
    for (let i = 0; i < partial.length; i++) {
      const char = partial[i]
      const child = curr.children.get(char)
      if (!child) return []
      curr = child
    }

    const out: string[] = []
    this.getWords(curr, out)
    return out
  }

  private getWords(curr: TrieNode, out: string[]): void {
    if (curr.word) out.push(curr.word)
    for (const child of curr.children.values()) {
      this.getWords(child, out)
    }
  }
  delete(item: string): void {
    this.deleteWord(this.root, item)
    console.log("deleted", item)
    console.log(this.root)
  }

  private deleteWord(curr: TrieNode, word: string, idx: number = 0): boolean {
    if (idx === word.length) {
      delete curr.word
      return curr.children.size === 0
    }

    const char = word[idx]
    const child = curr.children.get(char)
    if (!child) return false
    if (!this.deleteWord(child, word, idx + 1)) return false

    curr.children.delete(char)

    return curr.children.size === 0
  }
}
