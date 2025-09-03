export default function solve(
  maze: string[],
  wall: string,
  start: Point,
  end: Point
): Point[] {
  const path: Point[] = []
  const seen: boolean[][] = Array.from({ length: maze.length }, () =>
    new Array(maze[0].length).fill(false)
  )

  recurse(start)
  return path

  function recurse(curr: Point): boolean {
    const { x, y } = curr
    if (y < 0 || maze.length <= y) return false
    if (x < 0 || maze[y].length <= x) return false
    if (seen[y][x]) return false
    if (maze[y][x] === wall) return false

    seen[y][x] = true
    path.push(curr)
    if (y === end.y && x === end.x) return true

    for (const [xoff, yoff] of [
      [0, 1],
      [0, -1],
      [-1, 0],
      [1, 0],
    ]) {
      if (recurse({ x: x + xoff, y: y + yoff })) return true
    }

    path.pop()
    return false
  }
}

