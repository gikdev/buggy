export function truncate(str: string, max: number) {
  if (str.length <= max) return str

  return str.slice(0, max - 3) + "..."
}
