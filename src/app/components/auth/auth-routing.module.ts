import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerifyComponent } from './verify/verify.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';

// Routes
const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'login',
  //   pathMatch: 'full'
  // },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'login'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'register'
    }
  },
  {
    path: 'verify',
    component: VerifyComponent,
    data: {
      title: 'verify'
    }
  },
  {
    path: 'reset',
    component: ResetPasswordComponent,
    data: {
      title: 'reset'
    }
  },
  {
    path: 'recover-password/:id',
    component: RecoverPasswordComponent,
    data: {
      title: 'recover password'
    }
  },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // Add
    RouterModule.forChild(routes)
  ],
  // Add
  exports: [RouterModule]
})

export class AuthRoutingModule { }
