import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// MODULES
import { SharedModule } from './shared/shared.module';
import { ChatModule } from './chat/chat.module';
import { AppRoutingModule } from './app-routing.module';


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
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
