import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http'
import { AuthService } from '../services/auth-service.service'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	constructor(private authService: AuthService, private router: Router) {}

	intercept(req: HttpRequest<any>, next: HttpHandler) {
		if(this.authService.isAuthenticatedMetod()) {
			req = req.clone({
				setHeaders: {
					Authorization: this.authService.getToken()
				}
			})
		}

		return next.handle(req).pipe(
			catchError(
				(error: HttpErrorResponse) => {
					return this.handleAuthError(error)
				}
			)
		)
	}

	private handleAuthError(error: HttpErrorResponse): Observable<any> {
		if(error.status === 401) {
			this.router.navigate(['/login'], {
				queryParams: {
					sessionFailed: true
				}
			})
		}
		return throwError(error)
	}
}