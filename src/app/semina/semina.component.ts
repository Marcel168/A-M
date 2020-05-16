import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDatepicker } from "@angular/material/datepicker";
import { Seme } from '../seme';
import { Semina } from '../semina';
import { SemeService } from '../seme.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-semina',
  templateUrl: './semina.component.html',
  styleUrls: ['./semina.component.css']
})
export class SeminaComponent implements OnInit {
  appezzamenti: number[] = [1, 2, 3, 4, 5, 6];
  minDate = new Date();
  maxDate = new Date(this.minDate);
  nome = this.data.nome;
  seme: Seme = { nome: 'init', descrizione: 'init', dataFine: 'init', dataInizio: 'init', img: 'init', tempoCrescita: 0 };

  @ViewChild('myDatePicker') picker: MatDatepicker<Date>;

  constructor(
    private semeService: SemeService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.getSeme();
    this.maxDate.setDate(this.minDate.getDate() + 365);
  }

  showPicker(): void {
    this.picker.open();
  }

  init(seme: Seme) {
    this.seme = seme;
    var dataInizio = new Date(seme.dataInizio);
    var dataFine = new Date(seme.dataFine);
    dataInizio.setFullYear(new Date().getFullYear());
    dataFine.setFullYear(new Date().getFullYear());
    if (dataFine >= new Date()) {
      this.minDate = dataInizio;
      this.maxDate = dataFine;
      if(this.minDate < new Date())
      this.minDate = new Date();
    } else{
      this.minDate = dataInizio;
      this.maxDate = dataFine;
      this.minDate.setDate(this.minDate.getDate() + 365);
      this.maxDate.setDate(this.maxDate.getDate() + 365);
    }
}

  getSeme(): void {
    this.semeService.getSeme(this.nome)
      .subscribe(seme => this.init(seme));
  }

  save(inizio: any, appezzamento: number) {
    inizio = new Date(inizio);
    var fine = new Date(inizio);
    var seme = this.seme.nome;
    fine.setDate(fine.getDate() + Number(this.seme.tempoCrescita));
    if (!inizio || !appezzamento) { return; }
    this.semeService.addSemina({ seme, inizio, fine, appezzamento } as Semina)
      .subscribe(res => alert('Terreno occupato, cambiare data o terreno'));
  }
}