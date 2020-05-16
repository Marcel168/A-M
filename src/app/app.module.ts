import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { EliminaComponent } from './elimina/elimina.component';
import { ModificaComponent } from './modifica/modifica.component';
import { ConfermaComponent } from './conferma/conferma.component';
import { SeminaComponent } from './semina/semina.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { PostComponent } from './insert/insert.component';
import { ErrorComponent } from './error/error.component';
import { GanttComponent } from './gantt/gantt.component';
import { HomeComponent } from './home/home.component';
import { ContattiComponent } from './contatti/contatti.component';
import { NgGanttEditorModule } from 'ng-gantt';



@NgModule({
  declarations: [AppComponent, HeaderComponent, routingComponents, EliminaComponent, ModificaComponent, ConfermaComponent, SeminaComponent, ErrorComponent, GanttComponent, HomeComponent, ContattiComponent],
  entryComponents: [PostComponent, SeminaComponent, ModificaComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatMomentDateModule,
    MatDatepickerModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    NgGanttEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
