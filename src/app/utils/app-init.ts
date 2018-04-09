import { KeycloakService } from 'keycloak-angular';

export function initializer(keycloak: KeycloakService): () => Promise<any> {

  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      console.log(`initializeApp:: Keycloak`);
      try {
        await keycloak.init({
          config: {
            url: 'https://id-qa.quest.com/auth', // .ie: http://localhost:8080/auth/
            realm: 'quest', // .ie: master
            clientId: "spotlight-support-ops-app" // .ie: account
          },
          initOptions: {
            onLoad: 'login-required',
            checkLoginIframe: false
          },
          bearerExcludedUrls: []
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };
}
