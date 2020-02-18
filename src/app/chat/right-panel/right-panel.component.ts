import { Component, OnInit, Input } from '@angular/core';
import { IMessage, IMessageSend } from '../../interfaces/message.interface';
import { IRoom } from '../../interfaces/room.interface';
import { ChatService } from '../../services/chat.service';
import { AuthService } from '../../services/auth.service';
import { filter } from 'rxjs/operators';
import { IUser, validStates } from '../../interfaces/user.interface';
import Swal from 'sweetalert2'
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.css']
})
export class RightPanelComponent implements OnInit {
  
  text: string = '';
  
  // User
  user: IUser = null;
  loadedUser: boolean;
  errorUser: any;
  
  // Room
  room: IRoom = null;
  messages: IMessage[];
  loadedRoom: boolean;
  errorRoom: any; 

  constructor( public chatService: ChatService,
               public authService: AuthService,
               private store: Store<AppState> ) { }

  ngOnInit() {  
    this.initCurrentRoomSubs();    
    this.initUserSub();
  }
  

  //===============================================
  //                  MESSAGES
  //===============================================
  send() {
    if (this.text.trim().length === 0) {
      return;
    }
    const message: IMessageSend = {
      text: this.text,
      user: this.user,
      room: this.room._id
    }
    this.chatService.sendMessage(message);
    this.text = '';
  }

  remove(message) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No se podrán revertir los cambios",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#745AF2',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        if (this.room) {
          this.chatService.deleteMessage(message._id, this.room._id);
        }
      }
    })
  }


  //===============================================
  //                  STATUS
  //===============================================
  changeStatus( status: validStates ) {
    if (this.room) {
      this.user.status = status;
      this.chatService.emitSetStatus(status, this.room._id);
    }
  }



  //===============================================
  //                  PRIVATE SUBS
  //===============================================
  private initCurrentRoomSubs() {
    this.store.select('currentRoom')
      .subscribe( currentRoom => {
        this.room = currentRoom.room;
        this.loadedRoom = currentRoom.loaded;
        this.messages = currentRoom.messages;
        this.errorRoom = currentRoom.error; 
      });
  }

  private initUserSub() {
    this.store.select('user')
      .subscribe( user => {
        this.loadedUser = user.loaded;
        this.user = user.user;
        this.errorUser = user.error;
      }) 
  }

}
