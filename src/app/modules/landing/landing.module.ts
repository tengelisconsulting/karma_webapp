import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './pages/landing/landing.component';
import { AboutRoutingModule } from './landing-routing.module';


@NgModule({
  declarations: [LandingComponent],
  imports: [
    AboutRoutingModule,
    CommonModule,
  ]
})
export class LandingModule { }
