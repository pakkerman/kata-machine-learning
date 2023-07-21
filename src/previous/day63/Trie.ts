type TrieNode = {
  word?: string
  children: Map<string, TrieNode>
}

export default class Trie {
  private root
  constructor() {
    this.root = this.createNode()
  }

  insert(item: string): void {
    let curr = this.root
    for (let i = 0; i < item.length; i++) {
      const char = item[i]
      if (!curr.children.has(char)) curr.children.set(char, this.createNode())
      curr = curr.children.get(char)!
    }

    curr.word = item
  }
  find(partial: string): string[] {
    const out: string[] = []
    let curr = this.root
    for (let i = 0; i < partial.length; i++) {
      const char = partial[i]
      if (!curr.children.has(char)) return out
      curr = curr.children.get(char)!
    }

    this.getWords(curr, out)
    return out
  }

  private getWords(curr: TrieNode, out: string[]): void {
    console.log(curr)
    if (curr.word) out.push(curr.word)
    for (const child of curr.children.values()) {
      this.getWords(child, out)
    }
  }

  delete(item: string): void {
    console.log(this.root)
    this.deleteWord(this.root, item)
  }

  private deleteWord(curr: TrieNode, word: string, idx: number = 0): boolean {
    if (idx === word.length) {
      if (curr.word === word) delete curr.word
      return curr.children.size === 0
    }

    const char = word[idx]
    const child = curr.children.get(char)

    if (!child) return false
    if (!this.deleteWord(child, word, idx + 1)) return false

    curr.children.delete(char)

    return curr.word != undefined
  }

  private createNode(): TrieNode {
    return { children: new Map() }
  }
}
