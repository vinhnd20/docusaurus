import { UserManager, UserManagerSettings } from 'oidc-client-ts';

const keycloakConfig: UserManagerSettings = {
  authority: 'http://localhost:8080/realms/my-realm',
  client_id: 'docusaurus',
  redirect_uri: 'http://localhost:3000/callback',
  response_type: 'code',
  scope: 'openid profile email',
  automaticSilentRenew: true,
  silent_redirect_uri: 'http://localhost:3000/silent-renew.html',
  metadataUrl: 'http://localhost:8080/realms/my-realm/.well-known/openid-configuration',
  client_secret: 'UqOpUfcfwehG6DhjDAZEZBzLhEdiCFYk', // Thay bằng secret từ Keycloak
};

const userManager = new UserManager(keycloakConfig);

userManager.getUser().catch(err => console.error('Error initializing user:', err));

export const login = () => {
  console.log('Initiating Keycloak login');
  return userManager.signinRedirect();
};
export const logout = () => userManager.signoutRedirect();
export const getUser = () => userManager.getUser();
export const handleCallback = () => userManager.signinRedirectCallback();
export default userManager;