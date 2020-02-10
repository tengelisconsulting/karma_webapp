import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './landing-routing.module';
import { LandingRouteComponent } from './pages/landing-route/landing-route.component';


@NgModule({
  declarations: [
    LandingRouteComponent,
  ],
  imports: [
    AboutRoutingModule,
    CommonModule,
  ]
})
export class LandingModule { }
