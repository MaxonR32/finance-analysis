import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { transition, trigger, state, style, animate } from '@angular/animations'
import { SidenavComponent } from '../sidenav/sidenav.component'

@Component({
  selector: 'full-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  animations: [
  	trigger("btnLinkHover", [
  		state('open', style({
  			opacity: 1,
        transform: 'translateY(-5px)'
  		})),
  		state('close', style({
  			opacity: 0,
        transform: 'translateY(5px)'
  		})),
  		transition('open <=> close', [
  			animate('0.2s')
  		])
  	])
  ]
})
export class ToolbarComponent implements OnInit {
	changeText: boolean = true
	animateMod: string = 'close' 
	links = [
	    {url: '/overview', name: 'Overview', img: 'view_carousel'},
	    {url: '/analytics', name: 'Analytics', img: 'bar_chart'},
	    {url: '/profile', name: 'Profile', img: 'supervised_user_circle'},
	    {url: '/list', name: 'My list', img: 'format_list_bulleted'},
	    {url: '/new', name: 'New Action', img: 'playlist_add'},
	]

	@ViewChild(SidenavComponent) 
	sidenavComponent: SidenavComponent

  	constructor() { }

  	ngOnInit(): void {
  	}

  	toggle() {
  		console.log(this.sidenavComponent)
  	}

  	mouseEnter() {
	  	this.changeText = true
	    this.animateMod = 'open'
  	}

	mouseLeave() {
	  	setTimeout(() => { // for animate
	      this.changeText = false  
	    }, 200)
	  	this.animateMod = 'close'
	 }

  	logout(event: Event) {
    	event.preventDefault()
    	// this.auth.logout()
    	// this.router.navigate(['/login'])
  	}

}
