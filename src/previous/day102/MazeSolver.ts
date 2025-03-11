const dir = [
  [0, 1],
  [0, -1],
  [-1, 0],
  [1, 0],
]

export default function solve(
  maze: string[],
  wall: string,
  start: Point,
  end: Point
): Point[] {
  const path: Point[] = []
  const seen: boolean[][] = Array.from({ length: maze.length }, () =>
    new Array().fill(false)
  )
  recurse(start)
  return path

  function recurse(curr: Point): boolean {
    const { x, y } = curr
    if (y < 0 || maze.length <= y) return false
    if (x < 0 || maze[y].length <= y) return false
    if (maze[y][x] === wall) return false
    if (seen[y][x]) return false

    path.push(curr)
    seen[y][x] = true
    if (end.y === y && end.x === x) return true

    for (let i = 0; i < dir.length; i++) {
      const [xoffset, yoffset] = dir[i]
      if (recurse({ x: x + xoffset, y: y + yoffset })) return true
    }

    path.pop()
    return false
  }
}

