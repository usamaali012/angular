import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-servers',
	templateUrl: './servers.component.html',
  	styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
	allowNewServer = false;
	serverCreationStatus = 'No Server was created!';
	serverName = 'TestServer'

	constructor() {
		setTimeout(() => {
			this.allowNewServer = true;
		} ,2000)
	 }
	
	ngOnInit(): void {
	}

	onCreateServer() {
		this.serverCreationStatus = 'Server Was Created! Name is ' + this.serverName;
	}

	onUpdateServerName(event: Event) {
		this.serverName = (<HTMLInputElement>event.target).value                  // Explicitly Defining the type of HTMLelement from this event is coming. Because here "target" is of input element. TypeScript does NOT know it.
	}
}
 