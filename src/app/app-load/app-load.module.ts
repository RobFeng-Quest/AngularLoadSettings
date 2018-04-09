import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HttpClient } from "@angular/common/http";

import { AppLoadService } from './app-load.service';
import { EnvironmentSpecificService } from '../services/envspecific';

export function init_app(appLoadService: AppLoadService) {
    // return () => appLoadService.initializeApp();
    return () => appLoadService.initializeApp();
}

export function init_login(appLoadService: AppLoadService) {
  return () => appLoadService.initializeLogin();
}

export function get_settings(appLoadService: AppLoadService) {
    return () => appLoadService.getSettings();
}

@NgModule({
  imports: [HttpClientModule],
  providers: [
    AppLoadService,
    EnvironmentSpecificService,
    { provide: APP_INITIALIZER, useFactory: init_app, deps: [AppLoadService, HttpClient, EnvironmentSpecificService], multi: true },
    { provide: APP_INITIALIZER, useFactory: get_settings, deps: [AppLoadService, HttpClient, EnvironmentSpecificService], multi: true },
    { provide: APP_INITIALIZER, useFactory: init_login, deps: [AppLoadService, HttpClient, EnvironmentSpecificService], multi: true }
  ]
})
export class AppLoadModule { }
