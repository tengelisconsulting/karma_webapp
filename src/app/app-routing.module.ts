import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutePath } from './core/routing/AppRoutePath';
import { LayoutComponent } from './layout/layout.component';


const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    // canActivate: [NoAuthGuard],
    children: [
      {
        path: AppRoutePath.LANDING,
        loadChildren: () => import('./modules/landing/landing.module')
          .then((m) => m.LandingModule)
      },
    ]
  },
  {
    path: AppRoutePath.LOGIN,
    loadChildren: () => import('./modules/login/login.module')
      .then((m) => m.LoginModule)
  },
  { path: '**', redirectTo: AppRoutePath.LANDING, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
