package doubly_linked_list

import (
	"errors"
	"fmt"
)

type Node[T comparable] struct {
	prev  *Node[T]
	next  *Node[T]
	value T
}

type DoublyLinkedList[T comparable] struct {
	head   *Node[T]
	tail   *Node[T]
	length int
}

func MakeDoublyLinkedList[T comparable]() *DoublyLinkedList[T] {
	return &DoublyLinkedList[T]{
		head:   nil,
		tail:   nil,
		length: 0,
	}
}

func (d *DoublyLinkedList[T]) Prepend(item T) error {
	node := &Node[T]{
		value: item,
	}

	d.length++
	if d.head == nil {
		d.head = node
		d.tail = node
		return nil
	}

	node.next = d.head
	d.head.prev = node
	d.head = node
	return nil
}

func (d *DoublyLinkedList[T]) Append(item T) error {
	node := &Node[T]{
		value: item,
	}

	d.length++
	if d.tail == nil {
		d.head = node
		d.tail = node
		return nil
	}

	node.prev = d.tail
	d.tail.next = node
	d.tail = node
	return nil
}

func (d *DoublyLinkedList[T]) InsertAt(item T, idx int) error {
	if idx == 0 {
		return d.Prepend(item)
	}

	if idx == d.length {
		return d.Append(item)
	}

	curr, err := d.GetNode(idx)
	if err != nil {
		return err
	}

	d.length++
	node := &Node[T]{
		value: item,
	}

	node.next = curr
	node.prev = curr.prev
	if curr.prev != nil {
		curr.prev.next = node
	}
	curr.prev = node

	return nil
}

func (d *DoublyLinkedList[T]) RemoveAt(idx int) (T, error) {
	curr, err := d.GetNode(idx)
	if err != nil {
		return curr.value, err
	}

	out := curr.value
	d.length--
	if d.length == 0 {
		d.head = nil
		d.tail = nil
		return out, nil
	}

	if curr == d.head {
		d.head = d.head.next
	} else if curr == d.tail {
		d.tail = d.tail.prev
	}

	if curr.next != nil {
		curr.next.prev = curr.prev
	}
	if curr.prev != nil {
		curr.prev.next = curr.next
	}

	return out, nil
}

func (d *DoublyLinkedList[T]) Remove(item T) (T, error) {
	curr := d.head
	for i := 0; i < d.length; i++ {
		if curr.value == item {
			return d.RemoveAt(i)
		}
		curr = curr.next
	}

	var z T
	return z, errors.New("idx out of bounds")
}

func (d *DoublyLinkedList[T]) GetNode(idx int) (*Node[T], error) {
	curr := d.head
	for i := 0; i < idx; i++ {
		if curr == nil {
			return nil, errors.New("idx out of bounds")
		}
		curr = curr.next
	}
	return curr, nil
}

func (d *DoublyLinkedList[T]) Get(idx int) (T, error) {
	node, err := d.GetNode(idx)
	return node.value, err
}

func (d *DoublyLinkedList[T]) Print() {
	curr := d.head
	var out []T
	for i := 0; i < d.length; i++ {
		if curr == nil {
			fmt.Println(out)
			return
		}
		out = append(out, curr.value)
		curr = curr.next

	}
	fmt.Println(out)
}
