import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { ClassService } from './core/services/class.service';
import { ClassListComponent } from './pages/class-list/class-list.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    ClassListComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GraphQLModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (classSerivce: ClassService) => () => classSerivce.readClasses(),
      deps: [ClassService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
