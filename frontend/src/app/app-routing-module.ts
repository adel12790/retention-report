import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RetentionDashboardPage } from './feature/retention/pages/retention-dashboard/retention-dashboard.page';

const routes: Routes = [
  { path: '', redirectTo: '/retention', pathMatch: 'full' },
  { path: 'retention', component: RetentionDashboardPage },
  { path: '**', redirectTo: '/retention' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
