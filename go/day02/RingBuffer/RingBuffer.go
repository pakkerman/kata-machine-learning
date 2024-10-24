package ring_buffer

import (
	"errors"
	"fmt"
)

type RingBuffer[T any] struct {
	length   int
	capacity int
	read     int
	write    int
	data     []T
}

func MakeRingBuffer[T any](capacity int) *RingBuffer[T] {
	if capacity < 3 {
		fmt.Println("capacity too small, set to 3")
		capacity = 3
	}

	return &RingBuffer[T]{
		length:   0,
		capacity: capacity,
		write:    0,
		read:     0,
		data:     make([]T, capacity),
	}
}

func (r *RingBuffer[T]) Push(item T) {
	r.data[r.write] = item

	if r.length < r.capacity {
		r.length++
	}

	if r.write == r.read {
		r.read = (r.read + 1) % r.capacity
	}

	r.write = (r.write + 1) % r.capacity
}

func (r *RingBuffer[T]) Pop() (T, error) {
	var out T
	if r.length == 0 {
		return out, errors.New("empty buffer")
	}

	var z T
	out = r.data[r.read]
	r.data[r.read] = z

	r.length--
	if r.length == 0 {
		r.read = 0
		r.write = 0
		return out, nil
	}

	r.read = (r.read + 1) % r.capacity
	return out, nil
}

func (r *RingBuffer[T]) Get(idx int) (T, error) {
	if idx < 0 || r.length <= idx {
		var z T
		return z, errors.New("out of bounds")
	}

	return r.data[idx], nil
}
