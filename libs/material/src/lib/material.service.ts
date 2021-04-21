import { Injectable, Output, EventEmitter } from '@angular/core'
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog'
@Injectable({
	providedIn: 'root'
})

export class MaterialService {
	horizontalPosition: MatSnackBarHorizontalPosition = 'end';
 	verticalPosition: MatSnackBarVerticalPosition = 'top';

 	@Output() submitClicked: EventEmitter<any> = new EventEmitter<any>()

 	constructor(
 		private _snackBar: MatSnackBar,
 		public dialog: MatDialog
 	) {}

 	openSnackBar(error) {
	    this._snackBar.open(error, '', {
	      duration: 5000,
	      horizontalPosition: this.horizontalPosition,
	      verticalPosition: this.verticalPosition,
	    })
	}

	openModalProfileChange(name, job, date) {
		return {
	    	// height: '200px',
  			width: '600px',
  			data: {
  				name,
  				job,
  				date
  			}
		}
	}

	openModalDeleteMemberConfirm(name, id) {
		return {
			width: '400px',
			data: {
				name,
				id
			}
		}
	}

	
}