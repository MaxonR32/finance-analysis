import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { MaterialModule } from '@full/material'

import { LoaderComponent } from './loader/loader.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  imports: [
  	CommonModule, 
  	MaterialModule,
  	BrowserModule,
  	BrowserAnimationsModule,

   ],
  declarations: [LoaderComponent, ToolbarComponent, SidenavComponent],
  exports: [LoaderComponent, ToolbarComponent, SidenavComponent],
})
export class ComponentsModule {}
