import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router' 
import { MatDatepicker } from '@angular/material/datepicker';
import { AuthService } from '../../services/auth-service.service'


@Component({
  selector: 'full-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup
	dontMatch = false
	cll: string
	slow = ''

  	constructor(
      private authService: AuthService,
	    private router: Router
  	) { }

	  ngOnInit(): void {
  		this.registerForm = new FormGroup({
	  		email: new FormControl(null, [Validators.required, Validators.email]),
		  	name: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
			  password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
			  passwordRepeat: new FormControl(null, [Validators.required, Validators.minLength(6)]),
        date: new FormControl(null, Validators.required)    
		  })
    }

  get email() {
		return this.registerForm.get('email')
	}
	get password() {
		return this.registerForm.get('password')
	}
	get name() {
		return this.registerForm.get('name')
	}
	get passwordRepeat() {
		return this.registerForm.get('passwordRepeat')
	}
  get date() {
    return this.registerForm.get('date')
  }

	submitRegister() {
    console.log(this.registerForm.value)
	  this.authService.register(this.registerForm.value)
  }

}
