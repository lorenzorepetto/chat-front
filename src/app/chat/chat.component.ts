import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../services/websocket.service';
import { ChatService } from '../services/chat.service';
import { IUser } from '../interfaces/user.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducers';


// Redux
import * as fromActions from "../store/actions";
import { filter } from 'rxjs/operators';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  
  room_id: string;
  user: IUser;

  constructor( public chatService: ChatService,
               public wsService: WebsocketService,
               private store: Store<AppState>) { }

  ngOnInit() {
    
    this.store.dispatch( new fromActions.LoadUserAction() );
    this.store.dispatch( new fromActions.LoadRoomAction() );
    this.store.dispatch( new fromActions.ListenToMessagesAction());
  
    this.store.select('currentRoom').pipe(
      filter( currentRoom => currentRoom.room !== null)
    ).subscribe( currentRoom => this.chatService.emitSetUser( currentRoom.room._id ))

  }

  

}
