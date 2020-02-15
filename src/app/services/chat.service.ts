import { Injectable, EventEmitter } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { HttpClient } from '@angular/common/http';
import { IRoom } from '../interfaces/room.interface';
import { IMessage, IMessageSend } from '../interfaces/message.interface';
import { AuthService } from './auth.service';
import { IUserSocket, IUser } from '../interfaces/user.interface';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  
  messages$ = new EventEmitter<IMessage[]>();
  rooms$ = new EventEmitter<IRoom[]>();
  currentRoom$ = new EventEmitter<IRoom>();
  

  subscription: Subscription = new Subscription();


  constructor( public wsService: WebsocketService,
               public authService: AuthService,
               private http: HttpClient ) { }
    
  ngOnInit() {}
  
  getData() {
    this.subscription = this.http.get(`http://localhost:5000/data`)
              .subscribe( (data: any) => {
                this.messages$.emit(data.messages);
                this.rooms$.emit(data.rooms);
                this.currentRoom$.emit(data.currentRoom);
              });
  }

  //===============================================
  //                  MESSAGES
  //===============================================
  sendMessage( message: IMessageSend ) {
    this.wsService.emit('message', message);
  }

  getMessages() {
    return this.wsService.listen('new-message')
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
    this.authService.getUser$().pipe(
      filter( user => user !== null)
    ).subscribe( user => {
      const userSocket: IUserSocket = {
        name: user.name,
        picture: user.picture,
        room_id
      }
      this.wsService.emit('set-user', userSocket);
    })
  }




}
