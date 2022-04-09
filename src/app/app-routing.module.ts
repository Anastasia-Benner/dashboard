import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashComponent } from './pages/dash/dash.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';

const routes: Routes = [
  {path: 'dash', component: DashComponent},

  {path: '', component: DashComponent, pathMatch: 'full'},
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
