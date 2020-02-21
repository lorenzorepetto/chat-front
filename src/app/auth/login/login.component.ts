import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading: boolean;

  constructor( public authService: AuthService ) { }

  ngOnInit() {
    this.loading = false;
  }
  
  login() {
    this.loading = true;
    this.authService.login()
  }  

}
