package doubly_linked_list

import (
	"fmt"
	"reflect"
	"testing"
)

func TestSinglyLinkedList(t *testing.T) {
	t.Run("testing making singly linked list", func(t *testing.T) {
		s := MakeDoublyLinkedList[int]()
		fmt.Println(reflect.TypeOf(s))
	})

	t.Run("testing Prepend()", func(t *testing.T) {
		s := MakeDoublyLinkedList[int]()
		s.Prepend(1)
		s.Prepend(2)
		s.Prepend(3)
		if s.length != 3 {
			t.Errorf("list length mismatched")
		}

		for i, expectedResult := range []int{3, 2, 1} {
			val, err := s.Get(i)
			if err != nil {
				t.Error(err)
			}
			if val != expectedResult {
				t.Errorf("expected: %v\nActual: %v", expectedResult, val)
			}
		}
	})

	t.Run("testing Append()", func(t *testing.T) {
		s := MakeDoublyLinkedList[int]()
		s.Append(1)
		s.Append(2)
		s.Append(3)
		if s.length != 3 {
			t.Errorf("list length mismatched")
		}

		for i, expectedResult := range []int{1, 2, 3} {
			val, err := s.Get(i)
			if err != nil {
				t.Error(err)
			}
			if val != expectedResult {
				t.Errorf("expected: %v\nActual: %v\n", expectedResult, val)
			}
		}
	})

	t.Run("testing InsertAt()", func(t *testing.T) {
		s := MakeDoublyLinkedList[int]()
		s.InsertAt(1, 0)
		s.InsertAt(2, 1)
		s.InsertAt(3, 2)
		s.InsertAt(8008, 1)
		s.InsertAt(531, 1)
		//
		for i, expectedResult := range []int{1, 531, 8008, 2, 3} {

			val, err := s.Get(i)
			if err != nil {
				t.Error(err)
			}
			if val != expectedResult {
				t.Errorf("\nExpected: %v\nActual: %v\n", expectedResult, val)
			}
		}
	})

	t.Run("testing Remove()", func(t *testing.T) {
		s := MakeDoublyLinkedList[int]()
		s.Append(1)
		s.Append(2)
		s.Append(3)
		s.InsertAt(420, 2)
		s.Prepend(50)
		s.Prepend(20)

		s.Remove(420)
		if s.length != 5 {
			t.Errorf("list length mismatched")
		}
		s.Remove(50)
		if s.length != 4 {
			t.Errorf("list length mismatched")
		}
		s.Remove(20)
		if s.length != 3 {
			t.Errorf("list length mismatched")
		}

		for i, expectedResult := range []int{1, 2, 3} {

			val, err := s.Get(i)
			if err != nil {
				t.Error(err)
			}
			if val != expectedResult {
				t.Errorf("\nExpected: %v\nActual: %v\n", expectedResult, val)
			}
		}
	})

	t.Run("testing RemoveAt()", func(t *testing.T) {
		s := MakeDoublyLinkedList[int]()
		s.Append(1)
		s.Append(2)
		s.Append(3)
		s.InsertAt(420, 2)
		s.Prepend(50)
		s.Prepend(20)

		s.RemoveAt(0)
		if s.length != 5 {
			t.Errorf("list length mismatched")
		}
		s.RemoveAt(0)
		if s.length != 4 {
			t.Errorf("list length mismatched")
		}
		s.RemoveAt(2)
		if s.length != 3 {
			t.Errorf("list length mismatched")
		}

		for i, expectedResult := range []int{1, 2, 3} {

			val, err := s.Get(i)
			if err != nil {
				t.Error(err)
			}
			if val != expectedResult {
				t.Errorf("\nExpected: %v\nActual: %v\n", expectedResult, val)
			}
		}
	})

	t.Run("testing Get()", func(t *testing.T) {
		s := MakeDoublyLinkedList[int]()
		s.Append(1)
		s.Append(2)
		s.Append(3)

		for i, expectedResult := range []int{1, 2, 3} {
			val, err := s.Get(i)
			if err != nil {
				t.Error(err)
			}
			if val != expectedResult {
				t.Errorf("\nExpected: %v\nActual: %v\n", expectedResult, val)
			}
		}
	})
}
