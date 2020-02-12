import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus: boolean = false;
  


  constructor( private socket: Socket ) { 
    this.checkStatus();
  }
  

  //===============================================
  //                  STATUS
  //===============================================
  checkStatus() {
    this.socket.on('connect', () => {
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      this.socketStatus = false;
    })
  }

  //===============================================
  //              SOCKET - EMIT & LISTEN
  //===============================================
  emit( event: string, payload?: any, callback?: Function ) {
    this.socket.emit(event, payload, callback);
  }

  listen( event: string ) {
    return this.socket.fromEvent( event );
  }



}
