import { useState } from 'react';
import { ArrowRight, CalendarDays, ChevronRight, Trophy } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { CompanyFilters } from '../components/CompanyFilters';
import { MaskIcon } from '../components/MaskIcon';
import { WrestlerCard } from '../components/WrestlerCard';
import { wrestlers } from '../data/mock';
import type { CompanyId } from '../data/types';

export function HomePage() {
  const { t } = useTranslation();
  const [activeCompany, setActiveCompany] = useState<CompanyId | 'all'>('all');
  const featured = wrestlers.filter((wrestler) => wrestler.featured);
  const leaders = [...wrestlers]
    .filter((wrestler) => wrestler.currentRating.average !== null)
    .sort((a, b) => (b.currentRating.average ?? 0) - (a.currentRating.average ?? 0))
    .slice(0, 4);
  const fanLeader = leaders[0] ?? featured[0];
  const visible =
    activeCompany === 'all'
      ? featured
      : wrestlers.filter((wrestler) => wrestler.companyId === activeCompany);
  return (
    <main>
      <section className="hero-section">
        <div className="hero-section__media">
          <img src={fanLeader.imageUrl} alt={fanLeader.name} />
          <div className="hero-section__halftone" />
        </div>
        <div className="hero-section__content shell">
          <div>
            <span className="live-pill">
              <span /> {t('home.meterLive', { season: 2026 })}
            </span>
            <h1>
              {t('home.titleLineOne')}
              <br />
              {t('home.titleLineTwo')}
            </h1>
            <p>{t('home.intro')}</p>
            <Link className="button button--primary" to="/roster">
              {t('home.explore')} <ArrowRight size={18} />
            </Link>
          </div>
          <div className="hero-score">
            <span>{t('home.fanLeader')}</span>
            <strong>{fanLeader.currentRating.average?.toFixed(1) ?? 'NR'}</strong>
            <div>
              {[1, 2, 3, 4, 5].map((score) => (
                <MaskIcon
                  key={score}
                  filled={
                    fanLeader.currentRating.average !== null &&
                    score <= Math.round(fanLeader.currentRating.average)
                  }
                />
              ))}
            </div>
            <Link to={`/wrestlers/${fanLeader.slug}`}>
              {fanLeader.name} <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      <section className="ticker" aria-label={t('home.topCard')}>
        <div className="ticker__label">
          <Trophy size={17} /> {t('home.topCard')}
        </div>
        <div className="ticker__items">
          {leaders.map((wrestler, index) => (
            <Link key={wrestler.id} to={`/wrestlers/${wrestler.slug}`}>
              <b>0{index + 1}</b> {wrestler.name}
              <strong>{wrestler.currentRating.average?.toFixed(1)}</strong>
            </Link>
          ))}
        </div>
      </section>
      <section className="roster-section shell">
        <div className="section-heading">
          <div>
            <span className="eyebrow">{t('home.acrossPromotions')}</span>
            <h2>{t('home.favorites')}</h2>
          </div>
          <Link to="/roster">
            {t('home.viewRoster')} <ArrowRight size={17} />
          </Link>
        </div>
        <CompanyFilters active={activeCompany} onChange={setActiveCompany} />
        <div className="card-grid">
          {visible.map((wrestler, index) => (
            <WrestlerCard key={wrestler.id} wrestler={wrestler} index={index} />
          ))}
        </div>
      </section>
      <section className="season-band">
        <div className="shell season-band__inner">
          <div className="season-year">2026</div>
          <div>
            <span className="eyebrow">{t('home.annualBell')}</span>
            <h2>{t('home.seasonTitle')}</h2>
            <p>{t('home.seasonCopy')}</p>
          </div>
          <div className="season-date">
            <CalendarDays />
            <span>{t('home.nextClose')}</span>
            <strong>{t('home.wrestleMania')}</strong>
            <small>{t('home.datePending')}</small>
          </div>
        </div>
      </section>
    </main>
  );
}
