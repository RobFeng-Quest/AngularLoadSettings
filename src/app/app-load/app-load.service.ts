import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { KeycloakService } from 'keycloak-angular';

import { APP_SETTINGS } from './settings';
import { EnvironmentSpecificService } from '../services/envspecific';

@Injectable()
export class AppLoadService {

  constructor(private httpClient: HttpClient, private keycloak: KeycloakService, private envSpecificSvc: EnvironmentSpecificService) { }

  initializeLogin(): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log(`initializeLogin:: Keycloak start`);

      try {
        this.keycloak.init({
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
        // reject('just reject');
        // resolve();
        console.log(`initializeLogin:: Keycloak end`);
      } catch (error) {
        console.log(`initializeLogin:: Keycloak reject`);
        reject(error);
      }
    });
  }

  initializeApp(): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log(`initializeApp:: inside promise start`);

      setTimeout(() => {
        console.log(`initializeApp:: inside setTimeout`);
        // doing something

        resolve();
      }, 3000);
      console.log(`initializeApp:: inside promise end`);
    });
  }

  getSettings(): Promise<any> {

    // const promise = this.httpClient.get('http://private-1ad25-initializeng.apiary-mock.com/settings')
    //   .toPromise()
    //   .then(settings => {
    //     console.log(`getSettings:: Settings from API: `, settings);

    //     APP_SETTINGS.connectionString = settings[0].value;
    //     APP_SETTINGS.defaultImageUrl = settings[1].value;

    //     console.log(`getSettings:: APP_SETTINGS: `, APP_SETTINGS);

    //     return settings;
    //   });
   
    const promise = this.envSpecificSvc.loadEnvironment()
            .then(es => {
                console.log('EnvironmentSpecificResolver loaded env');
                this.envSpecificSvc.setEnvSpecific(es);
                return this.envSpecificSvc.envSpecific;
            }, error => {
                console.log("EnvironmentSpecificResolver error: " + error);
                return null;
            });

    // const promise2 = new Promise((resolve, reject) => {
    //   console.log(`getSettings:: dummy`);
    //   resolve();
    // });

    return promise;
  }
}
