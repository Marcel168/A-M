import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contatti',
  templateUrl: './contatti.component.html',
  styleUrls: ['./contatti.component.css']
})
export class ContattiComponent implements OnInit {
  image: string = "assets/telegram.png";
  image2: string = "assets/gmail.png";

  constructor() { }

  ngOnInit(): void {
  }

}
