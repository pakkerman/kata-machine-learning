package lru

import "errors"

type Node[V comparable] struct {
	next  *Node[V]
	prev  *Node[V]
	value V
}

type LRU[K comparable, V comparable] struct {
	head     *Node[V]
	tail     *Node[V]
	capacity int
	length   int
	nodes    map[K]*Node[V]
	keys     map[*Node[V]]K
}

func MakeLRU[K comparable, V comparable](capacity int) (*LRU[K, V], error) {
	if capacity < 5 || 1000 <= capacity {
		return nil, errors.New("invalid idx, range 5 ~ 1000")
	}

	return &LRU[K, V]{
		head:     nil,
		tail:     nil,
		capacity: capacity,
		length:   0,
		nodes:    make(map[K]*Node[V]),
		keys:     make(map[*Node[V]]K),
	}, nil
}

func (l *LRU[K, V]) Update(key K, value V) error {
	node := l.nodes[key]
	if node == nil {
		node = &Node[V]{
			value: value,
		}
		l.prepend(node)

		l.length++
		l.trim()

		l.nodes[key] = node
		l.keys[node] = key

	} else {
		node.value = value
		l.detach(node)
		l.prepend(node)
	}

	return nil
}

func (l *LRU[K, V]) Get(key K) V {
	node := l.nodes[key]
	if node == nil {
		var z V
		return z
	}

	l.detach(node)
	l.prepend(node)

	return node.value
}

func (l *LRU[K, V]) detach(node *Node[V]) {
	if node == l.head {
		l.head = l.head.next
	}
	if node == l.tail {
		l.tail = l.tail.prev
	}

	if node.next != nil {
		node.next.prev = node.prev
	}

	if node.prev != nil {
		node.prev.next = node.next
	}
}

func (l *LRU[K, V]) prepend(node *Node[V]) {
	if l.head == nil {
		l.head = node
		l.tail = node
		return
	}

	node.next = l.head
	l.head.prev = node
	l.head = node
}

func (l *LRU[K, V]) trim() error {
	if l.length <= l.capacity {
		return nil
	}

	if l.tail == nil {
		return errors.New("tail is nil")
	}

	tail := l.tail
	key := l.keys[tail]

	delete(l.nodes, key)
	delete(l.keys, tail)

	l.detach(tail)
	l.length--

	return nil
}
