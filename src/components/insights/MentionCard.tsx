import instagramIcon from '/instagram-logo.png'
import redditIcon from '/pinterest-icon.png'
import tiktokIcon from '/music-icon.png'
import incrementIcon from '/increment-icon.png'
import decrementIcon from '/decrement-icon.png'

interface MentionCardProps {
  platform: string
  count: number
  growth: number
  color: string // Tailwind bg color e.g. 'bg-purple-100'
  icon?: React.ReactNode
}

export default function MentionCard({
  platform,
  count,
  growth,
  color,
}: MentionCardProps) {
  const positive = growth >= 0

  // create a variable that map the platform to a selected imported icon...i will fix this later
  const platformIcon = () => {
    switch (platform) {
      case 'TikTok':
        return tiktokIcon
      case 'Reddit':
        return redditIcon
      case 'Instagram':
        return instagramIcon
      default:
        return undefined
    }
  }

  return (
    <div
      className={`rounded-xl p-6 flex flex-col shadow-md border border-[#EEEFF2] ${color}`}
    >
      <div className="flex flex-col gap-2 items-center mb-2 space-x-2">
        <img src={platformIcon()} alt="logo" />
        <span className="text-[#000000] text-[14px]">{`Mentions`}</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-xl font-semibold">{count.toLocaleString()}</div>
        <div
          className={`text-sm ${positive ? 'text-green-600' : 'text-red-600'} flex items-center gap-1`}
        >
          {positive ? '+' : ''}
          {growth.toFixed(2)}%
          <span>
            {positive ? (
              <img src={incrementIcon} alt="increment" />
            ) : (
              <img src={decrementIcon} alt="decrement" />
            )}
          </span>
        </div>
      </div>
    </div>
  )
}
