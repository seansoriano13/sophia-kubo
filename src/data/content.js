// Everything the Issue says lives here, so a real picture or fact only ever
// needs changing in one place.
//
// Stock pictures come from picsum.photos with fixed seeds, so they stay the
// same on every load. Swap `stock(...)` for a path in /public (e.g.
// '/img/checkout.webp') when the real picture is ready; keep roughly the
// same aspect ratio as the w × h given.
//
// PLACEHOLDER marks generic copy and numbers that are not facts about Pea yet.

const stock = (seed, w, h) => `https://picsum.photos/seed/${seed}/${w}/${h}`

export const PERSON = {
  name: 'Sophia Kubo',
  nickname: 'Pea',
  role: 'Quality Control',
  email: 'kubo15.so@gmail.com',
  // PLACEHOLDER: real profile and résumé links
  links: [
    { label: 'LinkedIn', href: '#' },
    { label: 'Résumé', href: '#' },
  ],
  // PLACEHOLDER
  location: 'Working remotely, worldwide',
  availability: 'Open to QC roles and release checks',
}

export const ISSUE = {
  number: 'Nº 01',
  year: '2026',
  month: 'October 2026',
  title: 'The Proof Issue',
  price: 'Free to read',
}

export const COVER = {
  masthead: 'KUBO',
  cutout: '/img/cover-cutout.webp',
  labels: ['Quality Control', 'Release Checker'],
  // The Correction: the one deliberate typo the red pen fixes.
  headline: { lead: 'Checked before', before: 'it’s', wrong: 'trusetd', right: 'trusted', after: '.' },
  lines: [
    { href: '#cover-story', page: '04', kicker: 'Cover Story', title: 'Blood, on time', body: 'Every path through a hospital’s blood requests, checked before a single unit moved.' },
    { href: '#method', page: '20', kicker: 'Method', title: 'Four rules for breaking software kindly' },
    { href: '#interview', page: '24', kicker: 'Interview', title: '“I write the bug report I’d want to receive.”' },
  ],
}

export const COVER_STORY = {
  id: 'cover-story',
  page: '04',
  kicker: 'Cover Story',
  title: ['Blood,', 'on time.'],
  deck: 'RedBank took a hospital’s blood requests off paper. Before anyone trusted it with a real one, Pea walked every path a request could take: STAT or routine, approved, ready for pickup or cancelled.',
  byline: 'Quality Control · RedBank · 2025',
  brief: {
    name: 'RedBank',
    what: 'An Online Blood Station Management System',
    body: 'It automates blood request processing and improves communication among the MedTech team, physicians and nurses, reducing human errors and operational delays.',
    rows: [
      { term: 'Role', value: 'Quality Control' },
      // PLACEHOLDER: confirm scope
      { term: 'Scope', value: 'Functional checks, regression, release sign-off' },
      { term: 'Users', value: 'Laboratory, physicians, nurses, admins' },
      { term: 'Year', value: '2025' },
    ],
  },
  // PLACEHOLDER: the story copy is generic until Pea tells it in her own words
  story: [
    'A blood request is not a form like any other. When a physician marks one STAT, a patient is waiting on the other end of it, and every minute the request spends lost between the ward and the laboratory is a minute they wait too. RedBank was built to close that gap: one system where the MedTech team, physicians and nurses see the same request at the same time.',
    'Pea’s job was to make sure it never told them different stories. She mapped each role’s view of a request, from the physician who raises it to the laboratory that prepares the units, and checked every hand-off in between.',
    'The rule she worked by was simple. If two people can look at the same request and see different things, that is a bug, even when nothing crashes.',
  ],
  opening: {
    src: '/shots/redbank-landing.webp',
    alt: 'RedBank landing page: “Welcome to RedBank!” with a Request Blood button',
    ratio: '686 / 335',
    caption: 'The public front door, where every request starts.',
  },
  stat: {
    src: '/shots/redbank-lab-dashboard.webp',
    alt: 'RedBank laboratory dashboard: 9 STAT requests, 22 approved, 2 ready for pickup',
    title: 'The STAT queue',
    // PLACEHOLDER
    body: 'Urgent requests jump the line. Pea checked that they always did: in every role’s view, after every status change, and when two arrived in the same minute.',
  },
  quote: 'If a STAT request waits, someone waits with it.',
  figures: [
    {
      src: '/shots/redbank-requests.webp',
      alt: 'RedBank blood requests table with blood type, product, units, need date, urgency and status',
      ratio: '677 / 320',
      caption: 'Every column sorted, every filter combined. Urgency had to survive both.',
      // The pen circles the first STAT badge; positions are % of the picture.
      circle: { left: 69.5, top: 71, width: 9.5, height: 12 },
      note: 'priority holds ✓',
    },
    {
      src: '/shots/redbank-request-form.webp',
      alt: 'RedBank blood request form, patient information tab',
      ratio: '668 / 314',
      caption: 'Every required field, tried empty, wrong and out of order.',
    },
    {
      src: '/shots/redbank-users.webp',
      alt: 'RedBank users directory with masked names',
      ratio: '1018 / 470',
      caption: 'Four roles, four views. Masked names stayed masked for anyone who shouldn’t see them.',
    },
  ],
  // PLACEHOLDER: swap for the real check areas
  log: [
    { id: 'QC-01', area: 'Role permissions across all four views' },
    { id: 'QC-02', area: 'STAT priority ordering' },
    { id: 'QC-03', area: 'Request form validation' },
    { id: 'QC-04', area: 'Approved → ready for pickup → released' },
    { id: 'QC-05', area: 'Search and sort on request lists' },
    { id: 'QC-06', area: 'Notifications on status change' },
  ],
}

