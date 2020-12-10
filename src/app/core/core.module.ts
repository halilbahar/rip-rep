import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ApiRequestAvaiableInterceptor } from './interceptors/api-request-available.intercptor';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiRequestAvaiableInterceptor, multi: true
    }
  ],
})
export class CoreModule { }
