package queue

type Node[T comparable] struct {
	next  *Node[T]
	value T
}

type Queue[T comparable] struct {
	head   *Node[T]
	tail   *Node[T]
	length int
}

func MakeQueue[T comparable]() *Queue[T] {
	return &Queue[T]{
		length: 0,
	}
}

func (q *Queue[T]) Enque(item T) error {
	node := &Node[T]{
		value: item,
	}

	q.length++
	if q.tail == nil {
		q.head = node
		q.tail = node
		return nil
	}

	q.tail.next = node
	q.tail = node

	return nil
}

func (q *Queue[T]) Deque() (T, error) {
	var out T
	if q.head == nil {
		return out, nil
	}

	out = q.head.value
	q.length--
	if q.length == 0 {
		q.head = nil
		q.tail = nil
		return out, nil
	}

	q.head = q.head.next
	return out, nil
}

func (q *Queue[T]) Peek() T {
	out := q.head.value
	return out
}
