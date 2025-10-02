export const keycloakConfig = {
  url: 'http://localhost:8081',
  realm: 'academico',
  clientId: 'academico-frontend'
};

export const keycloakInitOptions = {
  onLoad: 'check-sso',
  silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
  pkceMethod: 'S256' as const
};
