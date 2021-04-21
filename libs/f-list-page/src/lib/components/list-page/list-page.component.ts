import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort'
import { FormGroup, FormControl } from '@angular/forms'
import * as moment  from 'moment'
import { ListTable } from '@full/f-profile'
import { MaterialService } from '@full/material'
import { ListService } from '../../services/list.service'
import { Subscription, of, fromEvent } from 'rxjs'
import { map } from 'rxjs/operators'
import { NewPostGQL } from '../../services/new-action.service'
import { QueryRef } from 'apollo-angular'
@Component({
  selector: 'full-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {

  displayedColumns: string[] = ['date', 'state', 'valueMoney', 'person', 'comment']
 	dataTable = []
  dataRes: any

  profit = false
  consum = false
  filterInput
  lastAction: any
  query: QueryRef<any>

 	resultsLength = 0
 	isLoadingResults = true
 	isRateLimitReached = false
  dataSource: MatTableDataSource<any> =  new MatTableDataSource<ListTable[]>()

  // stream$ = fromEvent(this.loog(), 'click')

  private querySubscription: Subscription

  you = 'You'
  format = 'YYYY-MM-DD'

	@ViewChild(MatPaginator) paginator: MatPaginator;
 	@ViewChild(MatSort) sort: MatSort;


   range = new FormGroup({
      start: new FormControl(),
      end: new FormControl()
    })

 	constructor(
	private listService: ListService,
  private material: MaterialService,
 	private newPostGQL: NewPostGQL 
  ) {}

	ngOnInit(): void {
    this.querySubscription = this.listService.getList().valueChanges.subscribe(
      ({data}) => {
        console.log('listNEw', data)
        this.dataRes = data
        // // console.log(this.dataRes.getList)
        this.dataTable = this.dataTable.concat(this.dataRes.getList)
        this.dataSource.data = this.dataTable
        this.isLoadingResults = false
        this.isRateLimitReached = true
      }
    )
    this.lastAction = this.newPostGQL.subscribe()
   }

 	ngAfterViewInit() {

		// this.listService.getList().subscribe(
		// 	data => {
  //               this.dataTable = this.dataTable.concat(data)
		// 		this.isLoadingResults = false
		// 		this.isRateLimitReached = true
  //               this.dataSource.data = this.dataTable
		// 	}
		// )
	}

  ngOnDestroy() {
    this.querySubscription.unsubscribe()
  }

  applyFilterDate() {
    this.dataSource.data = this.dataTable 

    // if not enter a date and click apply filter
    if(this.range.value.start === null) {
      return this.dataSource.data = this.dataTable
    }
    let start = moment(this.range.value.start).format(this.format)
    let end = moment(this.range.value.end).format(this.format)

    if(start > moment().format(this.format)) {
        return this.material.openSnackBar('The date is biggest')
    }

    if(this.range.value.start !== null) {
      this.dataSource.data = this.dataSource.data.filter(d => {
        const a = moment(d.date).format(this.format)
        return a >= start && a <= end
      })
    }
   }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  takeAwayFilter() {
    this.range.reset()
    this.profit = false
    this.consum = false
    this.filterInput = ''
    // this.dataSource.data = this.dataTable
    this.dataSource.filter = ''
  }

  filterProfit() {
    if(this.consum) {
      this.consum = false
    }
    this.dataSource.filter = 'true'
    if(this.profit) {
      this.dataSource.filter = ''
    }
  }

  filterNonProfit() {
    if(this.profit) {
      this.profit = false
    }
    this.dataSource.filter = 'false'
    if(this.consum) {
      this.dataSource.filter = ''
    }
  }
}
