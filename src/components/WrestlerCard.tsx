import type { CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { companyById } from '../data/mock'
import type { Wrestler } from '../data/types'
import { Rating } from './Rating'

interface WrestlerCardProps {
  wrestler: Wrestler
  index?: number
}

export function WrestlerCard({ wrestler, index = 0 }: WrestlerCardProps) {
  const { t } = useTranslation()
  const company = companyById[wrestler.companyId]

  return <Link className="wrestler-card" style={{ '--delay': `${index * 55}ms` } as CSSProperties} to={`/wrestlers/${wrestler.slug}`}>
    <div className="wrestler-card__image"><img src={wrestler.imageUrl} alt={wrestler.name} loading="lazy" /><span className="company-tag" style={{ '--company': company.accent } as CSSProperties}>{company.shortName}</span></div>
    <div className="wrestler-card__body"><span className="eyebrow">{wrestler.nickname}</span><h3>{wrestler.name}</h3><Rating wrestler={wrestler} compact />
      <div className="last-result"><span className={`result result--${wrestler.lastMatch.outcome}`}>{wrestler.lastMatch.outcome[0].toUpperCase()}</span><span>{t('profile.versus')} {wrestler.lastMatch.opponent}</span></div>
    </div>
  </Link>
}