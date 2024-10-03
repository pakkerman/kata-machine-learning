package ring_buffer

import (
	"errors"
	"fmt"
)

type RingBuffer[T any] struct {
	data     []T
	length   int
	capacity int
	read     int
	write    int
}

func MakeRingBuffer[T any](capacity int) *RingBuffer[T] {
	if capacity <= 0 {
		fmt.Printf("invalid capacity %v, capacity set to 3.\n", capacity)
		capacity = 3
	}
	return &RingBuffer[T]{
		length:   0,
		capacity: capacity,
		read:     0,
		write:    0,
		data:     make([]T, capacity),
	}
}

func (r *RingBuffer[T]) Push(item T) {
	r.data[r.write] = item
	if r.length < r.capacity {
		r.length++
	}

	if r.read == r.write {
		r.read = (r.read + 1) % r.capacity
	}

	r.write = (r.write + 1) % r.capacity
}

func (r *RingBuffer[T]) Pop() (T, error) {
	if r.length == 0 {
		var zero T
		return zero, errors.New("the buffer is empty")
	}

	var zero T
	out := r.data[r.read]
	r.data[r.read] = zero
	r.read = (r.read + 1) % r.capacity

	return out, nil
}

func (r *RingBuffer[T]) Get(idx int) (T, error) {
	if idx < 0 || r.length <= idx {
		var zero T
		return zero, errors.New("out of bounds")
	}
	return r.data[idx], nil
}
