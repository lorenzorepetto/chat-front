import { Component, OnInit, Input } from '@angular/core';
import { IMessage, IMessageSend } from '../../interfaces/message.interface';
import { IRoom } from '../../interfaces/room.interface';
import { ChatService } from '../../services/chat.service';
import { AuthService } from '../../services/auth.service';
import { filter } from 'rxjs/operators';
import { IUser, validStates } from '../../interfaces/user.interface';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.css']
})
export class RightPanelComponent implements OnInit {
  
  text: string = '';
  user: IUser = null;
  room: IRoom = null;
  messages: IMessage[] = null;

  constructor( public chatService: ChatService,
               public authService: AuthService ) { }

  ngOnInit() {
    
    this.initMessagesSubs();
    
    this.initUserSub();

    this.chatService.currentRoom$.subscribe( room => this.room = room);
  }

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

  changeStatus( status: validStates ) {
    if (this.room) {
      this.user.status = status;
      this.chatService.emitSetStatus(status, this.room._id);
    }
  }



  //===============================================
  //                  PRIVATE SUBS
  //===============================================
  private initMessagesSubs() {
    // Mensajes de la bd
    this.chatService.messages$.subscribe( messages => {
      this.messages = messages;
    });
    
    // Mensajes nuevos
    this.chatService.getMessages().subscribe( (message: IMessage) =>{ 
      this.messages.push(message);
    });
    
    // Mensajes eliminados
    this.chatService.getDeletedMessages().subscribe( (message: IMessage) =>{
      this.messages = this.messages.filter( m => m._id != message._id);
    });
  }

  private initUserSub() {
    this.authService.getUser$().pipe(
      filter( userLogged => userLogged !== null)
    ).subscribe( userLogged => {
       this.user = {
         name: userLogged.name,
         email: userLogged.email,
         picture: userLogged.picture,
         status: 'ONLINE'
       }
    })
  }

}
