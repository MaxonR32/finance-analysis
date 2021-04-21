import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { MaterialModule } from '@full/material'
import { ComponentsModule } from '@full/components'

import { ProfilePageComponent } from './components/profile-page/profile-page.component'
import { DifferentDataComponent } from './components/different-data/different-data.component'
import { ModalChangeProfileComponent } from './components/modal-change-profile/modal-change-profile.component'
import { ModalConfirmDeleteComponent } from './components/modal-confirm-delete/modal-confirm-delete.component'


export const profileRoutes: Routes = [
	{path: '', component: ProfilePageComponent}
] 

@NgModule({
  imports: [
  	CommonModule,
  	MaterialModule,
  	ReactiveFormsModule,
  	FormsModule,
  	RouterModule.forRoot(profileRoutes),
  	ComponentsModule,
    BrowserAnimationsModule,
    BrowserModule
  ],
  declarations: [
  	ProfilePageComponent, 
  	DifferentDataComponent, 
  	ModalChangeProfileComponent, 
  	ModalConfirmDeleteComponent
  ],
  exports: [
  	DifferentDataComponent, 
  	ModalChangeProfileComponent, 
  	ModalConfirmDeleteComponent
  ],
})
export class FProfileModule {}
