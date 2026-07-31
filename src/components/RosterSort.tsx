import { ArrowUpDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { rosterSorts, type RosterSortValue } from './rosterSortOptions';

interface RosterSortProps {
  value: RosterSortValue;
  onChange: (value: RosterSortValue) => void;
}

export function RosterSort({ value, onChange }: RosterSortProps) {
  const { t } = useTranslation();

  return (
    <label className="roster-sort">
      <ArrowUpDown aria-hidden="true" />
      <span>{t('roster.sort.label')}</span>
      <select value={value} onChange={(event) => onChange(event.target.value as RosterSortValue)}>
        {rosterSorts.map((sort) => (
          <option key={sort} value={sort}>
            {t(`roster.sort.${sort}`)}
          </option>
        ))}
      </select>
    </label>
  );
}
