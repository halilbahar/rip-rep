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
import { ChartTopFiveWeeklyComponent } from './shared/components/charts/chart-top-five-weekly/chart-top-five-weekly.component';
import { AuthenticationService } from './core/services/authentication.service';


@NgModule({
  declarations: [
    AppComponent,
    ClassListComponent,
    PageNotFoundComponent,
    ClassStatisticComponent,
    FooterComponent,
    ChartTopFiveWeeklyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GraphQLModule,
    ChartsModule
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
