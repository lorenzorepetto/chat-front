import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { IUserSocket, IUser } from '../../interfaces/user.interface';

// Redux
import * as fromActions from "../../store/actions";
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.css']
})
export class LeftPanelComponent implements OnInit {
  
  showPanel: boolean = false;

  user: IUser;
  users: IUserSocket[] = [];
  loading: boolean = true;

  constructor( public chatService: ChatService,
               private store: Store<AppState> ) { }

  ngOnInit() {

    this.store.select('user')
      .subscribe( user => this.user = user.user )

    this.store.select('activeUsers')
      .subscribe( activeUsers => {
        if (this.user) {
          this.users = activeUsers.users.filter( user => user.email != this.user.email );
          this.loading = false;
        }
      })    

    this.store.select('currentRoom')
      .subscribe( currentRoom => {
        if (currentRoom.room) {
          this.store.dispatch( new fromActions.ListenToUsersAction( currentRoom.room._id))
        }        
      })
        
  }
  

  
  togglePanel(){
    this.showPanel = !this.showPanel;
  }
  


}
