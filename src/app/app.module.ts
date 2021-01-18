import { MaterialModule } from './shared/material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from '../environments/environment';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { BoardComponent } from './dashboard/board/board.component';
import { AddIssueComponent } from './dashboard/add-issue/add-issue.component';
import { BoardItemComponent } from './dashboard/board-item/board-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgSelectModule } from '@ng-select/ng-select';
import { IssueComponent } from './dashboard/issue/issue.component';
import { FilterBarComponent } from './dashboard/filter-bar/filter-bar.component';
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    SidenavComponent,
    BoardComponent,
    AddIssueComponent,
    BoardItemComponent,
    IssueComponent,
    FilterBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FontAwesomeModule,
    NgSelectModule,
    NgxEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
