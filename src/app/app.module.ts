import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// MODULES
import { SharedModule } from './shared/shared.module';
import { ChatModule } from './chat/chat.module';
import { AppRoutingModule } from './app-routing.module';

// REDUX
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { APP_REDUCERS } from './store/app.reducers';
import { effectsArray } from './store/effects/index';
import { environment } from 'src/environments/environment';

// SOCKETS
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: 'http://localhost:5000', options: {} };

// COMPONENTS
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ChatModule,
    SocketIoModule.forRoot(config),
    StoreModule.forRoot(APP_REDUCERS),
    EffectsModule.forRoot(effectsArray),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
