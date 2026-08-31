import { useEffect, useState } from 'react';
import { Check, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { castVote, getCurrentVote, type PublicRating } from '../api/client';
import { MaskIcon } from './MaskIcon';

interface VotePanelProps {
  signedIn: boolean;
  wrestlerSlug: string;
  onRequireLogin: () => void;
  getAccessToken: () => Promise<string>;
  onVoteSaved: (rating: PublicRating) => void;
}

export function VotePanel({
  signedIn,
  wrestlerSlug,
  onRequireLogin,
  getAccessToken,
  onVoteSaved,
}: VotePanelProps) {
  const { t } = useTranslation();
  const [vote, setVote] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    if (!signedIn) return;

    void getAccessToken()
      .then((accessToken) => getCurrentVote(wrestlerSlug, accessToken))
      .then((currentVote) => {
        if (active) setVote(currentVote);
      })
      .catch(() => {
        if (active) setError(true);
      });

    return () => {
      active = false;
    };
  }, [getAccessToken, signedIn, wrestlerSlug]);

  const cast = async (score: number) => {
    if (!signedIn) {
      onRequireLogin();
      return;
    }
    if (vote !== null || saving) return;

    setSaving(true);
    setError(false);
    try {
      const accessToken = await getAccessToken();
      const result = await castVote(wrestlerSlug, score, accessToken);
      setVote(score);
      onVoteSaved(result.rating);
    } catch {
      setError(true);
    } finally {
      setSaving(false);
    }
  };
  return (
    <section className="vote-panel">
      <span className="eyebrow">{t('profile.yourCall')}</span>
      <h2>{t(vote ? 'profile.voteLocked' : 'profile.rate')}</h2>
      <div className="vote-scale">
        {[1, 2, 3, 4, 5].map((score) => (
          <button
            key={score}
            className={vote !== null && score <= vote ? 'selected' : ''}
            onClick={() => void cast(score)}
            disabled={vote !== null || saving}
            aria-label={t('profile.masks', { count: score })}
            title={t('profile.maskTitle', { count: score })}
          >
            <MaskIcon filled={vote !== null && score <= vote} />
            <span>{score}</span>
          </button>
        ))}
      </div>
      <p>
        {error ? (
          t('profile.voteError')
        ) : vote ? (
          <>
            <Check size={16} /> {t('profile.voteSaved', { count: vote })}
          </>
        ) : signedIn ? (
          t(saving ? 'profile.voteSaving' : 'profile.choose')
        ) : (
          <>
            <ShieldCheck size={16} /> {t('profile.signInToVote')}
          </>
        )}
      </p>
    </section>
  );
}