// PLACEHOLDER: four generic Departments until the real Work replaces them.
export const DEPARTMENTS = [
  {
    id: 'checkout',
    page: '12',
    kicker: 'E-commerce',
    title: 'Checkout Release Checks',
    year: '2025',
    tools: ['Jira', 'BrowserStack'],
    summary:
      'Release checks for a storefront checkout: carts, coupons, shipping rules and payment retries, walked through before every release so the last step of a sale never breaks quietly.',
    scope: ['Cart and coupon combinations', 'Shipping and tax rules', 'Payment failure and retry'],
    layout: 'left',
    images: [{ src: stock('kubo-checkout', 1400, 1050), alt: 'Placeholder picture for the checkout release checks', ratio: '4 / 3' }],
  },
  {
    id: 'banking',
    page: '14',
    kicker: 'Fintech',
    title: 'Mobile Banking Sign-off',
    year: '2025',
    tools: ['TestFlight', 'Jira'],
    summary:
      'Hands-on checks on a mobile banking app before each release, done alongside real tellers: transfers, bill payments, and the moment the network drops halfway through one.',
    scope: ['Transfers and bill payments', 'Offline and poor-network paths', 'Sign-off sessions with tellers'],
    layout: 'right',
    images: [
      { src: stock('kubo-banking', 1000, 1300), alt: 'Placeholder picture for the banking sign-off', ratio: '10 / 13' },
      { src: stock('kubo-banking-2', 800, 1000), alt: 'Second placeholder picture for the banking sign-off', ratio: '4 / 5' },
    ],
  },
  {
    id: 'api',
    page: '16',
    kicker: 'Platform',
    title: 'API Response Checks',
    year: '2024',
    tools: ['Postman', 'Swagger'],
    summary:
      'Checks that held a team of services to their promises: every endpoint compared against its docs for shape, status codes and the errors it is supposed to return.',
    scope: ['Response shape and types', 'Status codes and error bodies', 'Re-checked on every release'],
    layout: 'wide',
    images: [{ src: stock('kubo-api', 1800, 820), alt: 'Placeholder picture for the API response checks', ratio: '9 / 4.1' }],
  },
  {
    id: 'a11y',
    page: '18',
    kicker: 'Public sector',
    title: 'Accessibility Audit',
    year: '2024',
    tools: ['axe DevTools', 'NVDA', 'WCAG 2.2'],
    summary:
      'An audit of a public service website against WCAG 2.2: keyboard paths, screen reader labels, colour contrast, and the forms people actually need to finish.',
    scope: ['Keyboard-only journeys', 'Screen reader labels', 'Contrast and focus states'],
    layout: 'pair',
    images: [
      { src: stock('kubo-a11y', 900, 1100), alt: 'Placeholder picture for the accessibility audit', ratio: '9 / 11' },
      { src: stock('kubo-a11y-2', 900, 700), alt: 'Second placeholder picture for the accessibility audit', ratio: '9 / 7' },
    ],
  },
]

