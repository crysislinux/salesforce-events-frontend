import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Ticket } from './ticket';

@Injectable()
export class TicketService {
  private ticketUrl = '/api/tickets';  // URL to web api

  constructor(private http: Http) { }

  save(ticket: Ticket) {
    let body = JSON.stringify(ticket);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.ticketUrl, body, options)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    let decodedError = error;
    if (error.json) {
      try {
        decodedError = error.json();
      } catch (e) {
        // do nothing
      }
    }
    return Promise.reject(decodedError.message || 'An error occurred');
  }
}
