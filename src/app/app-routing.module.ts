import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from "./main/main.component";

const routes: Routes = [
  { path: '', component: MainComponent},
  { path: 'favorites', component: MainComponent},
  { path: 'deleted', component: MainComponent},
  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
