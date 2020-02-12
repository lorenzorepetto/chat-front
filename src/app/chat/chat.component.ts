import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor( private http: HttpClient,
              public wsService: WebsocketService) { }

  ngOnInit() {
  }

}
