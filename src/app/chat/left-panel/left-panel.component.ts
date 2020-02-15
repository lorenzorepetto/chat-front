import { Component, OnInit, Input } from '@angular/core';
import { IRoom } from '../../interfaces/room.interface';
import { ChatService } from '../../services/chat.service';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IUserSocket } from '../../interfaces/user.interface';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.css']
})
export class LeftPanelComponent implements OnInit {
  
  showPanel: boolean = false;


  activeUsersObs: Observable<any>;

  constructor( public chatService: ChatService ) { }

  ngOnInit() {
    this.activeUsersObs = this.chatService.getActiveUsers()
          .pipe(
            filter( (users: IUserSocket[]) => users.length !== 0 )
          )
    
    this.chatService.currentRoom$.subscribe( currentRoom => {
      this.chatService.emitActiveUsers( currentRoom._id );
    })
    
    this.activeUsersObs.subscribe(data => console.log(data))
    
  }



  togglePanel(){
    this.showPanel = !this.showPanel;
  }

}
