import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingRouteComponent } from './pages/landing-route/landing-route.component';


const routes: Routes = [
  {
    path: '',
    component: LandingRouteComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
