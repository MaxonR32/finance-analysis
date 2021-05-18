import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment'
import { AuthService } from '@full/auth'
import { MaterialService } from '@full/material'
import { ProfileService } from '../../services/profile.service'
import { ModalConfirmDeleteComponent } from '../modal-confirm-delete/modal-confirm-delete.component'
import { ModalChangeProfileComponent } from '../modal-change-profile/modal-change-profile.component'
import { AnalyticsService } from '@full/f-analytics'
import { AnalyticsMember, DataOfDay } from '../../interfaces/interface'

@Component({
  selector: 'full-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {


  	formMember: FormGroup
  	aSub: Subscription
  	fMSub: Subscription
  	user$: Observable<any>
  	user = null
  	lists = []
  	loading = false
  	average: any
    newDate: string
    sle

  	image: File
  	imagePreview: string  | ArrayBuffer = ''

    valueMember: AnalyticsMember[] = []
    dataOfDay: DataOfDay 

    fd = new FormData()
  	resData: any

     @ViewChild('input') inputRef: ElementRef  

  	constructor(
      private authService: AuthService,
      private profileService: ProfileService,
  		private router: Router,
      private materialService: MaterialService,
     	private dialog: MatDialog,
  	) { }

  	ngOnInit(): void {
      this.loading = true
      this.formMember = new FormGroup({
        name: new FormControl(null, [Validators.required]),
        who: new FormControl(null, [Validators.required]),
        date: new FormControl(null, [Validators.required]),
      })

      this.profileService.getProfileData().subscribe(
         ({data}) => {
           this.resData = data
           // console.log(this.resData)
           this.user = this.resData.getProfileData.user
           this.imagePreview = `http://localhost:3000/${this.user.imageSrc}`
           this.lists = this.resData.getProfileData.members
         }
      )

      this.profileService.getGlobalValue().subscribe(
        ({data}) => {
          this.resData = data
          this.average = this.resData.getAnalyticsData.globalValue
          this.valueMember = this.resData.getAnalyticsData.valueMembers
          this.dataOfDay = this.resData.getAnalyticsData.dataOfDay
          console.log(this.dataOfDay)
        }
      )    
    }

  ngOnDestroy() {

  }

  logout() {
  	this.authService.logout()
  	this.router.navigate(['login'])
  }

  openModalConfirmDelete(name, id) {
    const dialogRef = this.dialog.open(
      ModalConfirmDeleteComponent, this.materialService.openModalDeleteMemberConfirm(name, id)
    )
    dialogRef.afterClosed().subscribe(
      result => {
        if(result) {
          this.profileService.deleteMember(id).subscribe(
            ({data}) => {
              this.resData = data
              // this.lists = [...this.resData.deleteMember]
            }
          )
        }
      }
    )
  }

  submitFormMember() {
    this.profileService.createMember(this.formMember.value).subscribe()
    this.formMember.reset()
  }

  openModal() {
    console.log(this.user.name, this.user.job, this.user.date)
    const dialogRef = this.dialog.open(
      ModalChangeProfileComponent, this.materialService.openModalProfileChange(this.user.name, this.user.job, this.user.date)
    )
  }
  onFileUpload(event: any) {
      const file = event.target.files[0]
      this.image = file

      const reader = new FileReader()
      reader.onload = () => {
        this.imagePreview = reader.result
      }

      reader.readAsDataURL(file)     
  }

  triggerClick() {
    this.inputRef.nativeElement.click()
  }

  saveImg() {
    this.profileService.uplaodImg(this.image).subscribe(
      result => {
        this.sle = result
        if(this.sle.message === 'Img has saved') {
          console.log('result', this.sle.imageSrc)
          this.profileService.saveImgOnUser(this.sle.imageSrc).subscribe(
            ({data}) => {
              console.log('result2', data)
            }
          )
        }
      }
    )
  }
}
