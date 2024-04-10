import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListWorkspacesModule } from '@features/list-workspaces/list-workspaces.module';
import { CeWorkspacesModule } from '@features/ce-workspaces/ce-workspaces.module';
import { WorkspaceModule } from '@features/workspace/workspace.module';
import { ShareModule } from './share/share.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ListWorkspacesModule,
    CeWorkspacesModule,
    WorkspaceModule,
    ShareModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
