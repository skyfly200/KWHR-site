// Deterministic, cheerful avatar color per name so each DJ gets a stable,
// distinct hue without needing a photo.
const palette = [
  '#1cb277', '#ff8c42', '#38bdf8', '#a855f7', '#f43f5e',
  '#eab308', '#14b8a6', '#f97316', '#6366f1', '#ec4899',
  '#22c55e', '#0ea5e9',
]

export function avatarColor(name: string): string {
  let h = 0
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0
  return palette[h % palette.length]
}

export function initials(name: string): string {
  const parts = name.replace(/[^a-zA-Z0-9 ]/g, ' ').trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}
