import { Routes } from '@angular/router';
import { AuthGuard } from '../../_helpers';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { DashboardNewComponent } from 'src/app/dashboard-new/dashboard-new.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent  ,canActivate: [AuthGuard] },
    { path: 'StatusReport',   component: DashboardNewComponent,canActivate: [AuthGuard] },
    // { path: 'tables',         component: TablesComponent,canActivate: [AuthGuard] },
    { path: 'icons',          component: IconsComponent },
    // { path: 'maps',           component: MapsComponent,canActivate: [AuthGuard] }
];
