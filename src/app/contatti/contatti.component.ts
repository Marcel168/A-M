import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contatti',
  templateUrl: './contatti.component.html',
  styleUrls: ['./contatti.component.css']
})

export class ContattiComponent implements OnInit {
  telegram: string = "assets/telegram.png";
  gmail: string = "assets/gmail.png";

  constructor() { }

  ngOnInit(): void {
  }

}
