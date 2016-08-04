import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MdProgressCircle, MdSpinner } from '@angular2-material/progress-circle/progress-circle';

import { Event, EventService } from '../shared';
import { RegisterMobileComponent } from '../../register';
import { TransformService } from '../../shared';

@Component({
  moduleId: module.id,
  selector: 'bt-event-detail',
  templateUrl: 'event-detail.component.html',
  styleUrls: ['event-detail.component.css'],
  directives: [MD_BUTTON_DIRECTIVES, RegisterMobileComponent,
    MD_CARD_DIRECTIVES, MD_TOOLBAR_DIRECTIVES, MdProgressCircle, MdSpinner],
})
export class EventDetailComponent implements OnInit, OnDestroy {
  event: Event;
  loading: boolean;
  hasError: boolean;
  sub: any;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private ts: TransformService) {}

  ngOnInit() {
    this.loading = true;
    this.hasError = false;
    this.sub = this.route.params.subscribe(params => {
      let id = params['id'];
      this.eventService.getEvent(id)
        .then(event => {
          this.event = event;
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          this.hasError = true;
        });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onRegisterSuccess(success: boolean) {
    if (success) {
      this.eventService.getEvent(this.event.id)
        .then(event => this.event = event);
    }
  }
}
