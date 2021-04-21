import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component'
import { HttpClientModule } from '@angular/common/http'
import { authRoutes } from '@full/auth'
import { MaterialModule } from '@full/material'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import { profileRoutes } from '@full/f-profile'
import { SiteLayoutComponent, siteLayoutRoutes } from '@full/site-layout-component'
import { AuthGuard } from '@full/auth'
import { GqlModule } from '@full/gql'

const routes: Routes = [
    {path: '', pathMatch: 'full' ,redirectTo: '/login'},
    {path: 'login', children: authRoutes},
    {path: '', component: SiteLayoutComponent, canActivate:[AuthGuard], children: siteLayoutRoutes }
]

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule, 
    HttpClientModule, 
    MaterialModule,
    GqlModule,
    RouterModule.forRoot(routes, {initialNavigation: 'enabled'}),
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
