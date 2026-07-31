import { useState } from 'react'
import { LogIn, Menu, Search, UserRound } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router'
import { companies } from '../data/mock'
import { LanguageSwitcher } from './LanguageSwitcher'
import { MaskIcon } from './MaskIcon'

interface SiteHeaderProps { signedIn: boolean; onSearch: () => void; onSignIn: () => void; onSignOut: () => void }

export function SiteHeader({ signedIn, onSearch, onSignIn, onSignOut }: SiteHeaderProps) {
  const { t } = useTranslation()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const activeCompany = location.pathname === '/roster' ? new URLSearchParams(location.search).get('company') : null
  const rosterActive = location.pathname === '/roster' && !companies.some((company) => company.id === activeCompany)

  return <header className="site-header"><Link className="brand" to="/"><span className="brand__mask"><MaskIcon /></span><span>WRESTLE<br /><b>METER</b></span></Link><nav className={menuOpen ? 'open' : ''} aria-label="Main navigation" onClick={() => setMenuOpen(false)}><Link className={location.pathname === '/' ? 'active' : ''} to="/">{t('header.home')}</Link><Link className={rosterActive ? 'active' : ''} to="/roster">{t('header.roster')}</Link>{companies.map((company) => <Link key={company.id} className={activeCompany === company.id ? 'active' : ''} to={`/roster?company=${company.id}`}>{company.shortName}</Link>)}</nav><div className="header-actions"><LanguageSwitcher /><button className="icon-button" onClick={onSearch} aria-label={t('header.search')}><Search /></button><button className="login-button" onClick={signedIn ? onSignOut : onSignIn}>{signedIn ? <><UserRound size={17} /><span>{t('header.account')}</span></> : <><LogIn size={17} /><span>{t('header.signIn')}</span></>}</button><button className="icon-button menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label={t('header.toggleMenu')}><Menu /></button></div></header>
}