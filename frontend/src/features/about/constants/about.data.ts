import awardGold from '@/shared/assets/award-gold.png'
import awardGray from '@/shared/assets/award-gray.png'
import awardMoreGold from '@/shared/assets/award-more-gold.png'
import beyondImageFour from '@/shared/assets/beyond_image_four.png'
import beyondImageOne from '@/shared/assets/beyond_image_one.png'
import beyondImageThree from '@/shared/assets/beyond_image_three.png'
import beyondImageTwo from '@/shared/assets/beyond_image_two.png'
import daaliPortrait from '@/shared/assets/daali-portrait.png'
import heroCinematic from '@/shared/assets/hero-cinematic.png'
import sanghaLibrary from '@/shared/assets/sangha-library.png'

export const ABOUT_DATA = {
  heroImage: heroCinematic,
  portrait: daaliPortrait,
  library: sanghaLibrary,
  name: {
    first: 'Daali',
    last: 'Dhananjaya',
  },
  roles: 'Actor • Writer • Producer • Lyricist',
  bio: [
    'Born in Kalenahalli, Hassan district, Dhananjaya rose from engineering and theatre to become one of Kannada cinema\'s most compelling screen presences. His iconic role as "Daali" in Tagaru (2018) gave him a name that stayed — and an identity he built a production house around.',
    'A winner of three Filmfare Awards South and four SIIMA Awards, Dhananjaya brings the same intensity to the producer\'s chair that he does to every role. Under Daali Pictures, he champions stories rooted in Karnataka\'s soul while reaching audiences far beyond.',
  ],
  stats: [
    { value: '15+', label: 'Years in Cinema' },
    { value: '35+', label: 'Films' },
    { value: '3×', label: 'Filmfare Awards South' },
    { value: '4×', label: 'SIIMA Awards' },
  ],
  awards: [
    {
      year: '2024',
      org: 'SIIMA',
      category: 'BEST ACTOR',
      status: 'Winner',
      image: awardGold,
    },
    {
      year: '2023',
      org: 'SIIMA',
      category: 'BEST ACTOR',
      status: 'Winner',
      image: awardMoreGold,
    },
    {
      year: '2024',
      org: 'Filmfare',
      category: 'BEST ACTOR',
      status: 'Winner',
      image: awardGray,
    },
    {
      year: '2022',
      org: 'Filmfare',
      category: 'BEST ACTOR',
      status: 'Winner',
      image: awardGray,
    },
    {
      year: '2021',
      org: 'SIIMA',
      category: 'BEST ACTOR',
      status: 'Winner',
      image: awardGold,
    },
  ],
  beyond: [
    {
      title: 'Producer',
      area: 'producer',
      image: beyondImageOne,
      detail: {
        headline: 'Building Stories That Stay With People',
        body: 'As the founder of Daali Pictures, he develops and produces films that balance artistic storytelling with commercial appeal. His focus is on meaningful cinema, nurturing fresh talent, and creating stories rooted in authenticity.',
        highlights: [
          'Founded Daali Pictures',
          'Produced critically acclaimed Kannada films',
          'Supports emerging filmmakers and writers',
          'Focus on socially relevant and character-driven stories',
        ],
        quote: 'Great cinema begins with honest stories.',
      },
    },
    {
      title: 'Lyricist',
      area: 'lyricist',
      image: beyondImageTwo,
      detail: {
        headline: 'Words That Carry Emotion Onto Screen',
        body: 'Beyond acting and producing, he writes lyrics that deepen character and mood — lines that feel lived-in, rooted in Kannada idiom, and stay with audiences long after the song ends.',
        highlights: [
          'Writes for films across genres',
          'Blends poetic language with cinematic rhythm',
          'Collaborates closely with music directors',
          'Crafts lyrics grounded in local culture and feeling',
        ],
        quote: 'A song should feel like the character speaking.',
      },
    },
    {
      title: 'Entrepreneur',
      area: 'entrepreneur',
      image: beyondImageThree,
      detail: {
        headline: 'Building A House For Bold Kannada Stories',
        body: 'Through Daali Pictures and related ventures, he invests in talent, infrastructure, and long-term storytelling — treating cinema as both craft and enterprise that can grow the industry.',
        highlights: [
          'Built Daali Pictures into a production banner',
          'Invests in new voices and creative teams',
          'Balances creative risk with audience reach',
          'Champions Karnataka stories for wider screens',
        ],
        quote: 'Business should serve the story, not the other way around.',
      },
    },
    {
      title: 'Social Work',
      area: 'social',
      image: beyondImageFour,
      detail: {
        headline: 'Impact That Continues After The Credits',
        body: 'Through community initiatives and Daali’s Abhimani Sangha, he channels the reach of cinema into education, healthcare, and local service — turning fandom into collective good.',
        highlights: [
          'Supports education and healthcare initiatives',
          'Mobilises fans through community service',
          'Backs environmental and local causes',
          'Uses public platform for social awareness',
        ],
        quote: 'Cinema’s real power is how it moves people to act.',
      },
    },
  ],
  sangha: {
    titleBefore: "Daali's Abhimani",
    titleAccent: 'Sangha',
    body: "Stories don't end when the credits roll. Join us in creating real impact through community service, environmental initiatives, education, and healthcare.",
    cta: 'Visit Sangha',
  },
} as const
