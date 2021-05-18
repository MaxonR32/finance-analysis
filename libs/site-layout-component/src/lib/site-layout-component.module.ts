import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SiteLayoutComponent } from './site-layout/site-layout.component'
import { Routes, RouterModule } from '@angular/router'

import { profileRoutes } from '@full/f-profile'
import { MaterialModule } from '@full/material'
import { addActionRoutes } from '@full/f-add-action'
import { listRoutes } from '@full/f-list-page'
import { analyticsRoutes } from '@full/f-analytics'

export const siteLayoutRoutes: Routes = [
	{path: 'profile', children: profileRoutes},
  	{path: 'newAction', children: addActionRoutes},
  	{path: 'list', children: listRoutes},
    {path: 'analytics', children: analyticsRoutes}
]

@NgModule({
  imports: [
  	CommonModule,
  	RouterModule.forRoot(siteLayoutRoutes),
  	MaterialModule 
  	],
  declarations: [SiteLayoutComponent],
  exports: [SiteLayoutComponent],
})
export class SiteLayoutComponentModule {}
