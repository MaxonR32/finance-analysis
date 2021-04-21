import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AddNewService } from '../../services/add-new.service'
import { NewPostGQL } from '@full/f-list-page'

@Component({
  selector: 'full-add-action-page',
  templateUrl: './add-action-page.component.html',
  styleUrls: ['./add-action-page.component.scss']
})
export class AddActionPageComponent implements OnInit {

	newForm: FormGroup
	isProfit = 'Consum'
	isProfitB = false
	animateMod: string = 'consum' 

	action: any

	lastAction

	aSub: Subscription
  	lists = []
  	resData: any

  	constructor(	
  		private addNewService: AddNewService,
  		private newPostGQL: NewPostGQL 
  	) {
  		this.lastAction = this.newPostGQL.subscribe()
  		console.log('lassst', this.lastAction)
  	}

  	ngOnInit(): void {
		this.newForm = new FormGroup({
			profit: new FormControl(false, [Validators.required]),
			quantityMoney: new FormControl(null, [Validators.required, Validators.min(1)]),
			comment: new FormControl(null),
			member: new FormControl(null),
			date: new FormControl(new Date(), [Validators.required]),
		})

		this.addNewService.fetchMember().subscribe(
			({data}) => {
				this.resData = data
				// console.log(this.resData.getProfileData.members)
				this.lists = this.lists.concat(this.resData.getProfileData.members)
			}
		)

	    // this.lastAction = this.newPostGQL.subscribe()

	}

	addNewAction() {
		this.action = this.newForm.value
		this.addNewService.addNewAction(this.action).subscribe(
			({data}) => {
				console.log(data)
				console.log(this.lastAction)
			}
		)

		// this.addNewService.example().subscribe()
	}

	isProfitF() {
		if(!this.newForm.value.profit) {
			this.isProfit = 'Profit'
			return 
		}
		this.isProfit = 'Consum'
	}


}
