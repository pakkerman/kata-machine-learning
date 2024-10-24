package two_crystal_ball

import (
	"math/rand"
	"testing"
)

func TestTwoCrystalBall(t *testing.T) {
	t.Run("testing two crystall ball", func(t *testing.T) {
		input, expected := getInput()
		result := TwoCrystallBall(input)
		if result != expected {
			t.Errorf("\nexpected: %v\nactual: %v", expected, result)
		}
	})
}

func getInput() ([]bool, int) {
	size := 10000
	num := rand.Int() % size
	breaks := make([]bool, size)

	for i := num; i < len(breaks); i++ {
		breaks[i] = true
	}

	return breaks, num
}
