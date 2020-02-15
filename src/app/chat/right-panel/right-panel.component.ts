import { Component, OnInit, Input } from '@angular/core';
import { IMessage, IMessageSend } from '../../interfaces/message.interface';
import { IRoom } from '../../interfaces/room.interface';
import { ChatService } from '../../services/chat.service';
import { AuthService } from '../../services/auth.service';
import { filter } from 'rxjs/operators';
import { IUser, validStates } from '../../interfaces/user.interface';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.css']
})
export class RightPanelComponent implements OnInit {
  
  text: string = '';
  user: IUser = null;
  room: IRoom;
  messages: IMessage[] = null;
  
  element: HTMLElement;

  constructor( public chatService: ChatService,
               public authService: AuthService ) { }

  ngOnInit() {
    this.element = document.getElementById('chat-messages');
    
    this.chatService.messages$.subscribe( messages => {
      this.messages = messages;
      setTimeout(() => {
        this.element.scrollTop = this.element.scrollHeight;              
      }, 50);
    });

    this.chatService.getMessages().subscribe( (message: IMessage) =>{ 
      this.messages.push(message);
      console.log(this.messages);
      setTimeout(() => {
        this.element.scrollTop = this.element.scrollHeight;              
      }, 50);

    });
    
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



  changeStatus( status: validStates ) {
    this.user.status = status;
  }

}
