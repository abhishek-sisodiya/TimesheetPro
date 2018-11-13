import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { DailytimesheetComponent } from '../../Timesheet/dailytimesheet/dailytimesheet.component';
import {MatTabsModule,MatMenuModule,MatNativeDateModule ,MatDatepickerModule,MatSnackBarModule,MatSelectModule,MatCardModule, MatCheckboxModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatTableModule, MatPaginatorModule, MatSortModule} from '@angular/material';
import { jsonContentService } from "../../service/general.service"
import { EdittimesheetComponent } from '../../Timesheet/edittimesheet/edittimesheet.component';
import { NonworksheetComponent } from '../../Timesheet/nonworksheet/nonworksheet.component';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatTooltipModule,
} from '@angular/material';
@NgModule({
  imports: [
    MatTabsModule,MatMenuModule,MatNativeDateModule ,MatDatepickerModule,MatSnackBarModule,MatSelectModule,MatCardModule, MatCheckboxModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatTableModule, MatPaginatorModule, MatSortModule,
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatTooltipModule,
  ],
  declarations: [
    NonworksheetComponent,
    EdittimesheetComponent,
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    NotificationsComponent,
    DailytimesheetComponent,
  ],
  // providers: [jsonContentService],
})

export class AdminLayoutModule {}
