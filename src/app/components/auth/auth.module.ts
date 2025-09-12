import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// import
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyComponent } from './verify/verify.component';


@NgModule({
  declarations: [
    // import
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    RecoverPasswordComponent,
    VerifyComponent,
    // ProfileComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,

    // add
    SharedModule,
    AuthRoutingModule,
  ]
})
export class AuthModule { }
