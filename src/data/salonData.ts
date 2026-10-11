import { SalonService, Stylist, TestimonialItem, DailySchedule } from '../types/salon';

export const UNSPLASH_SUFFIX = '?q=80&w=1600&auto=format&fit=crop';

export const IMAGES = {
  hero: `https://images.unsplash.com/photo-1560066984-138dadb4c035${UNSPLASH_SUFFIX}`,
  salonInterior: `https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f${UNSPLASH_SUFFIX}`,
  styling: `https://images.unsplash.com/photo-1562322140-8baeececf3df${UNSPLASH_SUFFIX}`,
  blowout: `https://images.unsplash.com/photo-1522337660859-02fbefca4702${UNSPLASH_SUFFIX}`,
  color: `https://images.unsplash.com/photo-1512690459411-b9245aed614b${UNSPLASH_SUFFIX}`,
  washRitual: `https://images.unsplash.com/photo-1580618672591-eb180b1a973f${UNSPLASH_SUFFIX}`,
  makeup: `https://images.unsplash.com/photo-1487412947147-5cebf100ffc2${UNSPLASH_SUFFIX}`,
  bridalHair: `https://images.unsplash.com/photo-1519699047748-de8e457a634e${UNSPLASH_SUFFIX}`,
  balayageHair: `https://images.unsplash.com/photo-1492106087820-71f1a00d2b11${UNSPLASH_SUFFIX}`,
  salonDetail: `https://images.unsplash.com/photo-1600948836101-f9ffda59d250${UNSPLASH_SUFFIX}`,
  mensCut: `https://images.unsplash.com/photo-1503951914875-452162b0f3f1${UNSPLASH_SUFFIX}`,
  extensions: `https://images.unsplash.com/photo-1526045478516-99145907023c${UNSPLASH_SUFFIX}`,
  lashes: `https://images.unsplash.com/photo-1512496015851-a90fb38ba796${UNSPLASH_SUFFIX}`,
  johnnyPortrait: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d${UNSPLASH_SUFFIX}`,
  laurenPortrait: `https://images.unsplash.com/photo-1573496359142-b8d87734a5a2${UNSPLASH_SUFFIX}`,
  avatarShree: `https://images.unsplash.com/photo-1438761681033-6461ffad8d80${UNSPLASH_SUFFIX}`,
  avatarGuest2: `https://images.unsplash.com/photo-1544005313-94ddf0286df2${UNSPLASH_SUFFIX}`,
  avatarGuest3: `https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91${UNSPLASH_SUFFIX}`,
};

export const BUSINESS_INFO = {
  name: 'Johnny Rodriguez The Salon',
  address: '5403 W Lovers Ln, Dallas, TX 75209',
  phone: '(214) 987-1919',
  phoneClean: '2149871919',
  email: 'aric@jrthesalon.com',
  secondLocation: 'Plano at Legacy West',
  social: {
    instagram: 'https://instagram.com/johnnyrodriguezthesalon',
    facebook: 'https://facebook.com/johnnyrodriguezthesalon',
    pinterest: 'https://pinterest.com/johnnyrodriguezthesalon',
  },
  noteUnderServices: 'Prices are starting estimates and vary by stylist, hair length, and density. Call (214) 987-1919 for exact pricing.',
  footerDisclaimer: 'Design concept created for demonstration purposes only — this is not the official website of Johnny Rodriguez The Salon.',
};

export const DALLAS_HOURS: DailySchedule[] = [
  { day: 'Tuesday', hours: '9am – 7pm', hoursDisplay: '9am – 7pm', isClosed: false, openHour: 9, closeHour: 19 },
  { day: 'Wednesday', hours: '8am – 3pm', hoursDisplay: '8am – 3pm', isClosed: false, openHour: 8, closeHour: 15 },
  { day: 'Thursday', hours: '8am – 5pm', hoursDisplay: '8am – 5pm', isClosed: false, openHour: 8, closeHour: 17 },
  { day: 'Friday', hours: '8am – 7pm', hoursDisplay: '8am – 7pm', isClosed: false, openHour: 8, closeHour: 19 },
  { day: 'Saturday', hours: '8am – 5pm', hoursDisplay: '8am – 5pm', isClosed: false, openHour: 8, closeHour: 17 },
  { day: 'Sunday', hours: 'Closed', hoursDisplay: 'Closed', isClosed: true },
  { day: 'Monday', hours: 'Closed', hoursDisplay: 'Closed', isClosed: true },
];

export const SALON_HOURS = DALLAS_HOURS;

