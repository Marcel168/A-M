import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { MatDatepicker } from "@angular/material/datepicker";
import { Seme }         from '../seme';
import { SemeService }  from '../seme.service';
import {FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-modifica',
  templateUrl: './modifica.component.html',
  styleUrls: ['./modifica.component.css']
})

export class ModificaComponent implements OnInit {
  @Input() seme: Seme;
  minDate= new Date(new Date().getFullYear(), 0, 1);
  maxDate= new Date(new Date().getFullYear(), 11, 31);
  nome = this.data.nome;
  dataInizio = new Date();
  dataFine = new Date();
  date;
  date1;
  selectedFile: ImageSnippet;
  
  @ViewChild('myDatePicker') picker: MatDatepicker<Date>;
  @ViewChild('myDatePicker1') picker1: MatDatepicker<Date>;

  constructor(
    private semeService: SemeService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.seme = {nome: 'set', descrizione: 'set', dataInizio: '1/1/1970', dataFine: '1/1/1970', tempoCrescita: 23, img: null};
    this.getSeme();
  }

  load(){
    return this.date = new FormControl(new Date(this.seme.dataInizio));
  }

  load1(){
    return this.date = new FormControl(new Date(this.seme.dataFine));
  }

  showPicker():void{
    this.picker.open();
  }

  showPicker1():void{
    this.picker1.open();
  }

  getSeme(): void {
    this.semeService.getSeme(this.nome)
      .subscribe(seme => this.init(seme));
  }

  init(seme: Seme){
    this.seme = seme;
    this.dataInizio = new Date(seme.dataInizio);
    this.dataFine = new Date(seme.dataFine);
    this.selectedFile.src = seme.img;
  }

  update(dataInizio: string, dataFine: string): void {
    this.seme.dataInizio = dataInizio;
    this.seme.dataFine = dataFine;
    if(!dataInizio || !dataFine || !this.seme.nome || !this.seme.img || !this.seme.tempoCrescita){
      alert("Operazione fallita: Dati mancanti");
      return;
    }
    this.seme.nome = this.seme.nome+'§'+this.nome;
    this.semeService.updateSeme(this.seme)
      .subscribe();
  }

  processFile(img: any){
    const file: File = img.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.seme.img = event.target.result;
    });
    reader.readAsDataURL(file);
  }
}
