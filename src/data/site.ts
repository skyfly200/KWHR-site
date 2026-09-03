// ---------------------------------------------------------------------------
// Central content for Way High Radio (KWHR).
// Content sourced from the live wayhighradio.com pages. A few operational
// details (exact FM frequency/wattage) are marked CONFIRM where the source
// site was ambiguous.
// ---------------------------------------------------------------------------

export const station = {
  name: 'Way High Radio',
  callsign: 'KWHR',
  tagline: 'Radio for the people, by the people.',
  subtagline: 'Pure Community Radio.',
  // The site notes a move to 90.5 FM with a 75-watt transmitter; the station
  // also streams online and is simulcast across the CCRN. CONFIRM current dial.
  frequencies: [
    { freq: '90.5 FM', city: 'Ward, Colorado' },
    { freq: 'Online', city: 'Streaming worldwide' },
  ],
  founded: 1997,
  about:
    'Way High Radio is a volunteer-powered, commercial-free, listener-supported community station broadcasting from Ward, Colorado since 1997. Run entirely on grassroots support — nobody gets paid — it connects the Ward and Indian Peaks community through the spirit of the music and the intentions of its DJs. A proud member of the Colorado Community Radio Network.',
  network: {
    name: 'Colorado Community Radio Network',
    url: 'http://www.coloradocommunityradio.com/',
    blurb:
      'A network of grassroots "Pirate" community radio stations serving Colorado mountain towns through shared content and a focus on local interests.',
  },
  // Live Icecast stream, served over HTTPS via a Caddy reverse proxy in front
  // of the Icecast server (74.208.198.179:8000). No mixed-content issues.
  streamUrl: 'https://stream.wayhighradio.com/stream',
  // Broadcast schedule Google Calendar (embedded on the Schedule page).
  scheduleCalendarSrc:
    'https://calendar.google.com/calendar/embed?title=Broadcast%20Schedule&mode=WEEK&height=600&wkst=1&bgcolor=%23FFFFFF&src=wayhighradio%40gmail.com&color=%2329527A&src=n133ik8fl3v58qp8amibid1mrs%40group.calendar.google.com&color=%23BE6D00&ctz=America%2FDenver',
  phone: '720-507-5947',
  email: 'wayhighradio@gmail.com',
  location: 'Ward, CO 80481',
  donateUrl: '#donate', // CONFIRM — link to the real donation / benefit page
  social: {
    facebook: 'https://www.facebook.com/WayHighRadio/',
    email: 'mailto:wayhighradio@gmail.com',
  },
}

export interface DJ {
  slug: string
  name: string
  shows: string[]
  bio: string
  alumni?: boolean
}

export const djs: DJ[] = [
  { slug: 'skyfly', name: 'SkyFly / Radiant Rebel', shows: [], bio: 'A bit of everything — plus featuring live artists and events.' },
  { slug: 'dj-willy', name: 'DJ Willy', shows: [], bio: 'A mix of new, old and relevant.' },
  { slug: 'cp3o', name: 'CP3O / Circular Logic', shows: [], bio: 'Local focus, and then some.' },
  { slug: 'porsche-steve', name: 'Porsche Steve', shows: [], bio: 'Rock and roll, then and now.' },
  { slug: 'pinky-hues', name: 'Pinky Hues aka Spooky Nice', shows: [], bio: 'A crisp Friday show.' },
  { slug: 'will-n-emy', name: "Will n' Emy", shows: [], bio: 'Classics from vinyl and other old recordings.' },
  { slug: 't-dan', name: 'T Dan', shows: [], bio: 'Classic songs mixed with an abundance of information.' },
  { slug: 'captain-trips', name: 'Captain Trips', shows: [], bio: 'Join the Captain on his Sunday morning excursion through a different perspective that’s bound to get you thinking. Thoughtful commentary mixed with his serving of tunes.' },
  { slug: 'dj-jake-turkey', name: 'DJ Jake & Turkey', shows: [], bio: 'Turkey lets Jake out once a week to bring in the weekend with style.' },
  { slug: 'dj-apache', name: 'DJ Apache', shows: [], bio: 'Apache has been part of WHR since the beginning. From up-close interviews to the days of The Party on Air, Apache ties it all together into a whole lot of fun and perspective.' },
  { slug: 'scott', name: 'Scott', shows: [], bio: 'Rhythm, blues and more, delivered with style.' },
  { slug: 'spin-mistress', name: 'Spin Mistress', shows: [], bio: 'A genre-bending trip to the edge and back.' },
  { slug: 'dj-derz', name: 'DJ Derz', shows: [], bio: '' },
  { slug: 'dj-dingus', name: 'DJ Dingus', shows: [], bio: '' },
  { slug: 'jaimie', name: 'Jaimie', shows: ['The Indigenous Hours', 'The Late Night Groove'], bio: 'One of our original DJs returns to share his love. Host of The Indigenous Hours and The Late Night Groove.' },
  { slug: 'dj-datura', name: 'DJ Datura', shows: ['The Dub Shack', 'Awakenings'], bio: 'Host of The Dub Shack and Awakenings. Let him start you out on that reggae ride and end up taking off to another plane.' },
  // Alumni
  { slug: 'charley', name: 'Charley', shows: [], bio: 'New Orleans brass.', alumni: true },
  { slug: 'nocturnatina', name: 'Nocturnatina', shows: [], bio: 'Let her carry you into the wee hours with her own special mix.', alumni: true },
  { slug: 'damo', name: 'Damo', shows: [], bio: '', alumni: true },
  { slug: 'jessica', name: 'Jessica', shows: [], bio: 'The Cheese Cake Lady.', alumni: true },
  { slug: 'dj-teo', name: 'DJ Teo', shows: [], bio: 'Start your Saturday smooth, easy and positive!', alumni: true },
  { slug: 'bear', name: 'Bear', shows: [], bio: '', alumni: true },
  { slug: 'acrimonious-king', name: 'Acrimonious King', shows: [], bio: '', alumni: true },
  { slug: 'cisco-gomez', name: 'Cisco Gomez', shows: ["Besley's Bong Brake"], bio: "Host of Besley's Bong Brake.", alumni: true },
]

