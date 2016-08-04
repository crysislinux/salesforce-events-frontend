import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { Location } from '@angular/common';
import { AppComponent, environment, appRouterProviders } from './app/';
import { TransformService, NavigateService } from './app/shared';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  disableDeprecatedForms(),
  provideForms(),
  appRouterProviders,
  HTTP_PROVIDERS,
  Location,
  TransformService,
  NavigateService,
]);
