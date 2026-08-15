import beyondIcon from '@/shared/assets/beyond-icon.png'
import daaliPortrait from '@/shared/assets/daali-portrait.png'
import heroCinematic from '@/shared/assets/hero-cinematic.png'
import sanghaLibrary from '@/shared/assets/sangha-library.png'
import socialInstagram from '@/shared/assets/social-instagram.png'
import socialX from '@/shared/assets/social-x.png'
import socialYoutube from '@/shared/assets/social-youtube.png'

export const HOME_IMAGES = {
  hero: heroCinematic,
  portrait: daaliPortrait,
  library: sanghaLibrary,
  beyondIcon,
  socials: {
    instagram: socialInstagram,
    x: socialX,
    youtube: socialYoutube,
  },
  posters: [
    'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1159&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1625690303837-654c9666d2d0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  ],
} as const

export const HOME_COPY = {
  mission:
    'We create stories that are rooted, emotional, and made to stay with people long after the screen fades to black. From powerful performances to bold productions, Daali Pictures exists to tell cinema that feels honest, human, and unforgettable.',
  brand: 'DAALI Pictures',
  profile: {
    firstName: 'Daali',
    lastName: 'Dhananjaya',
    roles: 'Actor • Writer • Producer',
    tags: ['3× Filmfare South', '4× SIIMA', 'Sandalwood'],
    bio: [
      'Born in Kalenahalli, Hassan district, Dhananjaya rose from engineering and theatre to become one of Kannada cinema\'s most compelling screen presences. His iconic role as "Daali" in Tagaru (2018) gave him a name that stayed — and an identity he built a production house around.',
      'A winner of three Filmfare Awards South and four SIIMA Awards, Dhananjaya brings the same intensity to the producer\'s chair that he does to every role. Under Daali Pictures, he champions stories rooted in Karnataka\'s soul while reaching audiences far beyond.',
    ],
  },
  beyond: [
    {
      id: '01',
      title: 'Film Production',
      body: 'End-to-end feature film production — development, casting, shoot, post, and theatrical release — for Kannada and multi-lingual projects.',
    },
    {
      id: '02',
      title: 'Lyricist',
      body: 'Digital-first storytelling crafted for Amazon Prime, Netflix, and Voot. Bold, binge-worthy narratives with emotional weight.',
    },
    {
      id: '03',
      title: 'Social Work',
      body: 'Strategic creative partnerships across Kannada, Telugu, and Tamil industries grounded in service and lasting community impact.',
    },
    {
      id: '04',
      title: 'Entrepreneur',
      body: 'Strategic creative partnerships across Kannada, Telugu, and Tamil industries grounded in service and lasting community impact.',
    },
  ],
  sangha: {
    titleBefore: "Daali's Abhimani",
    titleAccent: 'Sangha',
    body: "Stories don't end when the credits roll. Join us in creating real impact through community service, environmental initiatives, education, and healthcare.",
    cta: 'VISIT SANGHA',
  },
} as const

export type HomeProduction = {
  id: number
  title: string
  year: string
  genre: string
  image: string
  status: string
  featured?: boolean
}

export const HOME_PRODUCTIONS: HomeProduction[] = [
  {
    id: 1,
    title: 'Ashfall',
    year: '2023',
    genre: 'Action',
    image: HOME_IMAGES.posters[0],
    status: 'Coming Soon',
  },
  {
    id: 2,
    title: 'Night Orchard',
    year: '2023',
    genre: 'Thriller',
    image: HOME_IMAGES.posters[1],
    status: 'Streaming',
  },
  {
    id: 3,
    title: 'Zebrr',
    year: '2024',
    genre: 'Thriller',
    image: HOME_IMAGES.posters[2],
    status: 'Upcoming',
    featured: true,
  },
  {
    id: 4,
    title: 'Red Hour',
    year: '2024',
    genre: 'Crime',
    image: HOME_IMAGES.posters[3],
    status: 'In Theatres',
  },
  {
    id: 5,
    title: 'Salt Road',
    year: '2025',
    genre: 'Drama',
    image: HOME_IMAGES.posters[4],
    status: 'Announce',
  },
  {
    id: 6,
    title: 'Head Bush',
    year: '2022',
    genre: 'Drama',
    image: HOME_IMAGES.posters[5],
    status: 'Released',
  },
  {
    id: 7,
    title: 'Salaga',
    year: '2021',
    genre: 'Action',
    image: HOME_IMAGES.posters[6],
    status: 'Released',
  },
]

export const SANGHA_MOVIE_TICKER = [
  'Popcorn Monkey Tiger',
  'Badava Rascal',
  'Rathnan Prapancha',
  'Salaga',
  'Head Bush',
  'Tagaru',
  'Kurukshetra',
  'Inspector Vikram',
  'Badava Rascal',
  'Zebrr',
] as const
