import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService } from '../services/websocket.service';
import { ChatService } from '../services/chat.service';
import { IMessage } from '../interfaces/message.interface';
import { IRoom } from '../interfaces/room.interface';
import { AuthService } from '../services/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  
  room_id: string;

  constructor( public chatService: ChatService,
               public authService: AuthService,
               public wsService: WebsocketService) { }

  ngOnInit() {
    this.chatService.getData();
    this.chatService.currentRoom$.subscribe( (currentRoom: IRoom) => {
      this.room_id = currentRoom._id;
      this.chatService.emitSetUser( currentRoom._id );
    });
  }


}
