import { forEachChild } from "typescript"

type TrieNode = {
  word?: string
  children: { [key: string]: TrieNode }
}

export default class Trie {
  private root: TrieNode
  constructor() {
    this.root = { children: {} }
  }

  insert(item: string): void {
    let curr = this.root
    for (let i = 0; i < item.length; i++) {
      const char = item[i]
      if (!curr.children[char]) curr.children[char] = { children: {} }
      curr = curr.children[char]
    }

    curr.word = item
  }
  delete(item: string): void {
    if (item.length === 0) return
    this.deleteWord(this.root, item)
  }

  private deleteWord(curr: TrieNode, word: string, idx: number = 0): boolean {
    if (word.length === idx) {
      console.log("when idx === word.length", curr)
      if (word === curr.word) delete curr.word
      return Object.keys(curr.children).length === 0
    }

    const char = word[idx]
    if (!curr.children[char]) return false
    if (!this.deleteWord(curr.children[char], word, idx + 1)) return false

    delete curr.children[char]

    return Object.keys(curr).length === 0
  }
  find(partial: string): string[] {
    let curr = this.root
    for (let i = 0; i < partial.length; i++) {
      const char = partial[i]
      if (!curr.children[char]) return []
      curr = curr.children[char]
    }

    const out: string[] = []
    this.getWords(curr, out)
    console.log(out)
    return out
  }

  private getWords(curr: TrieNode, out: string[]): void {
    if (curr.word) out.push(curr.word)

    for (let key of Object.keys(curr.children)) {
      this.getWords(curr.children[key], out)
    }
  }
}
