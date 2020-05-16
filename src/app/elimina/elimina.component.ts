import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Seme }         from '../seme';
import { SemeService }  from '../seme.service';

@Component({
  selector: 'app-elimina',
  templateUrl: './elimina.component.html',
  styleUrls: ['./elimina.component.css']
})
export class EliminaComponent implements OnInit {
  @Input() seme: Seme;

  constructor(
    private route: ActivatedRoute,
    private semeService: SemeService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.deleteSeme();
    this.sleep(200);
    this.location.back();
  }

  deleteSeme(): void {
    const nome = this.route.snapshot.paramMap.get('nome');
    this.semeService.deleteSeme(nome)
      .subscribe();
  }

  sleep(milliseconds: number): void{
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
}
