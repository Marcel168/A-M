import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from './insert/insert.component';
import { SemiComponent } from './semi/semi.component';
import { GanttComponent } from './gantt/gantt.component';
import { HomeComponent } from './home/home.component';
import { ContattiComponent } from './contatti/contatti.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'view', component: SemiComponent },
  { path: 'gantt', component: GanttComponent },
  { path: 'contatti', component: ContattiComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [PostComponent, HomeComponent, SemiComponent, GanttComponent, ContattiComponent]
