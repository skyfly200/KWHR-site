// ---------------------------------------------------------------------------
// Central content for Way High Radio (KWHR).
//
// NOTE: The live site at wayhighradio.com could not be scraped from the build
// environment (blocked by network egress policy), so exact copy, images, and
// the real stream URL are marked as PLACEHOLDER below. Everything here is
// structured so you can drop the real content in without touching components.
// ---------------------------------------------------------------------------

export const station = {
  name: 'Way High Radio',
  callsign: 'KWHR',
  tagline: 'Community radio from the top of the world.',
  frequencies: [
    { freq: '90.5 FM', city: 'Ward, Colorado' },
    { freq: '102.9 FM', city: 'Nederland, Colorado' },
  ],
  about:
    'Way High Radio is a volunteer-powered, commercial-free, listener-supported community radio station broadcasting from the mountains of Colorado. We give local voices, musicians, and neighbors a place on the dial — free-form programming you will not hear anywhere else.',
  // PLACEHOLDER — replace with the station's real live stream URL.
  streamUrl: 'https://example-stream.wayhighradio.com/live',
  email: 'info@wayhighradio.com', // PLACEHOLDER — confirm real address
  mailingAddress: 'PO Box —, Ward, CO 80481', // PLACEHOLDER
  donateUrl: '#donate', // PLACEHOLDER — link to real donation page
  social: {
    facebook: 'https://www.facebook.com/WayHighRadio/',
    instagram: '', // PLACEHOLDER
    email: 'mailto:info@wayhighradio.com',
  },
}

export interface DJ {
  slug: string
  name: string
  shows: string[]
  bio: string
}

// Names confirmed via public search; bios are PLACEHOLDER copy.
export const djs: DJ[] = [
  {
    slug: 'jaimie',
    name: 'Jaimie',
    shows: ['The Indigenous Hours', 'The Late Night Groove'],
    bio: 'One of Way High Radio’s original DJs, spinning everything from Indigenous voices and roots music to deep late-night grooves.',
  },
  {
    slug: 'porsche-steve',
    name: 'Porsche Steve',
    shows: ['PLACEHOLDER Show'],
    bio: 'PLACEHOLDER — add this DJ’s bio from the current site.',
  },
  {
    slug: 'cp30',
    name: 'CP30',
    shows: ['PLACEHOLDER Show'],
    bio: 'PLACEHOLDER — add this DJ’s bio from the current site.',
  },
  {
    slug: 'the-mystery-dj',
    name: 'The Mystery DJ',
    shows: ['PLACEHOLDER Show'],
    bio: 'PLACEHOLDER — add this DJ’s bio from the current site.',
  },
  {
    slug: 'charlie-n-cooper',
    name: "Charlie n' Cooper",
    shows: ['PLACEHOLDER Show'],
    bio: 'PLACEHOLDER — add this DJ’s bio from the current site.',
  },
  {
    slug: 'dj-scott',
    name: 'DJ Scott',
    shows: ['PLACEHOLDER Show'],
    bio: 'PLACEHOLDER — add this DJ’s bio from the current site.',
  },
]

export interface Slot {
  start: string // 24h "HH:MM"
  title: string
  host?: string
}

// PLACEHOLDER weekly schedule — replace slots with the real lineup.
export const schedule: Record<string, Slot[]> = {
  Monday: [
    { start: '08:00', title: 'Mountain Morning Mix' },
    { start: '18:00', title: 'The Indigenous Hours', host: 'Jaimie' },
    { start: '22:00', title: 'The Late Night Groove', host: 'Jaimie' },
  ],
  Tuesday: [{ start: '10:00', title: 'Free-Form Fill' }],
  Wednesday: [{ start: '10:00', title: 'Free-Form Fill' }],
  Thursday: [{ start: '10:00', title: 'Free-Form Fill' }],
  Friday: [{ start: '20:00', title: 'Friday Night Sessions' }],
  Saturday: [{ start: '12:00', title: 'Weekend Sampler' }],
  Sunday: [{ start: '12:00', title: 'Weekend Sampler' }],
}

export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
}

// PLACEHOLDER "Forward" blog posts — mirror the real /forward feed.
export const posts: Post[] = [
  {
    slug: 'coming-alive-and-suddenly-its-hallowhen',
    title: "Coming Alive and Suddenly It's Hallowhen?",
    date: '2024-10-01',
    excerpt:
      'PLACEHOLDER — pull the real post body from wayhighradio.com/forward.',
  },
  {
    slug: 'welcome-to-the-new-site',
    title: 'Welcome to the new Way High Radio',
    date: '2024-01-01',
    excerpt:
      'PLACEHOLDER — a fresh, modern home for the station on the web.',
  },
]

export interface LinkItem {
  label: string
  url: string
  note?: string
}

// PLACEHOLDER community links.
export const links: LinkItem[] = [
  { label: 'Town of Ward', url: '#', note: 'PLACEHOLDER' },
  { label: 'Nederland Community', url: '#', note: 'PLACEHOLDER' },
  { label: 'Local Music & Events', url: '#', note: 'PLACEHOLDER' },
]

export const navItems = [
  { to: '/', label: 'Home' },
  { to: '/listen', label: 'Listen' },
  { to: '/schedule', label: 'Schedule' },
  { to: '/djs', label: 'DJs' },
  { to: '/forward', label: 'Forward' },
  { to: '/guidelines', label: 'Guidelines' },
  { to: '/links', label: 'Links' },
  { to: '/contact', label: 'Contact' },
]
