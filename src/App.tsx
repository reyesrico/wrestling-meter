import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Route, Routes, useLocation } from 'react-router'
import { LoginDialog } from './components/LoginDialog'
import { SearchOverlay } from './components/SearchOverlay'
import { SiteFooter } from './components/SiteFooter'
import { SiteHeader } from './components/SiteHeader'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { RosterPage } from './pages/RosterPage'
import { WrestlerPage } from './pages/WrestlerPage'
import './App.css'

function App() {
  const { t } = useTranslation()
  const [searchOpen, setSearchOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [signedIn, setSignedIn] = useState(false)
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])
  useEffect(() => { document.title = t('app.title') }, [t])

  return <>
    <SiteHeader signedIn={signedIn} onSearch={() => setSearchOpen(true)} onSignIn={() => setLoginOpen(true)} onSignOut={() => setSignedIn(false)} />
    {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/roster" element={<RosterPage />} />
      <Route path="/wrestlers/:slug" element={<WrestlerPage signedIn={signedIn} onRequireLogin={() => setLoginOpen(true)} />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    <SiteFooter />
    <LoginDialog open={loginOpen} onClose={() => setLoginOpen(false)} onSignIn={() => { setSignedIn(true); setLoginOpen(false) }} />
  </>
}

export default App