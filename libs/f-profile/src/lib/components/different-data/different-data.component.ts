import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { DifferentDataService } from '../../services/differetn-data.service'
import { AnalyticsMember, DataOfDay } from '../../interfaces/interface'

@Component({
  selector: 'full-different-data',
  templateUrl: './different-data.component.html',
  styleUrls: ['./different-data.component.scss']
})
export class DifferentDataComponent implements OnInit, OnChanges {

    ELEMENT_DATA: any[] = []

		colorSpinner: ThemePalette = 'primary'
 		modeSpinner: ProgressSpinnerMode = 'determinate'
 		valueSpinner = 5
 		showText = 'Rating'

 		colorBar: ThemePalette = 'primary'
		modeBar: ProgressBarMode = 'determinate'
		valueBar = 70
		bufferValueBar = 30

    percentBeforeEndMonth: number
    dayNow: number
    resData

		displayedColumns: string[] = ['name', 'line', 'profit', 'consumValue', 'average']
	  dataSource = this.ELEMENT_DATA

     @Input() valueMember: AnalyticsMember[]
     @Input() dataOfDay: DataOfDay

  constructor(
      private analyticsService: DifferentDataService
   ) {
    
  }

 

  ngOnInit(): void {

  }

  ngOnChanges() {
    this.dataSource = this.valueMember
  }



  close() {
    // console.log(this.valueMember)
    this.dataSource = this.valueMember
    console.log(this.dataSource)
  }

}