export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  body: string[]
}

export const posts: Post[] = [
  {
    slug: 'sailing-into-our-twentieth-year',
    title: 'Sailing Into Our Twentieth Year',
    date: '2016-11-28',
    excerpt:
      'It’s been a really long time since we posted — twenty years in, our shows continue to showcase the diversity of our mountain habitat.',
    body: [
      'Okay, I know. It’s been a really long time since we posted anything to this blog. Where to begin. Our scheduled shows continue to showcase the diversity in our mountain habitat. We’ve had some great DJs come and go but the crew continues to grow with a desire to share. Working with the Colorado Community Radio Network has really helped enlarge our listening audience. It also creates a larger sense of community. Our shows are shared on 93.1 KNED, 95.5 Boulder Free Radio and 93.1 Greenlight Radio in the Boulder Valley.',
      'We have also had two successful years of broadcasting from ground zero at Frozen Dead Guy Days with DJs from all member stations keeping the vibe going all weekend long. Our Tech / DJ Sky Fly has been hard at work constantly upgrading the automation — station IDs, PSAs, scripts to auto-reboot Chip (our computer) when the power goes down, and a remote broadcasting platform so we can broadcast from events like Boulder’s Big Hootenany.',
      'Another landmark event this summer was our response to the Cold Spring Fire in Nederland. On July 9th we were alerted about a fire; as we prepared to broadcast, the power went out. Thanks to protocols built over the last few years, we powered the studio with a generator and Nedernet’s internet with a car and a power inverter. Within a half hour we were back broadcasting and relaying on KNED. For the next five days a dedicated DJ crew worked 24/7 to update people with any info available through Boulder OEM. This fulfills an aspect of our charter: to serve the mountain community in times of disaster.',
    ],
  },
]

export interface LinkItem {
  label: string
  url: string
  note?: string
}

export const links: LinkItem[] = [
  { label: 'Nedernet Internet', url: 'http://nedernet.net/', note: "Without Planetmind / Nedernet's continuous support over the years, we would probably not exist." },
  { label: 'Peak to Peak Batiks', url: 'http://peaktopeakbatiks.com/', note: 'Eric has done incredible designs for WHR over the years.' },
  { label: 'Skyfly Designs', url: 'http://www.skyflydesign.com/', note: 'Turning your IT dreams into a reality.' },
  { label: 'Coyote Circle Studios', url: 'http://www.coyotecirclestudios.com/', note: 'Michael Nuzum is a sound / tech extraordinaire!' },
  { label: 'The Millsite Inn', url: 'http://www.millsiteinn.com/', note: 'Serving homemade food to the Peak to Peak region since 1985.' },
  { label: 'North Boulder Liquors', url: 'http://www.northboulderliquor.com/', note: 'Your last stop on the way up the hill.' },
  { label: 'Upslope Brewing Company', url: 'http://upslopebrewing.com/', note: 'Official sponsor of Hallowhen? II and March 4th.' },
  { label: 'Nederland Veterinary Hospital', url: 'http://www.nedvet.com/', note: 'General veterinary care to Nederland and the surrounding area.' },
  { label: 'High Country Hemp Co.', url: 'http://www.highcountryhemp.com/', note: 'Purveyors of fine hemp seed oil products since 1993.' },
  { label: "Boulder's Big Hootenany", url: 'http://www.consciousalliance.org/2011/07/boulders-big-hootenanny/', note: 'The coolest annual local fest; proceeds support The Conscious Alliance.' },
  { label: 'Gold Hill Inn', url: 'http://www.goldhillinn.com/', note: 'A history of entertainment. Another community landmark.' },
  { label: 'Jamestown Mercantile', url: 'http://www.jamestownmercantile.com/', note: 'Keeping the Jamestown spirit alive.' },
  { label: 'Pioneer Inn', url: 'http://www.pioneerinnnederland.net/', note: 'A Nederland landmark.' },
  { label: 'Very Nice Brewing Company', url: 'http://www.verynicebrewing.com/', note: 'Yes it is. Great beer, great folks.' },
  { label: 'Khatmandu Restaurant', url: 'http://www.nepalidining.com/', note: 'Bringing Nepal to Ned! Check out the buffet.' },
  { label: 'Cirkits.com', url: 'http://cirkits.com/', note: 'Electronic kits for solar power. Forrest has helped WHR for many years.' },
  { label: 'Colorado Community Radio Network', url: 'http://www.coloradocommunityradio.com/', note: 'Linking the expanding network of Pure Community Radio.' },
  { label: 'Greenlight Radio', url: 'http://greenlightradio.com/', note: '95.5 FM in Boulder.' },
  { label: 'Boulder Free Radio', url: 'http://www.boulderfreeradio.org/', note: 'KBFR 95.3 FM.' },
]

