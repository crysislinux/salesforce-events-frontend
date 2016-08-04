import { provideRouter, RouterConfig }  from '@angular/router';
import { EventListComponent, EventDetailComponent } from './events';

const routes: RouterConfig = [
  {
    path: '',
    redirectTo: '/events',
    pathMatch: 'full'
  }, {
    path: 'events',
    component: EventListComponent,
  }, {
    path: 'events/:id',
    component: EventDetailComponent
  },
];

export const appRouterProviders = [
  provideRouter(routes)
];
