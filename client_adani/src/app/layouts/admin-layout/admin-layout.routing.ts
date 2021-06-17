import { Routes } from '@angular/router';
import { AuthGuard } from '../../_helpers';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent  ,canActivate: [AuthGuard] },
    // { path: 'user-profile',   component: UserProfileComponent,canActivate: [AuthGuard] },
    // { path: 'tables',         component: TablesComponent,canActivate: [AuthGuard] },
    { path: 'icons',          component: IconsComponent },
    // { path: 'maps',           component: MapsComponent,canActivate: [AuthGuard] }
];
