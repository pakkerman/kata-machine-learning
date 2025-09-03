export default function two_crystal_balls(breaks: boolean[]): number {
  const j = Math.floor(Math.sqrt(breaks.length))
  let i = 0

  for (; i < breaks.length; i += j) {
    if (breaks[i]) break
  }
  for (i -= j; i < breaks.length; i++) {
    if (breaks[i]) return i
  }

  return -1
}

