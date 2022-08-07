import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardPageComponent } from './components/card-page/card-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';

const routes: Routes = [
  {path:'', component: MainPageComponent},
  {path:'card/:id', component: CardPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
