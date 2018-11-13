import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {MatTabsModule,MatMenuModule,MatNativeDateModule ,MatDatepickerModule,MatSnackBarModule,MatSelectModule,MatCardModule, MatCheckboxModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatTableModule, MatPaginatorModule, MatSortModule} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { DailytimesheetComponent } from './Timesheet/dailytimesheet/dailytimesheet.component';
import { jsonContentService } from "./service/general.service"

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    HttpClientModule,
    MatTabsModule,MatMenuModule,MatNativeDateModule ,MatDatepickerModule,MatSnackBarModule,MatSelectModule,MatCardModule, MatCheckboxModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatTableModule, MatPaginatorModule, MatSortModule,
    LayoutModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    HeaderComponent,
    
    

  ],
  providers: [jsonContentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
