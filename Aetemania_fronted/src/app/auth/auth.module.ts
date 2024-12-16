import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { OlvidePasswordComponent } from './components/olvide-password/olvide-password.component';



@NgModule({
  providers:[
    AuthService
  ],
  declarations: [
    RegisterComponent,
    LoginComponent,
    OlvidePasswordComponent
    
    
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    
  ]
})
export class AuthModule { }
