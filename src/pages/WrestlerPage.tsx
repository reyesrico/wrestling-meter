import type { CSSProperties } from 'react';
import { ArrowLeft, ExternalLink, Swords, Trophy } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router';
import { HistoryRow } from '../components/HistoryRow';
import { Rating } from '../components/Rating';
import { VotePanel } from '../components/VotePanel';
import { companyById, wrestlers } from '../data/mock';
import { NotFoundPage } from './NotFoundPage';

interface WrestlerPageProps {
  signedIn: boolean;
  onRequireLogin: () => void;
}

const matchMethodKeys: Record<string, string> = {
  Pinfall: 'pinfall',
  'Tag-team pinfall': 'tagTeamPinfall',
  'No contest': 'noContest',
  Submission: 'submission',
};

export function WrestlerPage({ signedIn, onRequireLogin }: WrestlerPageProps) {
  const { t, i18n } = useTranslation();
  const { slug } = useParams();
  const wrestler = wrestlers.find((item) => item.slug === slug);
  if (!wrestler) return <NotFoundPage />;
  const company = companyById[wrestler.companyId];
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
            <div className="profile-stats">
              <div>
                <span>{t('profile.from')}</span>
                <strong>{wrestler.hometown}</strong>
              </div>
              <div>
                <span>{t('profile.height')}</span>
                <strong>{wrestler.billedHeight}</strong>
              </div>
              <div>
                <span>{t('profile.finisher')}</span>
                <strong>{wrestler.signatureMove}</strong>
              </div>
            </div>
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
            <strong>{wrestler.currentRating.average?.toFixed(1) ?? 'NR'}</strong>
            <Rating wrestler={wrestler} />
          </div>
        </div>
      </section>
      <div className="shell profile-content">
        <div className="profile-main">
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
                average={wrestler.currentRating.average}
                votes={wrestler.currentRating.voteCount}
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
          <VotePanel signedIn={signedIn} onRequireLogin={onRequireLogin} />
          <div className="prototype-note">
            <strong>{t('profile.prototype')}</strong>
            <p>{t('profile.prototypeCopy')}</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
