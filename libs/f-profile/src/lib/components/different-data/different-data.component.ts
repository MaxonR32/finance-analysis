import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ProgressBarMode } from '@angular/material/progress-bar';

@Component({
  selector: 'full-different-data',
  templateUrl: './different-data.component.html',
  styleUrls: ['./different-data.component.scss']
})
export class DifferentDataComponent implements OnInit {

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

		displayedColumns: string[] = ['name', 'line', 'profit', 'nonProfit', 'average']
	  dataSource = this.ELEMENT_DATA

  constructor(
      // private analyticsGqlService: AnalyticsGqlServices
   ) { }

  ngOnInit(): void {
    // this.analyticsGqlService.getAdditionlInfoProfile().subscribe(
    //   ({data}) => {
    //     this.resData = data
    //     console.log('resData', this.resData)
        
    //     this.percentBeforeEndMonth = this.resData.additionallyInformationProfitle.percentBeforeEndMonth
    //     this.dayNow = this.resData.additionallyInformationProfitle.day
    //     this.dataSource = [...this.resData.additionallyInformationProfitle.finishedArray]
    //   }
    // )
  }

}
