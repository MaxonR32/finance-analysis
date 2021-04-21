import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'

import { MaterialModule } from '@full/material'

import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const authRoutes: Routes = [
	{
		path: '', component: AuthLayoutComponent, children: [
		{path: '', component: LoginComponent}
		] 
	}
]


@NgModule({
  imports: [
  	CommonModule,
  	BrowserModule,
  	BrowserAnimationsModule,
  	RouterModule.forRoot(authRoutes),
  	MaterialModule,
  	FormsModule, 
    ReactiveFormsModule
  ],
  declarations: [AuthLayoutComponent, LoginComponent, RegisterComponent],
  exports: [AuthLayoutComponent, LoginComponent, RegisterComponent],
})
export class AuthModule {}