export const SALON_SERVICES: SalonService[] = [
  // Cuts
  {
    id: 'cut-women',
    name: "Signature Women's Cut & Style",
    category: 'cuts',
    priceDisplay: 'from $85',
    startingPrice: 85,
    duration: '60 min',
    description: 'Precision architectural cut tailored to face shape, hair texture, and natural movement, finished with a signature blowout.',
    image: IMAGES.styling,
  },
  {
    id: 'cut-men',
    name: "Men's Precision Cut",
    category: 'cuts',
    priceDisplay: 'from $45',
    startingPrice: 45,
    duration: '30 min',
    description: 'Custom scissor-over-comb and clipper detailing with neck taper, refreshing shampoo cleanse, and refined style.',
    image: IMAGES.mensCut,
  },
  {
    id: 'cut-child',
    name: "Child's Cut (12 & under)",
    category: 'cuts',
    priceDisplay: 'from $35',
    startingPrice: 35,
    duration: '30 min',
    description: 'Gentle, tailored haircut and light blow-dry styling tailored for younger guests.',
    image: IMAGES.salonDetail,
  },

  // Color
  {
    id: 'color-single',
    name: 'Single-Process Color',
    category: 'color',
    priceDisplay: 'from $95',
    startingPrice: 95,
    duration: '90 min',
    description: 'Custom all-over rich base color or grey coverage formulated with premium conditioning pigments for luminous tone.',
    image: IMAGES.color,
  },
  {
    id: 'color-partial-highlight',
    name: 'Partial Highlight',
    category: 'color',
    priceDisplay: 'from $160',
    startingPrice: 160,
    duration: '120 min',
    description: 'Artisan foil placement framing the crown and face to introduce dimensional radiance and soft brightness.',
    image: IMAGES.washRitual,
  },
  {
    id: 'color-full-highlight',
    name: 'Full Highlight',
    category: 'color',
    priceDisplay: 'from $195',
    startingPrice: 195,
    duration: '150 min',
    description: 'Complete multi-dimensional lightening throughout the crown, sides, and nape for maximum contrast and sunlit lift.',
    image: IMAGES.color,
  },
  {
    id: 'color-balayage',
    name: 'Balayage / Lived-in Color',
    category: 'color',
    priceDisplay: 'from $210',
    startingPrice: 210,
    duration: '150 min',
    description: 'Signature hand-painted freehand sweeping with seamless root diffusion for a sun-kissed, low-maintenance finish.',
    image: IMAGES.balayageHair,
  },

  // Treatments
  {
    id: 'treatment-brazilian',
    name: 'Brazilian Blowout',
    category: 'treatments',
    priceDisplay: 'from $250',
    startingPrice: 250,
    duration: '120 min',
    description: 'Customizable liquid smoothing treatment that bonds amino acids to cuticle fibers, eliminating frizz in Texas humidity.',
    image: IMAGES.salonInterior,
  },
  {
    id: 'treatment-conditioning',
    name: 'Deep Conditioning Ritual',
    category: 'treatments',
    priceDisplay: 'from $45',
    startingPrice: 45,
    duration: '30 min',
    description: 'Intense peptide and lipid hydration masque with warm towel steam to restore virgin elasticity and silky shine.',
    image: IMAGES.washRitual,
  },
  {
    id: 'treatment-extensions',
    name: 'Hair Extensions',
    category: 'treatments',
    priceDisplay: 'by consultation',
    startingPrice: null,
    duration: 'Consultation',
    description: 'Seamless tape-in, hand-tied, and keratin-bond extensions custom matched for luxury volume, length, and density.',
    image: IMAGES.extensions,
  },

  // Styling
  {
    id: 'styling-blowout',
    name: 'Signature Blowout (Blow Dry Bar)',
    category: 'styling',
    priceDisplay: 'from $55',
    startingPrice: 55,
    duration: '45 min',
    description: 'Aromatherapy scalp massage, thermal defense serum, and bouncy Dallas volume or glass-hair sleek press.',
    image: IMAGES.blowout,
  },
  {
    id: 'styling-special-occasion',
    name: 'Special-Occasion Styling',
    category: 'styling',
    priceDisplay: 'from $75',
    startingPrice: 75,
    duration: '60 min',
    description: 'Romantic textured updos, modern chignons, or Hollywood waves crafted for galas, cocktail evenings, and milestones.',
    image: IMAGES.styling,
  },

  // Bridal & Lashes
  {
    id: 'bridal-hair-trial',
    name: 'Bridal Hair Trial',
    category: 'bridal-lashes',
    priceDisplay: 'from $95',
    startingPrice: 95,
    duration: '60 min',
    description: 'In-depth consultation, veil placement test, and trial run perfecting your wedding day hair architecture.',
    image: IMAGES.bridalHair,
  },
  {
    id: 'bridal-day-of',
    name: 'Bridal Day-Of Styling',
    category: 'bridal-lashes',
    priceDisplay: 'from $125',
    startingPrice: 125,
    duration: '90 min',
    description: 'Flawless wedding morning styling, veil and accessory security, and long-lasting hold for photographs.',
    image: IMAGES.bridalHair,
  },
  {
    id: 'makeup-application',
    name: 'Makeup Application',
    category: 'bridal-lashes',
    priceDisplay: 'from $75',
    startingPrice: 75,
    duration: '45 min',
    description: 'Camera-ready full face makeup featuring flawless skin prep, sculpted contours, and refined eye artistry.',
    image: IMAGES.makeup,
  },
  {
    id: 'lashes-full-set',
    name: 'Lash Extensions Full Set',
    category: 'bridal-lashes',
    priceDisplay: 'from $130',
    startingPrice: 130,
    duration: '120 min',
    description: 'Individual semi-permanent lash extensions applied lash-by-lash for eye-opening elegance and weightless flutter.',
    image: IMAGES.lashes,
  },
  {
    id: 'lashes-fill',
    name: 'Lash Fill',
    category: 'bridal-lashes',
    priceDisplay: 'from $65',
    startingPrice: 65,
    duration: '60 min',
    description: 'Refill appointment replacing shed lashes to maintain pristine volume and lash density.',
    image: IMAGES.lashes,
  },
];

