type TrieNode = {
  children: Map<string, TrieNode>
  word?: string
}

export default class Trie {
  private root: TrieNode
  constructor() {
    this.root = this.createNode()
  }

  insert(item: string): void {
    let curr = this.root
    for (let i = 0; i < item.length; i++) {
      const char = item[i]
      const child = curr.children.get(char)
      if (!child) curr.children.set(char, this.createNode())
      curr = curr.children.get(char)!
    }
    curr.word = item
  }
  delete(item: string): void {
    this.deleteWord(this.root, item)
  }

  private deleteWord(curr: TrieNode, word: string, idx: number = 0): boolean {
    if (idx === word.length) {
      console.log("deleting", curr.word)
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
    for (const key of curr.children.keys()) {
      this.getWords(curr.children.get(key)!, out)
    }
  }

  private createNode(): TrieNode {
    return { children: new Map() }
  }
}
