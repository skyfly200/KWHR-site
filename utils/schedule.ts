import { weeklySchedule, freeformShow, type ShowSlot } from '~/data/site'

const WEEK = 7 * 24 * 60

function toMin(t: string): number {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

export interface NowNext {
  current: { title: string; host?: string; live: boolean }
  next: { title: string; host?: string; start: string } | null
}

// Determine the day-of-week (0=Sun) and minute-of-day in Mountain Time.
function denverParts(now: Date): { day: number; minute: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Denver',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(now)
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? ''
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const day = days.indexOf(get('weekday'))
  let hour = parseInt(get('hour'), 10)
  if (hour === 24) hour = 0
  const minute = day * 1440 + hour * 60 + parseInt(get('minute'), 10)
  return { day, minute }
}

function fmtStart(slot: ShowSlot): string {
  const [h, m] = slot.start.split(':').map(Number)
  const d = new Date()
  d.setHours(h, m, 0, 0)
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  return `${days[slot.day]} ${time}`
}

export function nowNext(now: Date = new Date()): NowNext {
  const { minute: nowWeekly } = denverParts(now)

  // Current: a slot whose window contains "now".
  let current: NowNext['current'] = { ...freeformShow, live: false }
  for (const s of weeklySchedule) {
    const start = s.day * 1440 + toMin(s.start)
    const end = s.day * 1440 + toMin(s.end)
    if (nowWeekly >= start && nowWeekly < end) {
      current = { title: s.title, host: s.host, live: true }
      break
    }
  }

  // Next: the slot with the smallest positive distance ahead (wrapping the week).
  let best: ShowSlot | null = null
  let bestDelta = Infinity
  for (const s of weeklySchedule) {
    const start = s.day * 1440 + toMin(s.start)
    let delta = start - nowWeekly
    if (delta <= 0) delta += WEEK
    if (delta < bestDelta) {
      bestDelta = delta
      best = s
    }
  }

  return {
    current,
    next: best ? { title: best.title, host: best.host, start: fmtStart(best) } : null,
  }
}
