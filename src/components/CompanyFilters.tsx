import { useTranslation } from 'react-i18next'
import { companies } from '../data/mock'
import type { CompanyId } from '../data/types'

interface CompanyFiltersProps {
  active: CompanyId | 'all'
  onChange: (id: CompanyId | 'all') => void
}

export function CompanyFilters({ active, onChange }: CompanyFiltersProps) {
  const { t } = useTranslation()

  return <div className="company-filters" aria-label={t('filters.label')}>
    <button className={active === 'all' ? 'active' : ''} onClick={() => onChange('all')}>{t('filters.all')}</button>
    {companies.map((company) => <button key={company.id} className={active === company.id ? 'active' : ''} onClick={() => onChange(company.id)}><span style={{ background: company.accent }} />{company.shortName}</button>)}
  </div>
}