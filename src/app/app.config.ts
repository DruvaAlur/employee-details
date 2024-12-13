import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgxIndexedDBModule, DBConfig, provideIndexedDb } from 'ngx-indexed-db';
import dbConfig from './indexDB/dbConfig.json'


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync('noop'),provideIndexedDb(dbConfig)]
};
