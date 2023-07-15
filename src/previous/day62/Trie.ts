type TrieNode = {
  word?: string
  children: Map<string, TrieNode>
}

export default class Trie {
  private root: TrieNode

  constructor() {
    this.root = this.createNode()
  }

  insert(item: string): void {
    if (item === "") return

    let curr = this.root
    for (let i = 0; i < item.length; i++) {
      const char = item[i].toLowerCase()
      if (!curr.children.has(char)) curr.children.set(char, this.createNode())
      curr = curr.children.get(char)!
    }
    curr.word = item
  }
  delete(item: string): void {
    if (!item || item.length === 0) return
    console.log("deleting ", item)
    this.deleteWord(this.root, item)
  }
  private deleteWord(curr: TrieNode, word: string, idx: number = 0): boolean {
    console.log("looking at curr: ", curr)
    if (idx === word.length) {
      curr.word = undefined
      return curr.children.size === 0
    }

    const char = word[idx].toLowerCase()
    const child = curr.children.get(char)
    console.log("child: ", child)

    if (!child) return false
    if (!this.deleteWord(child, word, idx + 1)) return false

    child.children.delete(char)
    return child.children.size === 0
  }

  find(partial: string): string[] {
    let curr = this.root
    for (let i = 0; i < partial.length; i++) {
      const char = partial[i].toLowerCase()
      if (!curr.children.has(char)) return []
      curr = curr.children.get(char)!
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

  private createNode(): TrieNode {
    return { children: new Map() }
  }
}