export interface Guideline {
  title: string
  body: string
}

export const aboutHistory: string[] = [
  'Way High Radio was started in 1997 to connect the community of Ward, CO and beyond. It has been guided by a handful of committed individuals over the years. Through community support from annual benefits, we have managed to stay on the air except for about two years (2009–2011).',
  'We were brought back to life, with the urging of our local FEMA director, to help aid in emergency services and to expand our desire to connect Ward and the Indian Peaks community. In December of 2013, we became part of the Colorado Community Radio Network — a network of so-called “Pirate” radio stations that serve communities in a grassroots way. As far as we know, we are the longest-running “Pirate” radio station in the Rockies.',
  'We have been granted permission from the Town of Ward to locate our studio next to the Town Hall. All revenue (after expenses) is used to support other Town of Ward projects. This project is run entirely on volunteer, grassroots support. Nobody gets paid. It is an experiment in community building that has lasted many years — due to the spirit of the music, the intentions of our DJs, and an overall spirit that exists within our quirky mountain town.',
]

export const guidelines: Guideline[] = [
  {
    title: 'We play first for the community',
    body: 'This station is run for the Ward / Mountain community, powered by the Ward community. They donate annually to keep us on the air, so we must be respectful of our listening audience and of each other. Remember that kids are listening during the day — use discretion. No hate speech.',
  },
  {
    title: 'Respect the studio',
    body: 'When you become a member you get a copy of these guidelines and the combination to the door. Do not share the combo. Never leave the studio unlocked for any reason. We rely on all of our DJs to keep the studio safe. Please don’t contribute to our “Hall of Shame.”',
  },
  {
    title: 'Using the equipment',
    body: 'Our computer is named CHIP. All components (microphones, computer, CD player, turntable, etc.) plug into the soundboard and are labeled, each with a corresponding fader. Pause the RadioDJ music player when starting a show, or add your music under the current song so we keep randomly accessing the whole library when CHIP is playing.',
  },
  {
    title: 'Driving the sound',
    body: 'Make sure we are streaming (click the speaker icon; if it says idle, press play — automation scripts help keep the stream going). Keep the main computer and app volumes all the way up and drive the sound from the board. Use the monitors for studio volume, not the main board levels, and aim monitors away from the mic to avoid feedback. The board meter should peak at 7 and sit around 0.',
  },
]

// Absolute URLs to the live site's images (they load fine in the browser).
const IMG = 'https://www.wayhighradio.com/uploads/1/9/7/4/1974686'
export const media = {
  // Mountain scenery header photos from the original site.
  heroWide: `${IMG}/header_images/1445999652.jpg`,
  heroAlt: `${IMG}/header_images/1411256791.jpg`,
  // Logos.
  ccrnLogo: `${IMG}/ccrn-logo-02-border_1.jpg`,
  nedernetLogo: `${IMG}/published/nedernet-logo-new-big-words.jpg`,
  // Event flyer + community photos.
  fdgdFlyer: `${IMG}/fdgd-add-102-9.jpg`,
  gallery: [
    `${IMG}/7874589.jpg`,
    `${IMG}/5430562_orig.jpg`,
    `${IMG}/1838144_orig.jpg`,
    `${IMG}/14724130-10210749010939636-155157895-o.jpg`,
  ],
  featureYoutubeId: 'gYpYreUpXYk',
}

export const partners = [
  { name: 'Colorado Community Radio Network', logo: media.ccrnLogo, url: station.network.url },
  { name: 'Nedernet', logo: media.nedernetLogo, url: 'http://nedernet.net/' },
]

export const listenHelp = [
  {
    title: 'Listening in your browser',
    body: 'If the stream stops playing, reload the page. Google Chrome and Firefox are officially supported.',
  },
  {
    title: 'Listening in a media player',
    body: 'If the stream freezes, stop and restart it in your media player — or close the player and open the stream again.',
  },
]

export const navItems = [
  { to: '/', label: 'Home' },
  { to: '/listen', label: 'Listen' },
  { to: '/schedule', label: 'Schedule' },
  { to: '/about', label: 'About' },
  { to: '/djs', label: 'DJs' },
  { to: '/forward', label: 'Forward' },
  { to: '/guidelines', label: 'Guidelines' },
  { to: '/links', label: 'Links' },
  { to: '/contact', label: 'Contact' },
]
