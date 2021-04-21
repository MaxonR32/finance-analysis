import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProfileService } from '../../services/profile.service'

@Component({
  selector: 'full-modal-change-profile',
  templateUrl: './modal-change-profile.component.html',
  styleUrls: ['./modal-change-profile.component.scss']
})
export class ModalChangeProfileComponent implements OnInit {

  changeForm: FormGroup

  	constructor(
  		@Inject(MAT_DIALOG_DATA) private data: {
	      name: string, 
	      job: string,
	      date: Date
	    },
  		private dialogRef: MatDialogRef<ModalChangeProfileComponent>,
  		private profileService: ProfileService
  	) { }

  	ngOnInit(): void {
  		console.log(this.data.date)
  		this.changeForm = new FormGroup({
  			name: new FormControl(this.data.name, [Validators.required]),
  			job: new FormControl(this.data.job, [Validators.required]),
  			date: new FormControl(this.data.date)
  		})
	}

	get name() {
		return this.changeForm.get('name')
	}
	get job() {
		return this.changeForm.get('job')
	}
	get date() {
		return this.changeForm.get('date')
	}

	submitChange() {
		this.profileService.changeUserData(this.changeForm.value).subscribe()
		this.dialogRef.close(this.changeForm.value)
	}
	close() {
		this.dialogRef.close()
	}

}
