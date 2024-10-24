package maze_solver

import (
	"fmt"
	"strings"
	"testing"
)

var maze = []string{
	"xxxxxxxxxx x",
	"x        x x",
	"x        x x",
	"x xxxxxxxx x",
	"x          x",
	"x xxxxxxxxxx",
}

var mazeResult = []Point{
	{x: 10, y: 0},
	{x: 10, y: 1},
	{x: 10, y: 2},
	{x: 10, y: 3},
	{x: 10, y: 4},
	{x: 9, y: 4},
	{x: 8, y: 4},
	{x: 7, y: 4},
	{x: 6, y: 4},
	{x: 5, y: 4},
	{x: 4, y: 4},
	{x: 3, y: 4},
	{x: 2, y: 4},
	{x: 1, y: 4},
	{x: 1, y: 5},
}

func TestMazeSolver(t *testing.T) {
	t.Run("maze solver", func(t *testing.T) {
		input := getInput()
		fmt.Println(input)

		result := MazeSolver(input, Point{x: 10, y: 0}, Point{x: 1, y: 5}, "x")
		fmt.Println(result)
	})
}

func getInput() [][]string {
	input := make([][]string, len(maze))

	for i := 0; i < len(maze); i++ {
		input[i] = make([]string, len(maze[i]))
		for k, char := range strings.Split(maze[i], "") {
			input[i][k] = char
		}

	}
	return input
}