export const STYLISTS: Stylist[] = [
  {
    id: 'johnny-rodriguez',
    name: 'Johnny Rodriguez',
    role: 'Owner & Founder',
    experience: '25+ Years in the Beauty Industry',
    specialties: ['Architectural Precision Cutting', 'Editorial Color', 'Master Consultation'],
    bio: 'With over 25 years at the vanguard of luxury hair artistry, Johnny built the salon on a commitment to timeless aesthetics, mentorship, and personalized care. His architectural cuts are known to hold their shape effortlessly through every stage of growth.',
    image: IMAGES.johnnyPortrait,
  },
  {
    id: 'lauren-vance',
    name: 'Lauren Vance',
    role: 'Stylist',
    experience: 'Master Color & Styling Specialist',
    specialties: ['Balayage & Foil Artistry', 'Lived-In Color', 'Bridal Styling'],
    bio: 'Renowned for seamless dimensional transitions, lived-in blondes, and romantic bridal hair. Lauren combines technical precision with an intuitive eye for skin undertones, creating effortless glamour tailored to each guest.',
    image: IMAGES.laurenPortrait,
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'shree',
    quote: 'Carissa and Erica have been wonderful to work with throughout my hair journey.',
    clientName: 'Shree',
    location: 'Dallas Guest · Verified Site Review',
    avatar: IMAGES.avatarShree,
    serviceMention: 'Hair Color & Styling Journey',
  },
  {
    id: 'eleanor',
    quote: 'Johnny has been cutting my hair for years. The precision is unmatched, and the Lovers Lane salon atmosphere is calm, welcoming, and genuinely luxurious.',
    clientName: 'Eleanor H.',
    location: 'Highland Park, Dallas',
    avatar: IMAGES.avatarGuest2,
    serviceMention: "Signature Women's Cut & Style",
  },
  {
    id: 'madeline',
    quote: 'Lauren created the exact lived-in balayage I was looking for. Not a harsh foil line in sight—just seamless, luminous dimension that grows out so naturally.',
    clientName: 'Madeline R.',
    location: 'Preston Hollow, Dallas',
    avatar: IMAGES.avatarGuest3,
    serviceMention: 'Balayage / Lived-in Color',
  },
];

export const PHILOSOPHY_POINTS = [
  {
    title: 'Precision Craft',
    desc: 'Every cut and color is engineered around bone structure, natural growth patterns, and individual lifestyle.',
  },
  {
    title: 'Faith, Honesty & Integrity',
    desc: 'Founded on core family-built values that guide every consultation, pricing conversation, and client relationship.',
  },
  {
    title: 'Continuous Education',
    desc: 'Our team trains continuously on progressive European and American cutting, balayage, and restorative techniques.',
  },
  {
    title: 'Pure Hospitality',
    desc: 'A calm, unpretentious retreat on Lovers Lane offering undivided stylist attention from greeting to finish.',
  },
];
