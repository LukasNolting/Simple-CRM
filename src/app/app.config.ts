import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatNativeDateModule } from '@angular/material/core';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    importProvidersFrom(MatNativeDateModule),
    provideHttpClient(),
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: 'AIzaSyAsrmdrMFuwrSuleIfx9fvDyF_4mYu-yYA',
        authDomain: 'simple-crm-f4e64.firebaseapp.com',
        projectId: 'simple-crm-f4e64',
        storageBucket: 'simple-crm-f4e64.appspot.com',
        messagingSenderId: '383635188953',
        appId: '1:383635188953:web:73a0fd19d2173d6d7c62c8',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
};
