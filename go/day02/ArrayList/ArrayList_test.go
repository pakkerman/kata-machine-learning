package array_list

import (
	"testing"
)

// Test the Append method
func TestArrayList_Append(t *testing.T) {
	expected := []int{4, 2, 0, 69}
	list := MakeArrayList[int](3)

	for i, v := range []int{4, 2, 0, 69} {
		err := list.Append(v)
		if err != nil {
			t.Fatalf("expected no error, got %v", err)
		}

		if list.length != i+1 {
			t.Errorf("expected length %d, got %d", i+1, list.length)
		}

		value, _ := list.Get(i)
		if value != v {
			t.Errorf("expected %d at index %d, got %d", v, i, value)
		}
	}

	for idx, val := range expected {
		if val != list.data[idx] {
			t.Errorf("array mismatched with expected array")
		}
	}
}

func TestArrayList_Prepend(t *testing.T) {
	expected := []int{4, 2, 0, 69}
	list := MakeArrayList[int](3)

	for i, v := range []int{69, 0, 2, 4} {
		err := list.Prepend(v)
		if err != nil {
			t.Fatalf("expected no error, got %v", err)
		}

		if list.length != i+1 {
			t.Errorf("expected length %d, got %d", i+1, list.length)
		}

		value, _ := list.Get(0)
		if value != v {
			t.Errorf("expected %d at index 0, got %d", v, value)
		}
	}

	for idx, val := range expected {
		if val != list.data[idx] {
			t.Errorf("array mismatched with expected array")
		}
	}
}

func TestArrayList_InsertAt(t *testing.T) {
	expected := []int{335, 4, 2, 0, 531, 8008, 69}
	list := MakeArrayList[int](3)
	for _, v := range []int{4, 2, 0} {
		list.Append(v)
	}

	// fmt.Println("before:", list.data)

	list.InsertAt(69, 3)
	list.InsertAt(335, 0)
	list.InsertAt(531, 4)
	list.InsertAt(8008, 5)

	// fmt.Println("after:", list.data)

	for idx, val := range expected {
		if val != list.data[idx] {
			t.Errorf("array mismatched with expected array")
		}
	}
}

func TestArrayList_RemoveAt(t *testing.T) {
	expected := []int{4, 2, 0}
	list := MakeArrayList[int](3)
	for _, v := range []int{335, 4, 2, 0, 531, 8008, 69} {
		list.Append(v)
	}

	// fmt.Println("before:", list.data)

	list.RemoveAt(0)
	if list.length != 6 {
		t.Errorf("expected length 6, got %d", list.length)
	}
	list.RemoveAt(5)
	if list.length != 5 {
		t.Errorf("expected length 5, got %d", list.length)
	}
	list.RemoveAt(3)
	if list.length != 4 {
		t.Errorf("expected length 4, got %d", list.length)
	}
	list.RemoveAt(3)
	if list.length != 3 {
		t.Errorf("expected length 3, got %d", list.length)
	}

	// fmt.Println("after:", list.data)

	for idx, val := range expected {
		if val != list.data[idx] {
			t.Errorf("array mismatched with expected array")
		}
	}
}
