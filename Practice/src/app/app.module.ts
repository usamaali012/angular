import { NgModule } from '@angular/core';
// import { HttpModule } from '@angular/http'
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SeverComponent } from './server/server.component';
import { ServersComponent } from './servers/servers.component'
 
@NgModule({
  declarations: [
    AppComponent,
    SeverComponent,
    ServersComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    // HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
