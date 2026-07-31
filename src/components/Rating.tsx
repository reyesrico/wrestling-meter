import { useTranslation } from 'react-i18next'
import type { Wrestler } from '../data/types'
import { MaskIcon } from './MaskIcon'

interface RatingProps {
  wrestler: Wrestler
  compact?: boolean
}

export function Rating({ wrestler, compact = false }: RatingProps) {
  const { t } = useTranslation()
  const { average, voteCount, minimumVotes } = wrestler.currentRating

  return <div className={`rating ${compact ? 'rating--compact' : ''}`} aria-label={average ? t('profile.masks', { count: average }) : t('rating.waiting', { count: minimumVotes })}>
    <div className="rating__masks">{[1, 2, 3, 4, 5].map((score) => <MaskIcon key={score} filled={average !== null && score <= Math.round(average)} />)}</div>
    <strong>{average?.toFixed(1) ?? 'NR'}</strong>
    <span>{voteCount < minimumVotes ? t('rating.more', { count: minimumVotes - voteCount }) : t('rating.fanVotes', { count: voteCount })}</span>
  </div>
}