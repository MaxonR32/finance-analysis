import { Component, OnInit } from '@angular/core';
import { transition, trigger, state, style, animate } from '@angular/animations'

@Component({
  selector: 'full-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss'],
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
export class SiteLayoutComponent implements OnInit {

	changeText: boolean = true
	animateMod: string = 'close' 
  	links = [
    	{url: '/overview', name: 'Overview', img: 'view_carousel'},
    	{url: '/analytics', name: 'Analytics', img: 'bar_chart'},
    	{url: '/profile', name: 'Profile', img: 'supervised_user_circle'},
    	{url: '/list', name: 'My list', img: 'format_list_bulleted'},
    	{url: '/newAction', name: 'New', img: 'playlist_add'},
  	]

  constructor(
    // private auth: AuthServices,
    // private router: Router 
    ) {
  }

   ngOnInit(): void {
  
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
