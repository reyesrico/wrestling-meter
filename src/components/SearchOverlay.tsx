import { useState } from 'react';
import { ChevronRight, Search, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { companyById, wrestlers } from '../data/mock';

interface SearchOverlayProps {
  onClose: () => void;
}

export function SearchOverlay({ onClose }: SearchOverlayProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const matches = query.trim()
    ? wrestlers
        .filter((wrestler) =>
          `${wrestler.name} ${wrestler.nickname} ${companyById[wrestler.companyId].shortName}`
            .toLowerCase()
            .includes(query.toLowerCase()),
        )
        .slice(0, 6)
    : [];
  const selectWrestler = (slug: string) => {
    navigate(`/wrestlers/${slug}`);
    onClose();
  };
  return (
    <div className="search-overlay">
      <div className="search-box">
        <Search />
        <input
          autoFocus
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t('search.placeholder')}
          aria-label={t('search.placeholder')}
        />
        <button className="icon-button" onClick={onClose} aria-label={t('search.close')}>
          <X />
        </button>
      </div>
      {query && (
        <div className="search-results">
          {matches.length ? (
            matches.map((wrestler) => (
              <button key={wrestler.id} onClick={() => selectWrestler(wrestler.slug)}>
                <img src={wrestler.imageUrl} alt="" />
                <span>
                  <strong>{wrestler.name}</strong>
                  <small>
                    {companyById[wrestler.companyId].shortName} · {wrestler.nickname}
                  </small>
                </span>
                <ChevronRight />
              </button>
            ))
          ) : (
            <p>{t('search.empty')}</p>
          )}
        </div>
      )}
    </div>
  );
}
