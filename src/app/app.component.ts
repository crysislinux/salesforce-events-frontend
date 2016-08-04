import { Component }       from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';
import { MdToolbar } from '@angular2-material/toolbar';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';

import { EventService } from './events';

@Component({
  moduleId: module.id,
  selector: 'bt-app',
  templateUrl: 'app.component.html',
  directives: [ROUTER_DIRECTIVES, MdIcon, MdToolbar, MD_BUTTON_DIRECTIVES],
  styleUrls: ['app.component.css'],
  providers: [EventService, MdIconRegistry],
})
export class AppComponent {

}
