import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes } from '@angular/router'

import { MaterialModule } from '@full/material'

import { AnalyticsPageComponent } from './components/analytics-page/analytics-page.component'

export const analyticsRoutes: Routes = [
	{path: '',component: AnalyticsPageComponent}
]

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [
    AnalyticsPageComponent
  ],
})
export class FAnalyticsModule {}
