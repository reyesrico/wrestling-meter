import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router'
import { CompanyFilters } from '../components/CompanyFilters'
import { RosterSort } from '../components/RosterSort'
import { rosterSorts, type RosterSortValue } from '../components/rosterSortOptions'
import { WrestlerCard } from '../components/WrestlerCard'
import { companies, wrestlers } from '../data/mock'
import type { CompanyId } from '../data/types'

export function RosterPage() {
  const { t, i18n } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const requested = searchParams.get('company') as CompanyId | null
  const requestedSort = searchParams.get('sort') as RosterSortValue | null
  const active: CompanyId | 'all' = companies.some((company) => company.id === requested) ? requested! : 'all'
  const sort = rosterSorts.includes(requestedSort as RosterSortValue) ? requestedSort! : 'meter-desc'
  const collator = new Intl.Collator(i18n.resolvedLanguage, { sensitivity: 'base' })
  const visible = (active === 'all' ? wrestlers : wrestlers.filter((wrestler) => wrestler.companyId === active)).toSorted((first, second) => {
    if (sort.startsWith('name')) return collator.compare(first.name, second.name) * (sort === 'name-asc' ? 1 : -1)
    const firstRating = first.currentRating.average
    const secondRating = second.currentRating.average
    if (firstRating === null) return secondRating === null ? collator.compare(first.name, second.name) : 1
    if (secondRating === null) return -1
    return (firstRating - secondRating) * (sort === 'meter-asc' ? 1 : -1) || collator.compare(first.name, second.name)
  })
  const updateParam = (key: 'company' | 'sort', value: string | null) => {
    const next = new URLSearchParams(searchParams)
    if (value === null) next.delete(key); else next.set(key, value)
    setSearchParams(next)
  }
  const changeCompany = (companyId: CompanyId | 'all') => updateParam('company', companyId === 'all' ? null : companyId)
  const changeSort = (nextSort: RosterSortValue) => updateParam('sort', nextSort === 'meter-desc' ? null : nextSort)

  return <main className="page shell"><div className="page-heading"><span className="eyebrow">{t('roster.promotions')}</span><h1>{t('roster.title')}</h1><p>{t('roster.intro')}</p></div><div className="roster-controls"><CompanyFilters active={active} onChange={changeCompany} /><RosterSort value={sort} onChange={changeSort} /></div><div className="roster-count">{t('roster.count', { count: visible.length })}</div><div className="card-grid card-grid--roster">{visible.map((wrestler, index) => <WrestlerCard key={wrestler.id} wrestler={wrestler} index={index} />)}</div></main>
}