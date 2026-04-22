import { Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page.component';
import { ExportPageComponent } from './pages/export-page.component';
import { HomePageComponent } from './pages/home-page.component';
import { ManagementPageComponent } from './pages/management-page.component';
import { ProjectDetailPageComponent } from './pages/project-detail-page.component';
import { RequirementsPageComponent } from './pages/requirements-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'requirements', component: RequirementsPageComponent },
  { path: 'management', component: ManagementPageComponent },
  { path: 'management/:projectId', component: ProjectDetailPageComponent },
  { path: 'dashboard', component: DashboardPageComponent },
  { path: 'export', component: ExportPageComponent },
  { path: '**', redirectTo: '' }
];
