class TrieNode {
  public word?: string
  public children: Map<string, TrieNode>
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
    for (let i = 0; i < item.length; i++) {
      const char = item[i]
      if (!curr.children.has(char)) curr.children.set(char, new TrieNode())
      curr = curr.children.get(char)!
    }

    curr.word = item
  }
  find(partial: string): string[] {
    let curr = this.root
    for (let i = 0; i < partial.length; i++) {
      const char = partial[i]
      if (!curr.children.has(char)) return []
      curr = curr.children.get(char)!
    }

    const out: string[] = []
    collect(curr)
    return out

    function collect(curr: TrieNode): void {
      if (curr.word) out.push(curr.word)
      for (let child of curr.children.values()) {
        collect(child)
      }
    }
  }

  delete(item: string): void {
    recurse(this.root)

    function recurse(curr: TrieNode, idx: number = 0): boolean {
      if (idx === item.length) {
        if (curr.word) delete curr.word
        return !curr.children.size
      }

      const char = item[idx]
      const child = curr.children.get(char)
      if (!child || !recurse(child, idx + 1)) return false

      curr.children.delete(char)

      return !curr.children.size
    }
  }
}
