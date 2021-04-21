import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router' 
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Subscription } from 'rxjs'
import { AuthService } from '../../services/auth-service.service'

@Component({
  selector: 'full-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	  loginForm: FormGroup
    aSub: Subscription
    resData: any

  	constructor(
      private authService: AuthService,
      private router: Router

      ) { }

  	ngOnInit(): void {
  		this.loginForm = new FormGroup({
  			email: new FormControl(null, [Validators.required, Validators.email]),
  			password: new FormControl(null, [Validators.required, Validators.minLength(6)])
  		})
  	}

  	get email() {
  		return this.loginForm.get('email')
  	}

  	get password() {
  		return this.loginForm.get('password')
  	}

  	submitLogin() {
      this.loginForm.disable()
      
		  this.authService.login(this.loginForm.value).subscribe(
        ({data}) => {
          this.resData = data
          localStorage.setItem('auth-token', `${this.resData.login.token}`)
            console.log(data)
            this.authService.setToken(this.resData.token)
            this.router.navigate(['/profile'])
        }, error => {
          this.loginForm.enable()
        }
      )
  	}
}
