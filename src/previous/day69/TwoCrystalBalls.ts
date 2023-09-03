export default function two_crystal_balls(breaks: boolean[]): number {
  const len = breaks.length
  const j = Math.floor(Math.sqrt(breaks.length))
  let i = j
  for (; i < len; i += j) if (breaks[i]) break
  i -= j
  for (; i < len; i++) if (breaks[i]) return i
  return -1
}

10 +
  4 +
  8 +
  5 +
  3 +
  2 +
  4 +
  5 +
  2 +
  1 +
  2 +
  2 +
  1 +
  3 +
  4 +
  2 +
  19 +
  7 +
  11 +
  6 +
  13 +
  3 +
  1
