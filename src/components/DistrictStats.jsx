import { Heart, Home, Users } from 'lucide-react'

const statItems = [
  ['families', Users, 'Families Supported'],
  ['projects', Home, 'Projects'],
  ['livelihoods', Heart, 'Livelihood Programs'],
  ['health', Heart, 'Health Initiatives'],
]

export default function DistrictStats({ stats }) {
  return (
    <ul>
      {statItems.map(([key, Icon, label]) => (
        <li key={key}>
          <Icon size={16} />
          <span>{label}</span>
          <strong>{stats[key]}</strong>
        </li>
      ))}
    </ul>
  )
}
