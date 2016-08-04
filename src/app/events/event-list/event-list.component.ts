import { Component, OnInit, HostListener } from '@angular/core';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MdProgressCircle, MdSpinner } from '@angular2-material/progress-circle/progress-circle';
import { Router }  from '@angular/router';

import { Event, EventService } from '../shared';
import { TransformService, NavigateService } from '../../shared';

@Component({
  moduleId: module.id,
  selector: 'bt-event-list',
  templateUrl: 'event-list.component.html',
  styleUrls: ['event-list.component.css'],
  directives: [MD_CARD_DIRECTIVES, MD_BUTTON_DIRECTIVES, MdProgressCircle, MdSpinner],
})

export class EventListComponent implements OnInit {
  events: Event[];
  loading: boolean;
  error: any;

  constructor(
    private router: Router,
    private eventService: EventService,
    private ts: TransformService,
    private navigate: NavigateService) {}

  @HostListener('window:scroll', ['$event'])
    updateScrollPosition(event) {
    this.navigate.updateScrollPosition(module.id, [document.body.scrollLeft, document.body.scrollTop]);
  }

  ngOnInit() {
    this.getEvents(this.navigate.isRoute());
    if (this.navigate.isPop()) {
      const position = this.navigate.getScrollPosition(module.id);
      if (position) {
        // we need this setTimeout trick to make it work
        setTimeout(() => {
          window.scrollTo.apply(window, position);
        });
      }
    }
  }

  get showLoadMoreButton()  {
    return this.events;
  }

  get loadMoreButtonText() {
    if (this.loading) {
      return 'Loading';
    }

    return this.hasNextPage ? 'Load More' : 'No More Events';
  }

  get hasPreviousPage() {
    return this.eventService.hasPreviousPage();
  }

  get hasNextPage() {
    return this.eventService.hasNextPage();
  }

  loadNextPage() {
    this.loading = true;
    this.eventService
      .loadNextPage()
      .then(events => {
        this.events = [...this.events, ...events];
        this.loading = false;
      })
      .catch(error => {
        this.error = error;
        this.loading = false;
      });
  }

  getEvents(force: boolean) {
    this.loading = true;
    this.eventService
      .getEvents(force)
      .then(events => {
        this.events = events;
        this.loading = false;
      })
      .catch(error => {
        this.error = error;
        this.loading = false;
      });
  }

  gotoDetail(event: Event) {
    let link = ['/events', event.id];
    this.router.navigate(link);
  }
}
