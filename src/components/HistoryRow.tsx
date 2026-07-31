import { useTranslation } from 'react-i18next';
import { MaskIcon } from './MaskIcon';

interface HistoryRowProps {
  season: number;
  average: number | null;
  votes: number;
  current?: boolean;
}

export function HistoryRow({ season, average, votes, current = false }: HistoryRowProps) {
  const { t } = useTranslation();
  return (
    <div className={`history-row ${current ? 'history-row--current' : ''}`}>
      <div>
        <span>{season}</span>
        <small>{t(current ? 'profile.openSeason' : 'profile.closedSeason')}</small>
      </div>
      <strong>{average?.toFixed(1) ?? 'NR'}</strong>
      <div className="mini-masks">
        {[1, 2, 3, 4, 5].map((score) => (
          <MaskIcon key={score} filled={average !== null && score <= Math.round(average)} />
        ))}
      </div>
      <span>{t('profile.votes', { count: votes })}</span>
    </div>
  );
}