export const METHOD = {
  id: 'method',
  page: '20',
  kicker: 'Method',
  title: ['Four rules for', 'breaking software', 'kindly.'],
  intro: 'How Pea checks, in the order she does it. None of it is about saying no. All of it is about nobody being surprised after release.',
  rules: [
    {
      numeral: 'I',
      tag: 'Spec check',
      title: 'Read the spec like a contract.',
      body: 'Before touching the build, Pea reads what was promised. Most bugs live in the gap between what someone said and what someone built.',
    },
    {
      numeral: 'II',
      tag: 'Re-check',
      title: 'Every fix gets a second look.',
      body: 'A fix is a change, and changes break things. Each one goes back through the paths around it, not just the one it fixed.',
    },
    {
      numeral: 'III',
      tag: 'Data & APIs',
      title: 'Check the seams, not just the screens.',
      body: 'A screen is only as true as the record behind it. She checks what was actually saved and sent, not just what the page shows.',
    },
    {
      numeral: 'IV',
      tag: 'Accessibility',
      title: 'Check it the way people live.',
      body: 'By keyboard, with a screen reader, on a slow phone, at three in the morning. If it only works for the person checking it, it doesn’t work.',
    },
  ],
  // PLACEHOLDER: real tools and numbers
  tools: ['Jira', 'Google Sheets', 'Postman', 'Chrome DevTools', 'BrowserStack', 'axe DevTools'],
  stats: [
    { value: 180, suffix: '+', caption: 'releases checked before shipping' },
    { value: 340, suffix: '', caption: 'defects caught and re-checked' },
    { value: 5, suffix: '', caption: 'systems signed off' },
  ],
}

export const INTERVIEW = {
  id: 'interview',
  page: '24',
  kicker: 'Interview',
  title: ['In conversation', 'with Sophia Kubo'],
  standfirst: 'On reading software like a proof, the bugs nobody reports, and knowing when to stop.',
  portrait: { src: '/img/portrait-studio.webp', alt: 'Sophia Kubo in a cream cardigan, photographed in the studio' },
  caption: 'Pea, photographed for The Proof Issue',
  // PLACEHOLDER: answers are generic until Pea gives her own
  qa: [
    {
      q: 'What does quality control mean to you?',
      a: 'Reading software the way an editor reads a page. I’m not there to say no. I’m there so that nobody is surprised after it ships.',
    },
    {
      q: 'What kind of bug do you like finding most?',
      a: 'The quiet one. The page loads, the form submits, and the record saves with the wrong date. Nothing crashes, so nobody reports it. Those are the ones I go looking for.',
    },
    {
      q: 'How do you work with developers?',
      a: 'Early and often. A good bug report is a gift: the steps, what I expected, what actually happened, and a screenshot. I write the one I’d want to receive.',
    },
    {
      q: 'When do you know you’re done?',
      a: 'When I’ve used it the way a tired nurse would at three in the morning. Then I try it once more.',
    },
  ],
}

export const BACK_COVER = {
  kicker: 'Back Cover',
  title: ['Send it', 'to proof.'],
  invite: 'Something that needs a second look? Write to',
  stamp: { top: 'Approved', bottom: 'OK to print', initials: 'S.K.' },
  colophon: 'Set in Bodoni Moda and Archivo. Printed on Bone, proofed in red.',
  contributors: {
    label: 'Built in tandem with',
    name: 'Sean Soriano',
    href: 'https://sean-soriano.vercel.app/',
  },
}

// The Contents, in the order the Issue prints them. Each row's picture is
// what the hover preview shows.
export const CONTENTS = [
  { href: '#cover-story', page: COVER_STORY.page, kicker: 'Cover Story', title: 'RedBank: Blood, on time', meta: 'Quality Control · 2025', image: COVER_STORY.stat.src },
  ...DEPARTMENTS.map((d) => ({
    href: `#${d.id}`,
    page: d.page,
    kicker: `Department · ${d.kicker}`,
    title: d.title,
    meta: `${d.tools.join(', ')} · ${d.year}`,
    image: d.images[0].src,
  })),
  { href: '#method', page: METHOD.page, kicker: 'Method', title: 'Four rules for breaking software kindly', meta: 'How Pea checks', image: stock('kubo-method', 900, 1100) },
  { href: '#interview', page: INTERVIEW.page, kicker: 'Interview', title: 'In conversation with Sophia Kubo', meta: 'Q & A', image: INTERVIEW.portrait.src },
  { href: '#contact', page: '28', kicker: 'Back Cover', title: 'Send it to proof', meta: PERSON.email, image: COVER.cutout },
]
