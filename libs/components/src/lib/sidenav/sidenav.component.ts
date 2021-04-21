import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'full-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

	changeText: boolean = true
  animateMod: string = 'close' 
  links = [
	    {url: '/overview', name: 'Overview', img: 'view_carousel'},
	    {url: '/analytics', name: 'Analytics', img: 'bar_chart'},
	    {url: '/profile', name: 'Profile', img: 'supervised_user_circle'},
	    {url: '/list', name: 'My list', img: 'format_list_bulleted'},
	    {url: '/new', name: 'New Action', img: 'playlist_add'},
	]

  	constructor(
   		// private auth: AuthServices,
   		private router: Router 
    	) { }

   	ngOnInit(): void {
  
  	}

    sleep() {
      console.log('Works')
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
    	this.router.navigate(['/login'])
  }


}
