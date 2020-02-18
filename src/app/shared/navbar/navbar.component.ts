import { Component, OnInit, Input } from '@angular/core';
import { IRoom } from 'src/app/interfaces/room.interface';
import { AuthService } from '../../services/auth.service';
import { ChatService } from '../../services/chat.service';
import { AppState } from '../../store/app.reducers';
import { Store } from '@ngrx/store';
import { IUser } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  // User
  user: IUser = null;
  loadingUser: boolean;
  errorUser: any;


  constructor( public authService: AuthService,
               private store: Store<AppState>,
               public chatService: ChatService ) { }

  ngOnInit() {
    this.initUserSub();
  }



  private initUserSub() {
    this.store.select('user')
      .subscribe( user => {
        this.user = user.user;
        this.loadingUser = user.loading;
        this.errorUser = user.error;
      }) 
  }
}
