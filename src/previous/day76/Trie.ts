type Node = {
  word?: string
  children: Map<string, Node>
}

export default class Trie {
  private root: Node
  constructor() {
    this.root = { children: new Map() }
  }

  insert(item: string): void {
    let curr = this.root
    for (let i = 0; i < item.length; i++) {
      const char = item[i]
      if (!curr.children.has(char)) {
        curr.children.set(char, { children: new Map() })
      }
      curr = curr.children.get(char)!
    }
    curr.word = item
  }
  delete(item: string): void {
    recurseDelete(this.root)

    function recurseDelete(curr: Node, idx: number = 0): boolean {
      if (idx === item.length) {
        if (curr.word === item) delete curr.word
        return curr.children.size === 0
      }

      const char = item[idx]
      const child = curr.children.get(char)
      if (!child) return false
      if (!recurseDelete(child, idx + 1)) return false

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
    findRecurse(curr)
    return out

    function findRecurse(curr: Node): void {
      if (curr.word) out.push(curr.word)

      for (const child of curr.children.values()) {
        findRecurse(child)
      }
    }
  }
}
