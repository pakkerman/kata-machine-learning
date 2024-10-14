package two_crystal_ball

import "math"

func TwoCrystallBall(input []bool) int {
	j := int(math.Sqrt(float64(len(input))))
	i := 0
	for ; i < len(input); i += j {
		if input[i] {
			break
		}
	}

	i -= j
	for ; i < len(input); i++ {
		if input[i] {
			return i
		}
	}

	return -1
}
