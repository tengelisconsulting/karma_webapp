import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutePath } from './core/routing/AppRoutePath';
import { LayoutComponent } from './layout/layout.component';


const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/auth/login',
  //   pathMatch: 'full'
  // },
  {
    path: "",
    component: LayoutComponent,
    // canActivate: [NoAuthGuard],
    children: [
      {
        path: "",
        redirectTo: AppRoutePath.LANDING,
        pathMatch: "full",
      },
      {
        path: AppRoutePath.LANDING,
        loadChildren: () => import('./modules/landing/landing.module')
          .then((m) => m.LandingModule)
      },
    ]
  },
  // {
  //   path: 'login',
  //   component: LoginRouteComponent,
  //   loadChildren: () =>
  //     import('@modules/login/login.module').then(m => m.LoginModule)
  // },
  // Fallback when no prior routes is matched
  { path: '**', redirectTo: '/auth/login', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
