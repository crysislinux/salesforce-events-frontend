import { Injectable }    from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Event } from './event';
import { NavigateService } from '../../shared';

@Injectable()
export class EventService {
  private eventsUrl = '/api/events';  // URL to web api
  private events: Event[] = [];
  private next: string;
  private previous: string;

  constructor(
    private http: Http,
    private navigate: NavigateService
  ) { }

  hasNextPage() {
    return !!this.next;
  }

  hasPreviousPage() {
    return !!this.previous;
  }

  loadNextPage() {
    if (!this.next) {
      Promise.resolve(this.events);
    }

    return this.loadPage(this.next);
  }

  getEvents(force = true) {
    if (!force) {
      return Promise.resolve(this.events);
    }
    this.events = [];
    this.next = '/api/events?page=1';
    return this.loadNextPage();
  }

  loadPage(nextPageUrl: string) {
    return this.http.get(nextPageUrl)
               .toPromise()
               .then(response => this.handleEventsResponse(response))
               .catch(this.handleError);
  }

  getEvent(id: string) {
    return this.http.get(`${this.eventsUrl}/${id}`)
               .toPromise()
               .then(response => response.json() as Event)
               .catch(this.handleError);
  }

  private handleEventsResponse(response) {
    const resp = response.json();
    this.events = [...this.events, ...resp.records];
    this.next = resp.next;
    this.previous = resp.previous;

    return resp.records;
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
