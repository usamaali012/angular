import { Component } from "@angular/core";
 
@Component({
    selector: 'app-server',
    templateUrl: './server.component.html'
})
export class SeverComponent {
    serverId: number = 10;
    serverStatus: string = 'offlline';

    getServerStatus() {
        return this.serverStatus;
    }
}
 