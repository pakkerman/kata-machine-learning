package stack

type Node[T comparable] struct {
	prev  *Node[T]
	value T
}

type Stack[T comparable] struct {
	head   *Node[T]
	tail   *Node[T]
	length int
}

func MakeStack[T comparable]() *Stack[T] {
	return &Stack[T]{
		length: 0,
	}
}

func (s *Stack[T]) Push(item T) {
	node := &Node[T]{
		value: item,
	}
	s.length++

	if s.tail == nil {
		s.head = node
		s.tail = node
	}

	node.prev = s.tail
	s.tail = node
}

func (s *Stack[T]) Pop() T {
	var out T
	if s.tail == nil {
		return out
	}

	out = s.tail.value
	s.length--
	if s.length == 0 {
		s.head = nil
		s.tail = nil
		return out
	}

	s.tail = s.tail.prev
	return out
}

func (s *Stack[T]) Peek() T {
	var out T
	if s.head == nil {
		return out
	}

	out = s.head.value
	return out
}
