package trie

import (
	"unicode"
)

type Node struct {
	children map[rune]*Node
	word     string
}

type Trie struct {
	root *Node
}

func MakeTrie() *Trie {
	root := &Node{
		children: make(map[rune]*Node),
	}
	return &Trie{
		root: root,
	}
}

func (t *Trie) Insert(word string) {
	curr := t.root

	for _, r := range word {
		char := unicode.ToLower(r)
		child, ok := curr.children[char]
		if !ok {
			curr.children[char] = &Node{
				children: make(map[rune]*Node),
			}
			child = curr.children[char]
		}

		curr = child
	}
	curr.word = word
}

func (t *Trie) Find(prefix string) []string {
	curr := t.root
	for _, r := range prefix {
		char := unicode.ToLower(r)
		child, ok := curr.children[char]
		if !ok {
			return []string{}
		}

		curr = child
	}

	var out []string
	var recurse func(curr *Node)
	recurse = func(curr *Node) {
		if curr.word != "" {
			out = append(out, curr.word)
		}
		for _, child := range curr.children {
			recurse(child)
		}
	}

	recurse(curr)
	return out
}

func (t *Trie) Delete(word string) {
	var recurse func(curr *Node, idx int) bool
	recurse = func(curr *Node, idx int) bool {
		if curr.word != "" {
			curr.word = ""
			return len(curr.children) == 0
		}

		char := unicode.ToLower(rune(word[idx]))
		child, ok := curr.children[char]
		if !ok {
			return false
		}

		if !recurse(child, idx+1) {
			return false
		}

		delete(curr.children, char)
		return len(curr.children) == 0
	}

	recurse(t.root, 0)
}
