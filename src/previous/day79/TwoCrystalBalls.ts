export default function two_crystal_balls(breaks: boolean[]): number {
  const len = breaks.length
  const j = Math.floor(Math.sqrt(len))
  let i = j

  for (; i < len; i += j) if (breaks[i]) break
  i -= j
  for (; i < len; i++) if (breaks[i]) return i
  return -1
}

15 +
  20 +
  8 +
  8 +
  3 +
  3 +
  5 +
  6 +
  2 +
  2 +
  6 +
  3 +
  2 +
  5 +
  3 +
  1 +
  10 +
  7 +
  20 +
  8 +
  10 +
  10 +
  1
