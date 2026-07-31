import { useState } from 'react'
import { Check, ShieldCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { MaskIcon } from './MaskIcon'

interface VotePanelProps { signedIn: boolean; onRequireLogin: () => void }

export function VotePanel({ signedIn, onRequireLogin }: VotePanelProps) {
  const { t } = useTranslation()
  const [vote, setVote] = useState<number | null>(null)
  const cast = (score: number) => { if (!signedIn) onRequireLogin(); else if (vote === null) setVote(score) }
  return <section className="vote-panel"><span className="eyebrow">{t('profile.yourCall')}</span><h2>{t(vote ? 'profile.voteLocked' : 'profile.rate')}</h2><div className="vote-scale">{[1, 2, 3, 4, 5].map((score) => <button key={score} className={vote !== null && score <= vote ? 'selected' : ''} onClick={() => cast(score)} disabled={vote !== null} aria-label={t('profile.masks', { count: score })} title={t('profile.maskTitle', { count: score })}><MaskIcon filled={vote !== null && score <= vote} /><span>{score}</span></button>)}</div><p>{vote ? <><Check size={16} /> {t('profile.voteSaved', { count: vote })}</> : signedIn ? t('profile.choose') : <><ShieldCheck size={16} /> {t('profile.signInToVote')}</>}</p></section>
}