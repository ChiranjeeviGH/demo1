export type Production = {
  id: string
  title: string
  language: string
  runtime: string
  rating: string
  genres: string[]
  description: string
  poster: string
  banner: string
}

export const PRODUCTIONS: Production[] = [
  {
    id: 'the-last-signal',
    title: 'The Last Signal',
    language: 'Telugu',
    runtime: '1h 46m',
    rating: 'PG-13',
    genres: ['Action', 'Thriller', 'Crime'],
    description:
      'A fearless young courier uncovers a hidden network of corruption inside the city’s most powerful empire, forcing him to choose between survival and justice.',
    poster: '/media/poster-1.png',
    banner: '/media/production-1.png',
    video: '/media/Video1.mp4',
  },
  {
    id: 'midnight-harbor',
    title: 'Midnight Harbor',
    language: 'Telugu',
    runtime: '8 Episodes',
    rating: 'PG-13',
    genres: ['Drama', 'Mystery', 'Suspense'],
    description:
      'When a coastal town begins losing its memory to a strange underground force, a local investigator and a grieving journalist race against time to reveal the truth.',
    poster: '/media/poster-2.png',
    banner: '/media/production-2.png',
    video: '/media/Video1.mp4',
  },
  {
    id: 'river-of-memory',
    title: 'River of Memory',
    language: 'Telugu',
    runtime: '52m',
    rating: 'PG-13',
    genres: ['Documentary', 'Social', 'Culture'],
    description:
      'A deeply personal documentary tracing the lives, struggles and resilience of families who rebuilt their future through hope, labor and community care.',
    poster: '/media/poster-3.png',
    banner: '/media/production-3.png',
    video: '/media/Video1.mp4',
  },
  {
    id: 'hill-of-light',
    title: 'The Hill of Light',
    language: 'Telugu',
    runtime: '6 Episodes',
    rating: 'PG-13',
    genres: ['Adventure', 'Drama', 'Family'],
    description:
      'Set across a remote hill town, this story follows a group of strangers who reconnect through a long-lost festival and discover what they are risking to protect.',
    poster: '/media/poster-4.png',
    banner: '/media/production-4.png',
    video: '/media/Video1.mp4',
  },
  {
    id: 'echoes-of-dawn',
    title: 'Echoes of Dawn',
    language: 'Telugu',
    runtime: '2h 03m',
    rating: 'PG-13',
    genres: ['Drama', 'Romance', 'Thriller'],
    description:
      'In a city built on silence and secrets, two childhood friends must confront the past when a single night changes the fate of everyone around them.',
    poster: '/media/poster-5.png',
    banner: '/media/production-5.png',
    video: '/media/Video1.mp4',
  },
]
