import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListWorkspacesModule } from '@features/list-workspaces/list-workspaces.module';
import { CeWorkspacesModule } from '@features/ce-workspaces/ce-workspaces.module';
import { WorkspaceModule } from '@features/workspace/workspace.module';
import { ShareModule } from './share/share.module';
import { HttpClientModule } from '@angular/common/http';
import { TestsModule } from './features/tests/tests.module';

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
    ReactiveFormsModule,
    TestsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
