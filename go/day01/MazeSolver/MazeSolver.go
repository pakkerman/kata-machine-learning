package maze_solver

type Point struct {
	x int
	y int
}

func MazeSolver(maze [][]string, start, end Point, wall string) []Point {
	var path []Point
	seen := make([][]bool, len(maze))

	for i := 0; i < len(maze); i++ {
		seen[i] = make([]bool, len(maze[0]))
	}

	var r func(curr Point) bool
	r = func(curr Point) bool {
		x := curr.x
		y := curr.y
		if y < 0 || len(maze) <= y {
			return false
		}

		if x < 0 || len(maze[y]) <= x {
			return false
		}

		if maze[y][x] == wall {
			return false
		}

		if seen[y][x] {
			return false
		}

		seen[y][x] = true
		path = append(path, curr)

		if end.y == y && end.x == x {
			return true
		}

		for _, dir := range [][]int{{0, 1}, {1, 0}, {0, -1}, {-1, 0}} {
			yoff := dir[0]
			xoff := dir[1]

			if r(Point{y: yoff + y, x: xoff + x}) {
				return true
			}

		}

		path = path[:len(path)-1]

		return false
	}

	r(start)
	return path
}
