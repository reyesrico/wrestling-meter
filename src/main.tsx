import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router';
import { WrestleMeterAuthProvider } from './auth/AuthProvider.tsx';
import './index.css';
import './i18n';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WrestleMeterAuthProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </WrestleMeterAuthProvider>
  </StrictMode>,
);
