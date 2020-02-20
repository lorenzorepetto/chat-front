import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { HttpClient } from '@angular/common/http';
import { IMessageSend } from '../interfaces/message.interface';
import { IUserSocket } from '../interfaces/user.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducers';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {


  constructor( public wsService: WebsocketService,
               private store: Store<AppState>,
               private http: HttpClient ) { }
    

  //===============================================
  //                  ROOMS
  //===============================================
  
  // API
  getCurrentRoom( room_id?: string) {
    if (room_id) {
      return this.http.get(`${environment.API_URL}/room/${ room_id }`)
    }
    return this.http.get(`${environment.API_URL}/data`);
  }

  getAllMessages( room_id: string ) {
    return this.http.get(`${environment.API_URL}/room/${ room_id }/all`);
  }

  getRooms() {
    return this.http.get(`${environment.API_URL}/room`);    
  }
  
  newRoom( room: { name: string, email: string, description?: string }) {
    return this.http.post(`${environment.API_URL}/room`, room )
  }
  
  deleteRoom( room_id: string ) {
    return this.http.delete(`${environment.API_URL}/room/${ room_id }`)
  }

  // SOCKET
  emitSetRoom( room_id: string) {
    return this.wsService.emit('change-room', { room_id } )
  }

  listenToRooms() {
    return this.wsService.listen('update-rooms');
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
