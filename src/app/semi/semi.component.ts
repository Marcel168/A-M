import { Component, OnInit } from '@angular/core';
import { Seme } from '../seme';
import { SemeService } from '../seme.service';
import { MatDialog } from '@angular/material/dialog';
import { PostComponent } from '../insert/insert.component';
import { Location } from '@angular/common';
import { SeminaComponent } from '../semina/semina.component';
import { ModificaComponent } from '../modifica/modifica.component';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-semi',
  templateUrl: './semi.component.html',
  styleUrls: ['./semi.component.css']
})

export class SemiComponent implements OnInit {
  semi: Seme[];
  selectedFile: ImageSnippet;

  constructor(private semeService: SemeService, public dialog: MatDialog, private location: Location) { }

  ngOnInit() {
    this.getSemi();
  }

  getSemi(): void {
    this.semeService.getSemi()
      .subscribe(semi => this.semi = semi);
  }

  delete(seme: Seme): void {
    this.semi = this.semi.filter(s => s !== seme);
    this.semeService.deleteSeme(seme.nome).subscribe();
  }

  processFile(img: any) {
    const reader = new FileReader();
    reader.readAsDataURL(img);
  }

  modifica(nome) {
    let risp = this.dialog.open(ModificaComponent, { width: '30%', data: { nome: nome } });
    risp.afterClosed().subscribe(res => { if (res == "true") window.location.reload(); });
  }

  semina(nome) {
    this.dialog.open(SeminaComponent, { width: '30%', data: { nome: nome } });
  }

  add() {
    let risp = this.dialog.open(PostComponent, { width: '30%' });
    risp.afterClosed().subscribe(res => { if (res == "true") window.location.reload(); });
  }

}
