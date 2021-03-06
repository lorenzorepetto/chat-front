import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from '../shared/shared.module';

import { AutofocusDirective } from './directives/autofocus.directive';

import { LeftPanelComponent } from './left-panel/left-panel.component';
import { RightPanelComponent } from './right-panel/right-panel.component';
import { ChatComponent } from './chat.component';

// Services
import { ChatService } from '../services/chat.service';
import { WebsocketService } from '../services/websocket.service';



@NgModule({
  declarations: [
    ChatComponent,
    LeftPanelComponent,
    RightPanelComponent,
    AutofocusDirective
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    ChatService,
    WebsocketService
  ]
})
export class ChatModule { }
