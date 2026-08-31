import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Routes, useLocation } from 'react-router';
import { useAuth } from './auth/AuthContext';
import { LoginDialog } from './components/LoginDialog';
import { SearchOverlay } from './components/SearchOverlay';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { RosterPage } from './pages/RosterPage';
import { WrestlerPage } from './pages/WrestlerPage';
import './App.css';

function App() {
  const { t } = useTranslation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const { configured, isAuthenticated, signIn, signOut, getAccessToken } = useAuth();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  useEffect(() => {
    document.title = t('app.title');
  }, [t]);

  return (
    <>
      <SiteHeader
        signedIn={isAuthenticated}
        onSearch={() => setSearchOpen(true)}
        onSignIn={() => setLoginOpen(true)}
        onSignOut={() => void signOut()}
      />
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/roster" element={<RosterPage />} />
        <Route
          path="/wrestlers/:slug"
          element={
            <WrestlerPage
              signedIn={isAuthenticated}
              onRequireLogin={() => setLoginOpen(true)}
              getAccessToken={getAccessToken}
            />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <SiteFooter />
      <LoginDialog
        open={loginOpen}
        configured={configured}
        onClose={() => setLoginOpen(false)}
        onSignIn={signIn}
      />
    </>
  );
}

export default App;
