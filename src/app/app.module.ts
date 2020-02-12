import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from "@angular/forms";

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { HttpClientModule } from "@angular/common/http";

const config: SocketIoConfig = { url: 'http://localhost:5000', options: {} };


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LeftPanelComponent } from './chat/left-panel/left-panel.component';
import { RightPanelComponent } from './chat/right-panel/right-panel.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './auth/login/login.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LeftPanelComponent,
    RightPanelComponent,
    FooterComponent,
    LoginComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
