import agricultureImage from '../assets/agriculture.jpg'
import healthcareImage from '../assets/healthcare.jpg'
import womenImage from '../assets/women.jpg'
import educationImage from '../assets/education.jpg'
import socialWelfareImage from '../assets/social-welfare.jpg'

const placeholderImages = [
  agricultureImage,
  healthcareImage,
  womenImage,
  educationImage,
  socialWelfareImage,
]

const names = [
  ['bagalkote', 'Bagalkot', 29, 31],
  ['ballari', 'Ballari', 57, 42],
  ['belagavi', 'Belagavi', 36, 22],
  ['bengaluru-rural', 'Bengaluru Rural', 58, 67],
  ['bengaluru-urban', 'Bengaluru Urban', 70, 68],
  ['bidar', 'Bidar', 58, 12],
  ['chamarajanagar', 'Chamarajanagar', 55, 83],
  ['chikballapur', 'Chikballapur', 67, 58],
  ['chikkamagaluru', 'Chikkamagaluru', 48, 59],
  ['chitradurga', 'Chitradurga', 48, 52],
  ['dakshina-kannada', 'Dakshina Kannada', 41, 78],
  ['davanagere', 'Davanagere', 54, 55],
  ['dharwad', 'Dharwad', 48, 30],
  ['gadag', 'Gadag', 48, 41],
  ['hassan', 'Hassan', 47, 68],
  ['haveri', 'Haveri', 46, 37],
  ['kalaburagi', 'Kalaburagi', 58, 36],
  ['kodagu', 'Kodagu', 48, 76],
  ['kolar', 'Kolar', 62, 59],
  ['koppal', 'Koppal', 57, 52],
  ['mandya', 'Mandya', 52, 72],
  ['mysuru', 'Mysuru', 51, 79],
  ['raichur', 'Raichur', 60, 62],
  ['ramanagara', 'Ramanagara', 59, 76],
  ['shivamogga', 'Shivamogga', 47, 48],
  ['tumakuru', 'Tumakuru', 64, 74],
  ['udupi', 'Udupi', 39, 66],
  ['uttara-kannada', 'Uttara Kannada', 25, 44],
  ['vijayapura', 'Vijayapura', 45, 33],
  ['vijayanagara', 'Vijayanagara', 67, 48],
  ['yadgir', 'Yadgir', 63, 30],
]

const placeholder = (id, name, x, y, index) => ({
  id,
  name,
  x,
  y,
  imagePath: `/src/assets/districts/${id}.jpg`,
  image: placeholderImages[index % placeholderImages.length],
  imageStatus: 'placeholder',
  description: `${name} district programmes supporting rural families through locally led development initiatives.`,
  stats: {
    families: 'Replace',
    projects: 'Replace',
    livelihoods: 'Replace',
    health: 'Replace',
  },
})

const districts = Object.fromEntries(names.map(([id, name, x, y], index) => [id, placeholder(id, name, x, y, index)]))

districts.mysuru = {
  ...districts.mysuru,
  imageStatus: 'provided-reference',
  masterAsset: '/Frame 180.png',
  description: '3.2 L families actively engaged across SHGs, agriculture and healthcare programs.',
  stats: {
    families: '3,20,000+',
    projects: '05',
    livelihoods: '320+',
    health: '150+',
  },
}

export const districtList = Object.values(districts)
export default districts
