import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { DailytimesheetComponent } from '../../Timesheet/dailytimesheet/dailytimesheet.component';
import { EdittimesheetComponent } from '../../Timesheet/edittimesheet/edittimesheet.component';
import { NonworksheetComponent } from '../../Timesheet/nonworksheet/nonworksheet.component';
import { TimesheetmanagerComponent } from './../../tabs/timesheetmanager/timesheetmanager.component';
import { AddmanagerComponent } from './../../tabs/timesheetmanager/addmanager/addmanager.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'table-list', component: TableListComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'daily-sheet', component: DailytimesheetComponent },
    { path: 'edit-sheet', component: EdittimesheetComponent },
    { path: 'nonwork-sheet', component: NonworksheetComponent },
    { path: 'nonwork-sheet', component: NonworksheetComponent },
    { path: 'manager-sheet', component: TimesheetmanagerComponent },
    { path: 'add-manager-sheet', component: AddmanagerComponent },
];
