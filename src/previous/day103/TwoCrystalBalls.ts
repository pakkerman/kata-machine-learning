export default function two_crystal_balls(breaks: boolean[]): number {
  let i = 0
  let j = Math.floor(Math.sqrt(breaks.length))
  for (; i < breaks.length; i += j) {
    if (breaks[i]) break
  }
  for (i -= j; i < breaks.length; i++) {
    if (breaks[i]) return i
  }
  return -1
}

