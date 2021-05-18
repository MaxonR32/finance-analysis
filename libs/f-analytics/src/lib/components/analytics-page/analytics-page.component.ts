import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js'
import * as moment from 'moment'

import { AnalyticsService } from '../../services/analytics.service'


@Component({
  selector: 'full-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.scss']
})
export class AnalyticsPageComponent implements OnInit, AfterViewInit {

   resData: any
   january: number = 0
   curentMonth: number

   days: number[] = []
   currentChart: Chart


   arrCheckMonth = [
     {month: 'January', value: 0},
     {month: 'February', value: 1},
     {month: 'March', value: 2},
     {month: 'April', value: 3},
     {month: 'May', value: 4},
     {month: 'July', value: 5},
     {month: 'June', value: 6},
     {month: 'August', value: 7},
     {month: 'September', value: 8},
     {month: 'Octomber', value: 9},
     {month: 'November', value: 10},
     {month: 'December', value: 11},
   ]

  @ViewChild('first') firstRef: ElementRef


  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit(): void {
    this.curentMonth = moment().month()
    for(let i = 1; i <= moment().daysInMonth(); i++) {
      this.days.push(i)
    }
  }

  ngAfterViewInit() {
    Chart.register(...registerables)

    this.analyticsService.getChartMember(this.curentMonth).subscribe(
      ({data}) => {
        this.resData = data
        
        const revenuesConfig: any = { 
          type: 'line',
          color: 'rgba(255, 99, 132)'
        }

        revenuesConfig.labels = this.days
        revenuesConfig.datasets = this.resData.getChartMember.map(user => {
          return {
            label: user.member.name,
            borderColor: user.color,
            data: user.actionData,
            steppedtLine: false,
            fill: false
          }
        })
        
        const revenuesCtx = this.firstRef.nativeElement.getContext('2d')
        revenuesCtx.canvas.height = '100'
        // console.log(revenuesConfig)

        this.currentChart = new Chart(revenuesCtx, createChartConfig(revenuesConfig))
    },
    err => {
      console.log(err.message)
    }
  )
  }

  toggle(number) {
    this.analyticsService.getChartMember(number).subscribe(
      ({data}) => {
        this.currentChart.destroy()

        this.resData = data
        
        const revenuesConfig: any = { 
          type: 'line',
          color: 'rgba(255, 99, 132)'
        }

        revenuesConfig.labels = this.days
        revenuesConfig.datasets = this.resData.getChartMember.map(user => {
          return {
            label: user.member.name,
            borderColor: user.color,
            data: user.actionData,
            steppedtLine: false,
            fill: false
          }
        })
        
        const revenuesCtx = this.firstRef.nativeElement.getContext('2d')
        revenuesCtx.canvas.height = '100'
        // console.log(revenuesConfig)

        this.currentChart = new Chart(revenuesCtx, createChartConfig(revenuesConfig))
      }
    )
  }

}

function createChartConfig({type, labels, datasets, color}) {
  return {
    type,
    options: {
      responsive: true,
      legend: {
          postion: 'left',
          display: true,
          labels: {
              color
          }
      }
    },
    data: {
      labels,
      datasets
    }
  }
}