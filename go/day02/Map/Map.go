package basic_map

import (
	"fmt"
)

type Map[K, V comparable] struct {
	length   int
	capacity int
	store    []Bucket[K, V]
}

type Item[K, V comparable] struct {
	key   K
	value V
}

type Bucket[K, V comparable] []Item[K, V]

func MakeMap[K, V comparable]() *Map[K, V] {
	store := make([]Bucket[K, V], 3)

	return &Map[K, V]{
		length:   0,
		capacity: 3,
		store:    store,
	}
}

func (m *Map[K, V]) Get(key K) V {
	hash := m.hash(key)
	bucket := m.store[hash]

	return bucket[0].value
}

func (m *Map[K, V]) Set(key K, value V) {
	hash := m.hash(key)
	bucket := m.store[hash]

	for i, item := range bucket {
		if item.key == key {
			bucket[i].value = value
			return
		}
	}

	m.store[hash] = append(bucket, Item[K, V]{key, value})

	m.length++
	m.resize()
}

func (m *Map[K, V]) Delete(key K) V {
	if m.length == 0 {
		var z V
		return z
	}

	hash := m.hash(key)
	bucket := m.store[hash]

	for _, item := range bucket {
		if item.key == key {
			m.length--
			m.store[hash] = m.store[hash][:0]
			return item.value
		}
	}

	var z V
	return z
}

func (m *Map[K, V]) Size() int {
	return m.length
}

func (m *Map[K, V]) resize() {
	if m.length <= m.capacity {
		return
	}

	store := m.store
	m.capacity *= 2
	m.store = make([]Bucket[K, V], m.capacity)

	for _, bucket := range store {
		for _, item := range bucket {
			hash := m.hash(item.key)
			m.store[hash] = append(m.store[hash], item)

		}
	}
}

func (m *Map[K, V]) hash(key K) int {
	keyStr := fmt.Sprintf("%v", key)
	acc := 37

	for _, char := range keyStr {
		acc += int(char) + 7
	}

	return acc % m.capacity
}
