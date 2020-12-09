import {Component, OnInit} from '@angular/core';
import {ActivationEnd, NavigationEnd, Params, Router} from '@angular/router';
import {Breadcrumb} from '../../shared/models/breadcrumb.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  breadcrumbs: Breadcrumb[] = [];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
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
          breadcrumbs.push({link, title});
        }

        this.breadcrumbs = breadcrumbs;
        segments = [];
      }
    });
  }

}
