import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';
import { MdToolbar } from '@angular2-material/toolbar';
import { MdCheckbox } from '@angular2-material/checkbox';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';

import { Event } from '../../events';
import { TicketService, Ticket, validateSessions } from '../shared';
import { TransformService } from '../../shared';

@Component({
  moduleId: module.id,
  selector: 'bt-register-mobile',
  templateUrl: 'register-mobile.component.html',
  styleUrls: ['register-mobile.component.css'],
  directives: [
    MdToolbar, MdIcon, MdCheckbox,
    MD_BUTTON_DIRECTIVES, MD_CARD_DIRECTIVES, MD_INPUT_DIRECTIVES,
    FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES,
  ],
  providers: [MdIconRegistry, TicketService],
})
export class RegisterMobileComponent implements OnInit, OnDestroy {
  @Input() event: Event;
  @Output() onRegisterSuccess = new EventEmitter<boolean>();
  showing: boolean;
  submitting: boolean;
  buttonText: string = 'Register';
  formCache: FormGroup;
  errors: string[] = [];
  notifications: string[] = [];
  submitSuccess: boolean = false;

  constructor(
    private ticketService: TicketService,
    private fb: FormBuilder,
    private router: Router,
    private ts: TransformService
  ) {}

  get hasMessage() {
    return this.errors.length > 0 || this.notifications.length > 0;
  }

  get form() {
    if (!this.formCache) {
      const sessions = this.event.sessions;
      const sessionGroup: any = {};
      sessions.forEach(session => {
        sessionGroup[session.id] = [false];
      });
      this.formCache = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        phone: ['', Validators.required],
        company: ['', Validators.required],
        sessions: this.fb.group(sessionGroup, {
          validator: validateSessions
        }),
      });
    }

    return this.formCache;
  }

  get available() {
    return this.event && this.showing;
  }

  ngOnInit() {
    //
  }

  ngOnDestroy() {
    this.restoreBodyScroll();
  }

  disableBodyScroll() {
    const el = document.body;
    const className = 'modal-opened';
    if (el.classList) {
      el.classList.add(className);
    } else {
      el.className += ' ' + className;
    }
  }

  restoreBodyScroll() {
    const el = document.body;
    const className = 'modal-opened';
    if (el.classList) {
      el.classList.remove(className);
    } else {
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  }

  open() {
    this.disableBodyScroll();
    this.showing = true;
  }

  close() {
    this.restoreBodyScroll();
    this.showing = false;
  }

  createTicketFromValue(value) {
    const ticket = new Ticket();
    ticket.event = this.event.id;
    ticket.sessions = [];
    ['firstName', 'lastName', 'email', 'phone', 'company'].forEach(attr => {
      ticket[attr] = value[attr];
    });
    for (let sessionId in value.sessions) {
      if (value.sessions.hasOwnProperty(sessionId) && value.sessions[sessionId] === true) {
        ticket.sessions.push(sessionId);
      }
    }

    return ticket;
  }

  clearMessages() {
    this.notifications = [];
    this.errors = [];
    if (this.submitSuccess) {
      this.close();
    }
  }

  private reset() {
    this.submitting = false;
    this.buttonText = 'Register';
  }

  submit(value) {
    this.submitting = true;
    this.buttonText = 'Submitting';

    const ticket = this.createTicketFromValue(value);

    this.ticketService
      .save(ticket)
      .then(data => {
        this.reset();
        this.notifications.push('You have successfully registered.');
        this.notifications.push('Please check your email to get the details of your registration.');
        this.submitSuccess = true;
        this.onRegisterSuccess.emit(true);
      })
      .catch(error => {
        this.reset();
        if (Array.isArray(error)) {
          this.errors = error;
        } else {
          this.errors.push(error);
        }
      });
  }
}
