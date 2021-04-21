import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPageComponent } from './components/list-page/list-page.component';
import { RouterModule, Routes } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { MaterialModule } from '@full/material'

export const listRoutes = [
	{path: '', component: ListPageComponent}
]

@NgModule({
  imports: [
  	CommonModule,
	RouterModule.forRoot(listRoutes),
  	MaterialModule,
  	FormsModule, 
  	ReactiveFormsModule

	],
  declarations: [
    ListPageComponent
  ],
})
export class FListPageModule {}
