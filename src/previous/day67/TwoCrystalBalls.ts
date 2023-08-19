export default function two_crystal_balls(breaks: boolean[]): number {
  const j = Math.floor(Math.sqrt(breaks.length))
  let i = j

  for (let i = 0; i < breaks.length; i += j) if (breaks[i]) break
  i -= j
  for (let i = 0; i < breaks.length; i++) if (breaks[i]) return i
  return -1
}

8 +
  5 +
  7 +
  3 +
  5 +
  2 +
  3 +
  3 +
  1 +
  1 +
  1 +
  1 +
  1 +
  3 +
  2 +
  2 +
  28 +
  5 +
  14 +
  8 +
  17 +
  6 +
  2
