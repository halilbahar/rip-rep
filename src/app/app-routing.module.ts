import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassListComponent } from './pages/class-list/class-list.component';
import { ClassStatisticComponent } from './pages/class-statistic/class-statistic.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { UserQueryResolver } from './core/resolver/user-query.resolver';

const routes: Routes = [
  { path: '', component: ClassListComponent },
  { path: 'class/:name', component: ClassStatisticComponent, resolve: { userQueries: UserQueryResolver } },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
