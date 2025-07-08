import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HttpHandler, HttpRequest, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { authInterceptor } from './interceptors/auth.interceptor';
import { inject } from '@angular/core';
// import { authInterceptor } from './app/services/auth.interceptor';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { importProvidersFrom } from '@angular/core';


const config: SocketIoConfig = {
  url: 'wss://cricket.premiumsoccer.in',
  options: {
    transports: ['websocket']
  }
};
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
      // withInterceptorsFromDi()
        // withInterceptors([() => new AuthInterceptor()])
      //  withInterceptors([
      //   (req, next) => new AuthInterceptor().intercept(req, next)
      // ])
       withInterceptors([authInterceptor],

       )
    ),
        importProvidersFrom(SocketIoModule.forRoot(config)) // 👈 REGISTER HERE
,
    provideRouter(routes)
  ]
}).catch((err) => console.error(err));
