import profileImg from '/profileImg.jpg'
import foxImg from '/fox-newsImg.png'

export interface NewsItem {
  id: number
  author: string
  source: string
  title: string
  date: string
  views: number
  image?: string
  newsImg?: string
}

export const newsFeed: Array<NewsItem> = [
  {
    id: 1,
    author: 'Alfredo Pedula',
    source: 'The Independent',
    title: 'Health risk involving the use of special made skin treatment',
    date: '12th Aug, 2025',
    views: 25,
    image: profileImg,
    newsImg: foxImg,
  },
  {
    id: 2,
    author: 'Jeremy Lynn',
    source: 'Fox News',
    title: 'General new study highlights in water management',
    date: '12th Aug, 2025',
    views: 25,
    image: profileImg,
    newsImg: foxImg,
  },
]
