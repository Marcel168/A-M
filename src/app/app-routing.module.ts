import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from './insert/insert.component';
import { SemiComponent } from './semi/semi.component';
import { ConfermaComponent } from './conferma/conferma.component';
import { GanttComponent } from './gantt/gantt.component';
import { HomeComponent } from './home/home.component';
import { ContattiComponent } from './contatti/contatti.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'view', component: SemiComponent},
  { path: 'conferma', component: ConfermaComponent},
  { path: 'gantt', component: GanttComponent},
  { path: 'contatti', component: ContattiComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ PostComponent, HomeComponent, SemiComponent, ConfermaComponent, GanttComponent, ContattiComponent ]
