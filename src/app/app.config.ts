import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
              provideClientHydration(), 
              provideAnimationsAsync(), 
              provideHttpClient(withFetch()),
              ConfirmationService,
              MessageService,
              
            ]
};
