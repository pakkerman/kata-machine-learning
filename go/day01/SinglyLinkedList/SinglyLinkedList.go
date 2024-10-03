package singly_linked_list

import (
	"errors"
	"fmt"
)

type Node[T comparable] struct {
	next  *Node[T]
	value T
}

type SinglyLinkedList[T comparable] struct {
	head   *Node[T]
	tail   *Node[T]
	length int
}

func MakeSinglyLinkedList[T comparable]() *SinglyLinkedList[T] {
	return &SinglyLinkedList[T]{
		head:   nil,
		tail:   nil,
		length: 0,
	}
}

func (s *SinglyLinkedList[T]) Prepend(item T) error {
	node := &Node[T]{
		next:  nil,
		value: item,
	}

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

func (s *SinglyLinkedList[T]) Append(item T) error {
	node := &Node[T]{
		next:  nil,
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

func (s *SinglyLinkedList[T]) InsertAt(item T, idx int) error {
	if idx == 0 {
		return s.Prepend(item)
	}
	if idx == s.length {
		return s.Append(item)
	}

	node := &Node[T]{
		next:  nil,
		value: item,
	}

	s.length++

	curr := s.GetNode(idx)
	if curr == nil {
		return errors.New("idx out of bounds")
	}

	node.next = curr.next
	curr.next = node

	node.value = curr.value
	curr.value = item
	return nil
}

func (s *SinglyLinkedList[T]) Remove(item T) (T, error) {
	curr := s.head
	for i := 0; i < s.length; i++ {
		if curr.value == item {
			return s.RemoveAt(i)
		}
		curr = curr.next

	}

	var z T
	return z, errors.New("item not found in the list")
}

func (s *SinglyLinkedList[T]) RemoveAt(idx int) (T, error) {
	var curr *Node[T]
	var out T
	curr = s.GetNode(idx)
	if curr == nil {
		return out, errors.New("idx out of bounds")
	}

	out = curr.value

	s.length--
	if s.length == 0 {
		s.head = nil
		s.tail = nil
		return out, nil
	}

	if curr == s.head {
		s.head = s.head.next
	} else if curr == s.tail {
		s.tail = s.GetNode(idx - 1)
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

func (s *SinglyLinkedList[T]) Get(idx int) (T, error) {
	var out T
	if idx < 0 || s.length <= idx {
		return out, errors.New("idx out of bounds")
	}

	out = s.GetNode(idx).value
	return out, nil
}

func (s *SinglyLinkedList[T]) GetNode(idx int) *Node[T] {
	curr := s.head
	for i := 0; i < idx; i++ {
		curr = curr.next
	}

	return curr
}

func (s *SinglyLinkedList[T]) Print() {
	curr := s.head
	var out []T
	for i := 0; i < s.length; i++ {
		if curr == nil {
			fmt.Println(out)
			return
		}
		out = append(out, curr.value)
		curr = curr.next

	}
	fmt.Println(out)
}
