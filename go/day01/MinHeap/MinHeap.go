package minheap

import (
	"errors"
)

type MinHeap struct {
	heap []int
}

func MakeMinHeap() *MinHeap {
	return &MinHeap{
		heap: make([]int, 0),
	}
}

func (h *MinHeap) Insert(item int) {
	h.heap = append(h.heap, item)
	h.heapifyUp(len(h.heap) - 1)
}

func (h *MinHeap) Delete() int {
	if len(h.heap) == 0 {
		return -1
	}

	out := h.heap[0]
	h.heap[0] = h.heap[len(h.heap)-1]
	h.heap = h.heap[:len(h.heap)-1]
	h.heapifyDown(0)

	return out
}

func (h *MinHeap) heapifyUp(idx int) {
	var recurse func(idx int)
	recurse = func(idx int) {
		if idx == 0 {
			return
		}

		childVal := h.heap[idx]
		parentIdx, parentVal, err := h.parent(idx)
		if err != nil {
			return
		}

		if childVal >= parentVal {
			return
		}

		h.heap[idx] = parentVal
		h.heap[parentIdx] = childVal
		recurse(parentIdx)
	}

	recurse(idx)
}

func (h *MinHeap) heapifyDown(idx int) {
	var recurse func(idx int)
	recurse = func(idx int) {
		if len(h.heap) <= idx {
			return
		}
		leftIdx, leftVal, err := h.left(idx)
		if err != nil {
			return
		}
		rightIdx, rightVal, err := h.right(idx)
		if err != nil {
			return
		}
		parentVal := h.heap[idx]

		if parentVal <= leftVal && parentVal <= rightVal {
			return
		}

		if leftVal < rightVal {
			h.heap[idx] = leftVal
			h.heap[leftIdx] = parentVal
			recurse(leftIdx)
		} else if rightVal < leftVal {
			h.heap[idx] = rightVal
			h.heap[rightIdx] = parentVal
			recurse(rightIdx)
		}
	}

	recurse(idx)
}

func (h *MinHeap) Size() int {
	return len(h.heap)
}

func (h *MinHeap) parent(idx int) (parentIdx, parentVal int, err error) {
	i := (idx - 1) / 2
	if i < 0 {
		return -1, -1, errors.New("left idx out of bounds")
	}
	return i, h.heap[i], err
}

func (h *MinHeap) left(idx int) (leftIdx, leftVal int, err error) {
	i := (idx * 2) + 1
	if len(h.heap) <= i {
		return -1, -1, errors.New("left idx out of bounds")
	}

	return i, h.heap[i], nil
}

func (h *MinHeap) right(idx int) (rightIdx, rightVal int, err error) {
	i := (idx * 2) + 2
	if len(h.heap) <= i {
		return -1, -1, errors.New("left idx out of bounds")
	}
	return i, h.heap[i], nil
}
