import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserWorkspacesModule } from '@features/userWorkspaces/user-workspaces.module'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserWorkspacesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
