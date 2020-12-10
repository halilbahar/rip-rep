import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AvaiableApiPointsService } from '../services/avaiable-api-points.service';

@Injectable()
export class ApiRequestAvaiableInterceptor implements HttpInterceptor {

  constructor(
    private avaiableApiPointsService: AvaiableApiPointsService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(event => {
        if (req.url === 'https://api.github.com/graphql' && event instanceof HttpResponse) {
          const limit = +event.headers.get('X-RateLimit-Limit')!;
          const remaining = +event.headers.get('X-RateLimit-Remaining')!;
          const reset = +event.headers.get('X-RateLimit-Reset')!;

          this.avaiableApiPointsService.availablePoints.next(limit);
          this.avaiableApiPointsService.remainingPoints.next(remaining);
          this.avaiableApiPointsService.resetTimeStamp.next(reset);
        }
      })
    );
  }
}
