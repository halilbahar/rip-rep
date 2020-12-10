import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { ClassService } from './core/services/class.service';
import { ClassListComponent } from './pages/class-list/class-list.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ClassStatisticComponent } from './pages/class-statistic/class-statistic.component';
import { FooterComponent } from './core/footer/footer.component';
import { ChartTopFiveComponent } from './shared/components/charts/chart-top-five/chart-top-five.component';
import { AuthenticationService } from './core/services/authentication.service';
import { ChartTotalCommitsWeeklyComponent } from './shared/components/charts/chart-total-commits-weekly/chart-total-commits-weekly.component';
import { ChartTotalCommitsMonthlyComponent } from './shared/components/charts/chart-total-commits-monthly/chart-total-commits-monthly.component';
import { HeaderComponent } from './core/header/header.component';
import { ChartAverageCommitsDailyComponent } from './shared/components/charts/chart-average-commits-daily/chart-average-commits-daily.component';
import { CoreModule } from './core/core.module';
import { ChartConsistencyComponent } from './shared/components/charts/chart-consistency/chart-consistency.component';

@NgModule({
  declarations: [
    AppComponent,
    ClassListComponent,
    PageNotFoundComponent,
    ClassStatisticComponent,
    FooterComponent,
    ChartTopFiveComponent,
    ChartTotalCommitsWeeklyComponent,
    ChartTotalCommitsMonthlyComponent,
    HeaderComponent,
    ChartAverageCommitsDailyComponent,
    ChartConsistencyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GraphQLModule,
    ChartsModule,
    CoreModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (classSerivce: ClassService) => () => classSerivce.readClasses(),
      deps: [ClassService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (authenticationService: AuthenticationService) => () => authenticationService.checkAuthentication(),
      deps: [AuthenticationService],
      multi: true
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
