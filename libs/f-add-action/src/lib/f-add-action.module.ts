import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { MaterialModule } from '@full/material'

import { AddActionPageComponent } from './components/add-action-page/add-action-page.component'

export const addActionRoutes: Routes = [
	{path: '', component: AddActionPageComponent}
]

@NgModule({
  imports: [
  	CommonModule,
  	RouterModule.forRoot(addActionRoutes),
  	MaterialModule,
  	FormsModule, 
  	ReactiveFormsModule
  ],
  declarations: [
    AddActionPageComponent
  ],
})
export class FAddActionModule {}
