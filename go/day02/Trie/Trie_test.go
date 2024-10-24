package trie

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestTrie(t *testing.T) {
	t.Run("testing Insert()", func(t *testing.T) {
		trie := MakeTrie()
		for _, item := range []string{"george", "Gee", "fredrick", "Mance", "mikki", "Mikko"} {
			trie.Insert(item)
		}

		if ok := assert.ElementsMatch(t, trie.Find("mi"), []string{"mikki", `Mikko`}); !ok {
			t.Errorf("Find \"mi\" failed.")
		}

		if ok := assert.ElementsMatch(t, trie.Find("M"), []string{"Mance", "mikki", "Mikko"}); !ok {
			t.Errorf("Find \"M\" failed.")
		}

		trie.Delete("gee")
		trie.Delete("george")
		trie.Delete("Mance")

		if ok := assert.ElementsMatch(t, trie.Find("M"), []string{"mikki", "Mikko"}); !ok {
			t.Errorf("Find \"M\" failed.")
		}

		if ok := assert.ElementsMatch(t, trie.Find("g"), []string{}); !ok {
			t.Errorf("Find \"g\" failed.")
		}
	})
}
