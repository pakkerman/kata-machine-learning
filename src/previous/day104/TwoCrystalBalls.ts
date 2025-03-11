export default function two_crystal_balls(breaks: boolean[]): number {
  let len = breaks.length
  let j = Math.sqrt(breaks.length)
  let i = 0

  for (; i < len; i += j) if (breaks[i]) break
  for (i = i - j; i < len; i++) if (breaks[i]) return i
  return -1
}

