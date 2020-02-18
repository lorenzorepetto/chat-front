import { Injectable, EventEmitter } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { HttpClient } from '@angular/common/http';
import { IRoom } from '../interfaces/room.interface';
import { IMessage, IMessageSend } from '../interfaces/message.interface';
import { AuthService } from './auth.service';
import { IUserSocket, IUser } from '../interfaces/user.interface';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducers';

import * as fromCurrentRoom from "../store/actions";


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  
  messages$ = new EventEmitter<IMessage[]>();
  rooms$ = new EventEmitter<IRoom[]>();
  currentRoom$ = new EventEmitter<IRoom>();
  
  userLogged: IUser;

  subscription: Subscription = new Subscription();


  constructor( public wsService: WebsocketService,
               private store: Store<AppState>,
               public authService: AuthService,
               private http: HttpClient ) { }
    
  ngOnInit() {
  }
  
  getData() {
    
  
    this.subscription = this.http.get(`http://localhost:5000/data`)
              .subscribe( (data: any) => {

                this.messages$.emit(data.messages);
                this.rooms$.emit(data.rooms);
                this.currentRoom$.emit(data.currentRoom);
              });
  }


  getCurrentRoom() {
    return this.http.get(`http://localhost:5000/data`);
  }


  //===============================================
  //                  MESSAGES
  //===============================================
  getMessages() {
    return this.wsService.listen('update-messages')
  }
  
  sendMessage( message: IMessageSend ) {
    this.wsService.emit('message', message);
  }

  
  deleteMessage(message_id: string, room_id: string) {
    this.wsService.emit('delete-message', {message_id, room_id})
  }

  //===============================================
  //                  USERS
  //===============================================
  getActiveUsers() {
    return this.wsService.listen('active-users');
  }

  emitActiveUsers( room_id: string ) {
    this.wsService.emit('get-users', { room_id });
  }
  
  emitSetUser( room_id: string ) {
    this.store.select('user')
      .subscribe( user => {
        const userSocket: IUserSocket = {
          email: user.user.email,
          name: user.user.name,
          picture: user.user.picture,
          room_id
        }
        this.wsService.emit('set-user', userSocket);
      })
  }
  
  emitSetStatus( status: string, room_id: string ) {
    this.wsService.emit('set-status', { status, room_id });
  }



}
