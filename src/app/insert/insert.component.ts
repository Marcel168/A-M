import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepicker } from "@angular/material/datepicker";
import { Seme } from '../seme';
import { SemeService } from '../seme.service';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: "app-post",
  templateUrl: "./insert.component.html",
  styleUrls: ['./insert.component.css']
})

export class PostComponent implements OnInit {
  text = 'c';
  minDate = new Date(new Date().getFullYear(), 0, 1);
  maxDate = new Date(new Date().getFullYear(), 11, 31);
  SemeService: any;
  semi: Seme[];
  selectedFile: ImageSnippet;

  onAddPost() {
    window.location.href = "http://localhost:4201/api";
  }

  @ViewChild('myDatePicker') picker: MatDatepicker<Date>;
  @ViewChild('myDatePicker1') picker1: MatDatepicker<Date>;

  constructor(private semeService: SemeService) { }

  ngOnInit() { }

  showPicker(): void {
    this.picker.open();
  }

  showPicker1(): void {
    this.picker1.open();
  }

  add(nome: string, descrizione: string, dataInizio: string, dataFine: string, tempoCrescita: number, img: any): void {
    nome = nome.trim();
    descrizione = descrizione.trim();
    if (!nome || !dataInizio || !dataFine || !tempoCrescita || !img) { alert("Operazione fallita: Dati mancanti"); return; }
    img = this.selectedFile.src;
    this.semeService.addSeme({ nome, descrizione, dataInizio, dataFine, tempoCrescita, img } as Seme)
      .subscribe();
  }

  processFile(img: any) {
    const file: File = img.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
    });
    reader.readAsDataURL(file);
  }
}