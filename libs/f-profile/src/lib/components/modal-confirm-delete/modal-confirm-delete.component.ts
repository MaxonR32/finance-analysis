import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'full-modal-confirm-delete',
  templateUrl: './modal-confirm-delete.component.html',
  styleUrls: ['./modal-confirm-delete.component.scss']
})
export class ModalConfirmDeleteComponent implements OnInit {

  name: string

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: {
      name: string, 
      id: string
    },
    private dialogRef: MatDialogRef<ModalConfirmDeleteComponent>
   ) { }

  ngOnInit(): void {
  	console.log('data', this.data)
  	this.name = this.data.name
  }

  onClose() {
  	this.dialogRef.close()
  }
  onConfirm() {
    this.dialogRef.close('delete')
  }

}
