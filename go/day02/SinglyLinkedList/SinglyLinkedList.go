package singly_linked_list

import (
	"errors"
	"fmt"
)

// type Node
type Node[T comparable] struct {
	value T
	next  *Node[T]
}

// type SinglyLinkedList
type SinglyLinkedList[T comparable] struct {
	head   *Node[T]
	tail   *Node[T]
	length int
}

// constuctor func
func MakeSinglyLinkedList[T comparable]() *SinglyLinkedList[T] {
	return &SinglyLinkedList[T]{
		length: 0,
		head:   nil,
		tail:   nil,
	}
}

// prepend
func (s *SinglyLinkedList[T]) Prepend(item T) error {
	node := &Node[T]{value: item}
	s.length++

	if s.head == nil {
		s.head = node
		s.tail = node
		return nil
	}

	node.next = s.head
	s.head = node
	return nil
}

// append
func (s *SinglyLinkedList[T]) Append(item T) error {
	node := &Node[T]{
		value: item,
	}

	s.length++
	if s.tail == nil {
		s.head = node
		s.tail = node
		return nil
	}

	s.tail.next = node
	s.tail = node
	return nil
}

// insertAt
func (s *SinglyLinkedList[T]) InsertAt(item T, idx int) error {
	if idx == 0 {
		return s.Prepend(item)
	}

	if idx == s.length {
		return s.Append(item)
	}

	curr, err := s.GetNode(idx)
	if err != nil {
		return err
	}

	node := &Node[T]{
		value: item,
	}
	s.length++

	node.next = curr.next
	curr.next = node

	node.value = curr.value
	curr.value = item

	return nil
}

// remove
func (s *SinglyLinkedList[T]) Remove(item T) (T, error) {
	curr := s.head
	for i := 0; i < s.length && curr != nil; i++ {
		if curr.value == item {
			return s.RemoveAt(i)
		}
		curr = curr.next
	}

	var z T
	return z, errors.New(fmt.Sprintf("there are no element %v", item))
}

// removeAt
func (s *SinglyLinkedList[T]) RemoveAt(idx int) (T, error) {
	curr, err := s.GetNode(idx)
	if err != nil {
		var z T
		return z, err
	}

	out := curr.value
	s.length--

	if s.length == 0 {
		s.head = nil
		s.tail = nil
		return out, nil
	}

	if curr == s.head {
		s.head = s.head.next
	}

	if curr == s.tail {
		prev, err := s.GetNode(idx - 1)
		if err != nil {
			var z T
			return z, err
		}
		s.tail = prev
	}

	if curr.next == s.tail {
		s.tail = curr
	}

	if curr.next != nil {
		curr.value = curr.next.value
		curr.next = curr.next.next
	}
	return out, nil
}

// get
func (s *SinglyLinkedList[T]) Get(idx int) (T, error) {
	out, err := s.GetNode(idx)
	return out.value, err
}

// getNode
func (s *SinglyLinkedList[T]) GetNode(idx int) (*Node[T], error) {
	if idx < 0 || s.length <= 0 {
		return nil, errors.New("idx out of bounds")
	}

	curr := s.head
	for i := 0; i < idx; i++ {
		curr = curr.next
	}

	return curr, nil
}

func (s *SinglyLinkedList[T]) Print() {
	curr := s.head
	var list []T
	for i := 0; i < s.length && curr != nil; i++ {
		list = append(list, curr.value)
		curr = curr.next
	}

	fmt.Println(list)
}
