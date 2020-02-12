import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.css']
})
export class RightPanelComponent implements OnInit {
  
  text: string = '';

  constructor() { }

  ngOnInit() {
  }

  send() {
    if (this.text.trim().length === 0) {
      return;
    }
    console.log(this.text);
    this.text = ''
  }

}
