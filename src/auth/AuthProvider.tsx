import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import type { PropsWithChildren } from 'react';
import { AuthContext } from './AuthContext';

function Auth0Bridge({ children }: PropsWithChildren) {
  const { isAuthenticated, isLoading, loginWithRedirect, logout, getAccessTokenSilently } =
    useAuth0();
  const returnTo = `${window.location.origin}${import.meta.env.BASE_URL}`;

  return (
    <AuthContext.Provider
      value={{
        configured: true,
        isAuthenticated,
        isLoading,
        signIn: () => loginWithRedirect(),
        signOut: () => logout({ logoutParams: { returnTo } }),
        getAccessToken: () => getAccessTokenSilently(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function WrestleMeterAuthProvider({ children }: PropsWithChildren) {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

  if (!domain || !clientId || !audience) {
    return children;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: `${window.location.origin}${import.meta.env.BASE_URL}`,
        audience,
      }}
      cacheLocation="memory"
      useRefreshTokens
      useRefreshTokensFallback
    >
      <Auth0Bridge>{children}</Auth0Bridge>
    </Auth0Provider>
  );
}
