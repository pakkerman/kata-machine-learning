package doubly_linked_list

type Node[T comparable] struct{}

type DoublyLinkedList[T comparable] struct{}

func MakeDoublyLinkedList[T comparable]() *DoublyLinkedList[T] {
}

func (d *DoublyLinkedList[T]) Prepend(item T) error {
}

func (d *DoublyLinkedList[T]) Append(item T) error {
}

func (d *DoublyLinkedList[T]) InsertAt(item T, idx int) error {
}

func (d *DoublyLinkedList[T]) RemoveAt(idx int) (T, error) {
}

func (d *DoublyLinkedList[T]) Remove(item T) (T, error) {
}

func (d *DoublyLinkedList[T]) GetNode(idx int) (*Node[T], error) {
}

func (d *DoublyLinkedList[T]) Get(idx int) (T, error) {
}

func (d *DoublyLinkedList[T]) Print() {
}
