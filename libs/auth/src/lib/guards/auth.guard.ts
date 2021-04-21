import { Injectable } from '@angular/core'
import { CanActivate, CanActivateChild, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router'
import { AuthService } from '../services/auth-service.service'
import { Observable, of } from 'rxjs'

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
	constructor(
		private authService: AuthService,
		private router: Router
	) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		if(this.authService.isAuthenticatedMetod()) {
			return of(true)
		} else {
			this.router.navigate(['/login'], {
				queryParams: {
					accessDenied: true
				}
			})

			return of(false)
		}
	}

	canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		return this.canActivate(route, state)
	}	
}