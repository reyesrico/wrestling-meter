import { useEffect, useState, type CSSProperties } from 'react';
import { ArrowLeft, ExternalLink, Swords, Trophy } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router';
import { getCatalogWrestler, type PublicRating } from '../api/client';
import { HistoryRow } from '../components/HistoryRow';
import { Rating } from '../components/Rating';
import { VotePanel } from '../components/VotePanel';
import { companyById, wrestlers as mockWrestlers } from '../data/mock';
import type { Wrestler } from '../data/types';
import { NotFoundPage } from './NotFoundPage';

interface WrestlerPageProps {
  signedIn: boolean;
  onRequireLogin: () => void;
  getAccessToken: () => Promise<string>;
}

const matchMethodKeys: Record<string, string> = {
  Pinfall: 'pinfall',
  'Tag-team pinfall': 'tagTeamPinfall',
  'No contest': 'noContest',
  Submission: 'submission',
};

export function WrestlerPage({ signedIn, onRequireLogin, getAccessToken }: WrestlerPageProps) {
  const { t, i18n } = useTranslation();
  const { slug } = useParams();
  const mockWrestler = mockWrestlers.find((item) => item.slug === slug) ?? null;
  const [catalogResult, setCatalogResult] = useState<{
    slug: string | undefined;
    wrestler: Wrestler | null;
  }>({ slug, wrestler: mockWrestler });
  const [liveRating, setLiveRating] = useState<{ slug: string; rating: PublicRating } | null>(null);

  useEffect(() => {
    let active = true;
    if (!slug) return;

    void getCatalogWrestler(slug)
      .then((wrestler) => {
        if (active) setCatalogResult({ slug, wrestler });
      })
      .catch(() => {
        if (active) setCatalogResult({ slug, wrestler: mockWrestler });
      });

    return () => {
      active = false;
    };
  }, [mockWrestler, slug]);

  const wrestler = catalogResult.slug === slug ? catalogResult.wrestler : null;
  if (!wrestler) return <NotFoundPage />;
  const company = companyById[wrestler.companyId];
  const currentRating =
    liveRating && liveRating.slug === slug ? liveRating.rating : wrestler.currentRating;
  const ratedWrestler = {
    ...wrestler,
    currentRating: { ...wrestler.currentRating, ...currentRating },
  };
  return (
    <main className="profile-page">
      <section className="profile-hero">
        <div className="shell profile-hero__inner">
          <Link className="back-link" to="/roster">
            <ArrowLeft size={17} /> {t('profile.back')}
          </Link>
          <div className="profile-hero__image">
            <div className="profile-hero__number">{wrestler.name.charAt(0)}</div>
            <img src={wrestler.imageUrl} alt={wrestler.name} />
          </div>
          <div className="profile-hero__copy">
            <span
              className="company-tag company-tag--static"
              style={{ '--company': company.accent } as CSSProperties}
            >
              {company.shortName}
            </span>
            <span className="eyebrow">{wrestler.nickname}</span>
            <h1>{wrestler.name}</h1>
            <p>{t(`wrestlers.${wrestler.slug}.bio`, { defaultValue: wrestler.bio })}</p>
            {(wrestler.hometown || wrestler.billedHeight || wrestler.signatureMove) && (
              <div className="profile-stats">
                {wrestler.hometown && (
                  <div>
                    <span>{t('profile.from')}</span>
                    <strong>{wrestler.hometown}</strong>
                  </div>
                )}
                {wrestler.billedHeight && (
                  <div>
                    <span>{t('profile.height')}</span>
                    <strong>{wrestler.billedHeight}</strong>
                  </div>
                )}
                {wrestler.signatureMove && (
                  <div>
                    <span>{t('profile.finisher')}</span>
                    <strong>{wrestler.signatureMove}</strong>
                  </div>
                )}
              </div>
            )}
            <a
              className="source-link"
              href={wrestler.profileSourceUrl}
              target="_blank"
              rel="noreferrer"
            >
              {t('profile.profileSource')} <ExternalLink size={14} />
            </a>
          </div>
          <div className="profile-meter">
            <span>{t('profile.fanMeter', { season: 2026 })}</span>
            <strong>{currentRating.average?.toFixed(1) ?? 'NR'}</strong>
            <Rating wrestler={ratedWrestler} />
          </div>
        </div>
      </section>
      <div className="shell profile-content">
        <div className="profile-main">
          {wrestler.lastMatch.verified !== false && (
            <section className="content-block">
              <div className="block-title">
                <Swords />
                <div>
                  <span className="eyebrow">{t('profile.latestBell')}</span>
                  <h2>{t('profile.lastResult')}</h2>
                </div>
              </div>
              <div className="match-row">
                <div className={`match-outcome match-outcome--${wrestler.lastMatch.outcome}`}>
                  {t(`profile.outcomes.${wrestler.lastMatch.outcome}`)}
                </div>
                <div>
                  <strong>
                    {wrestler.name} <span>{t('profile.versus')}</span> {wrestler.lastMatch.opponent}
                  </strong>
                  <p>
                    {wrestler.lastMatch.event} ·{' '}
                    {new Date(wrestler.lastMatch.date).toLocaleDateString(i18n.resolvedLanguage, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}{' '}
                    ·{' '}
                    {t(`profile.methods.${matchMethodKeys[wrestler.lastMatch.method]}`, {
                      defaultValue: wrestler.lastMatch.method,
                    })}
                  </p>
                </div>
                <a
                  href={wrestler.lastMatch.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t('profile.resultSource')}
                >
                  <ExternalLink size={18} />
                </a>
              </div>
            </section>
          )}
          <section className="content-block">
            <div className="block-title">
              <Trophy />
              <div>
                <span className="eyebrow">{t('profile.frozen')}</span>
                <h2>{t('profile.history')}</h2>
              </div>
            </div>
            <div className="history-list">
              <HistoryRow
                season={2026}
                average={currentRating.average}
                votes={currentRating.voteCount}
                current
              />
              {wrestler.ratingHistory.map((item) => (
                <HistoryRow
                  key={item.season}
                  season={item.season}
                  average={item.average}
                  votes={item.voteCount}
                />
              ))}
            </div>
          </section>
        </div>
        <aside>
          <VotePanel
            signedIn={signedIn}
            wrestlerSlug={wrestler.slug}
            onRequireLogin={onRequireLogin}
            getAccessToken={getAccessToken}
            onVoteSaved={(rating) => setLiveRating({ slug: wrestler.slug, rating })}
          />
          <div className="prototype-note">
            <strong>{t('profile.prototype')}</strong>
            <p>{t('profile.prototypeCopy')}</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
