package array_list

import (
	"errors"
	"fmt"
)

type ArrayList[T any] struct {
	length   int
	capacity int
	data     []T
}

func MakeArrayList[T any](capacity int) *ArrayList[T] {
	if capacity <= 0 {
		fmt.Printf("invalid capacity %v, capacity set to 3.\n", capacity)
		capacity = 3
	}

	return &ArrayList[T]{
		length:   0,
		capacity: capacity,
		data:     make([]T, capacity),
	}
}

func (a *ArrayList[T]) Prepend(item T) error {
	a.length++
	err := a.resize()
	if err != nil {
		return err
	}

	for i := a.length - 1; i > 0; i-- {
		a.data[i] = a.data[i-1]
	}

	a.data[0] = item

	return nil
}

func (a *ArrayList[T]) Append(item T) error {
	a.length++
	err := a.resize()
	if err != nil {
		return err
	}

	a.data[a.length-1] = item
	return nil
}

func (a *ArrayList[T]) InsertAt(item T, idx int) error {
	// fmt.Printf("inserting %v at %v\n", item, idx)
	// fmt.Println(a.length)
	if idx == 0 {
		return a.Prepend(item)
	}
	if idx == a.length {
		return a.Append(item)
	}

	if idx < 0 || a.length <= idx {
		return errors.New("idx out of bounds")
	}

	a.length++
	err := a.resize()
	if err != nil {
		return err
	}

	for i := a.length - 1; i > idx; i-- {
		a.data[i] = a.data[i-1]
	}

	a.data[idx] = item
	return nil
}

func (a *ArrayList[T]) Get(idx int) (T, error) {
	if idx < 0 || a.length <= idx {
		var zero T
		return zero, fmt.Errorf("idx out of bounds")
	}

	return a.data[idx], nil
}

func (a *ArrayList[T]) RemoveAt(idx int) (T, error) {
	if idx < 0 || a.length <= idx {
		var zero T
		return zero, fmt.Errorf("idx out of bound")
	}

	out := a.data[idx]
	for i := idx; i < a.length; i++ {
		a.data[i] = a.data[i+1]
	}

	a.length--
	var zero T
	a.data[a.length] = zero

	return out, nil
}

func (a *ArrayList[T]) resize() error {
	if a.length < a.capacity {
		return nil
	}

	oldData := a.data
	a.capacity *= 2
	a.data = make([]T, a.capacity)

	copy(a.data, oldData)

	return nil
}
