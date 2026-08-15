export const SANGHA_DATA = {
  heroImage: '/media/sangha-hero.png',
  title: "Daali's Abhimani",
  titleAccent: 'Sangha',
  subtitle:
    'Stories don’t end when the credits roll. We turn cinematic inspiration into action that strengthens people, places, and futures.',
  stats: [
    { value: '850+', label: 'Volunteers' },
    { value: '43', label: 'Events Conducted' },
    { value: '12', label: 'Cities' },
    { value: '4200+', label: 'Lives Impacted' },
  ],
  events: [
    {
      id: 'blood-donation',
      title: 'Blood Donation Camp',
      meta: '15 August 2026 | Bengaluru',
      body: 'A community-led blood donation drive that brings citizens, youth volunteers and local partners together to support urgent medical needs and strengthen public health awareness.',
      image: '/media/event-1.png',
      reverse: false,
    },
    {
      id: 'swachh',
      title: 'Swachh Karnataka Drive',
      meta: '15 August 2026 | Mysuru',
      body: 'A city-wide cleaning and awareness campaign focused on cleaner streets, greener public spaces and a stronger sense of civic responsibility across neighborhoods.',
      image: '/media/event-2.png',
      reverse: true,
    },
    {
      id: 'school',
      title: 'School Renovation',
      meta: '22 August 2026 | Hubli',
      body: 'Working with educators, volunteers and donors to restore classrooms, libraries and playgrounds so children can learn in safe, inspiring environments.',
      image: '/media/event-3.png',
      reverse: false,
    },
  ],
  quote: {
    before: 'Cinema',
    accentOne: 'Inspires',
    middle: '. Action Changes',
    accentTwo: 'Lives',
    body: 'We believe stories spark empathy — and that empathy becomes powerful when it turns into collective action to serve communities with dignity.',
  },
  gallery: [
    { id: 1, image: '/media/gallery-1.png', color: false },
    { id: 2, image: '/media/gallery-2.png', color: false },
    { id: 3, image: '/media/gallery-3.png', color: true },
    { id: 4, image: '/media/gallery-1.png', color: false },
    { id: 5, image: '/media/gallery-2.png', color: false },
  ],
} as const
