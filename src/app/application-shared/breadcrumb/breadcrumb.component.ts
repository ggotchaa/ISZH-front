import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, PRIMARY_OUTLET, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BreadcrumbData } from './breadcrumb.interface';


@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})

export class BreadcrumbComponent implements OnInit {
  breadcrumbs: { label: string; url: string }[] = [];

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // Listen to route changes and update the breadcrumb
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
      });
  }

  private createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: { label: string; url: string }[] = []
  ): { label: string; url: string }[] {
    const children: ActivatedRoute[] = route.children;
  
    if (children.length === 0) {
      return breadcrumbs;
    }
  
    // Reset the url for the current level of the breadcrumbs
    let currentUrl = url;
  
    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        // Append the current segment to the URL only if it's not empty
        currentUrl += currentUrl === '' ? `${routeURL}` : `/${routeURL}`;
      }
  
      const label = (child.snapshot.data as BreadcrumbData).breadcrumb;
      if (label !== undefined) {
        breadcrumbs.push({ label, url: currentUrl });
      }
  
      // Recursively generate breadcrumbs for child routes, preserving the current URL
      const updatedBreadcrumbs = this.createBreadcrumbs(child, currentUrl, breadcrumbs);
  
      // If the recursive call returns any breadcrumbs, add them to the current breadcrumbs
      if (updatedBreadcrumbs.length > 0) {
        breadcrumbs = [...breadcrumbs, ...updatedBreadcrumbs];
      }
    }
  
    return breadcrumbs;
  }
  
  
  
}
