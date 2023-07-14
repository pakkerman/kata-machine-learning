type TrieNode = {
  children: Map<string, TrieNode>
  word: string
  isEnd: boolean
}

export default class Trie {
  private root: TrieNode
  constructor() {
    this.root = this.createNode("")
  }

  insert(item: string): void {
    console.log(`inserting ${item}`)
    let curr = this.root
    for (let i = 0; i < item.length; i++) {
      const char = item[i].toLowerCase()
      if (!curr.children.has(char)) curr.children.set(char, this.createNode(""))
      curr = curr.children.get(char)!
    }
    curr.isEnd = true
    curr.word = item
  }
  delete(item: string): void {
    console.log(`deleteing ${item}`)
    this.deleteWord(this.root, item)
  }
  private deleteWord(curr: TrieNode, word: string, idx: number = 0): boolean {
    if (idx === word.length) {
      if (!curr.isEnd) return false
      curr.isEnd = false
      curr.word = ""
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
    const out: string[] = []
    let curr = this.root
    for (let i = 0; i < partial.length; i++) {
      const char = partial[i].toLowerCase()
      let child = curr.children.get(char)
      if (!child) return out
      curr = child
    }

    this.getWords(curr, out)
    return out
  }

  private getWords(curr: TrieNode, out: string[]): void {
    if (curr.isEnd) out.push(curr.word)

    for (let child of curr.children.values()) {
      this.getWords(child, out)
    }
  }

  private createNode(char: string): TrieNode {
    return { children: new Map(), word: char, isEnd: false }
  }
}
