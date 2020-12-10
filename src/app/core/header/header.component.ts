import { Component, OnInit } from '@angular/core';
import { ActivationEnd, NavigationEnd, Params, Router } from '@angular/router';
import { Breadcrumb } from '../../shared/models/breadcrumb.model';
import { AvaiableApiPointsService } from '../services/avaiable-api-points.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  breadcrumbs: Breadcrumb[] = [];
  remainingTime: string = '';
  private remainingMilliseconds: number = -1;
  private interval: NodeJS.Timeout;

  constructor(
    private router: Router,
    public avaiableApiPointsService: AvaiableApiPointsService
  ) { }

  ngOnInit(): void {
    this.avaiableApiPointsService.resetTimeStamp.subscribe(timeStamp => {
      // Ignore the first value of the behaviour subject
      if (timeStamp === -1) { return; }
      // Clear the interval if a new date is present
      if (this.interval != null) {
        clearInterval(this.interval);
      }

      const resetDate = new Date(timeStamp * 1000);
      this.interval = setInterval(() => {
        const now = new Date();
        this.remainingMilliseconds = resetDate.getTime() - now.getTime();

        const removeTrail = function (value: number) {
          let valueString;
          if (value < 10) {
            valueString = "0" + value;
          }
          return (valueString || value).toString().split(".")[0];
        }

        let seconds = (this.remainingMilliseconds / 1000) % 60;
        let minutes = (this.remainingMilliseconds / (1000 * 60)) % 60;
        const minutesString = removeTrail(minutes);
        const secondsString = removeTrail(seconds);
        this.remainingTime = minutesString + ":" + secondsString;

        if (this.remainingMilliseconds < 0) {
          clearInterval(this.interval);
        }
      }, 1000);
    });

    let segments: { path: string; params: Params, usePathParamAsTitle: boolean }[] = [];

    this.router.events.subscribe(event => {
      if (event instanceof ActivationEnd) {
        const route = event.snapshot;
        segments.unshift({
          // @ts-ignore
          path: route.routeConfig.path,
          params: route.params,
          usePathParamAsTitle: route.data.usePathParamAsTitle
        });
      }

      if (event instanceof NavigationEnd) {
        const breadcrumbs: Breadcrumb[] = [];

        let link = '';
        for (const segment of segments) {
          let path = segment.path;
          if (path === '') {
            continue;
          }


          const pathParamValues: string[] = [];
          // Itterate over the object that contains the path param and
          // replace the placeholder with the actual value: /path/:id => /path/1
          const params = segment.params;
          for (const key in params) {
            if (params.hasOwnProperty(key)) {
              const value = segment.params[key];
              pathParamValues.push(value);
              path = path.replace(`:${key}`, value);
            }
          }

          // Use the values /path/5ahitm => 5ahitm or remove any path param associated with the path: /path/:id => /path
          const title = segment.usePathParamAsTitle ? pathParamValues.join(' ') : path.replace(/\/:\w+/, '');

          link += `/${path}`;
          breadcrumbs.push({ link, title });
        }

        this.breadcrumbs = breadcrumbs;
        segments = [];
      }
    });
  }
}
