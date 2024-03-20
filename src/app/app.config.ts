import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"simple-crm-small","appId":"1:189826706282:web:b0904afc654df0b3fe9313","storageBucket":"simple-crm-small.appspot.com","apiKey":"AIzaSyD_IPcBfuqN16l3rdb_DMt-vg66pgVyZDE","authDomain":"simple-crm-small.firebaseapp.com","messagingSenderId":"189826706282"}))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
