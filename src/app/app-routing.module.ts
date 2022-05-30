import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';

const routes: Routes = [
  {
    pathMatch: 'full',
    path: '',
    component: LoginComponent
  },
  {
    pathMatch: 'full',
    path: 'login',
    component: LoginComponent
  },
  {
    pathMatch: 'full',
    path: 'signup',
    component: SignupComponent
  },
  {
    pathMatch: 'full',
    path: 'alumnos',
    component: AlumnosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
