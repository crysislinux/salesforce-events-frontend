import { Injectable } from '@angular/core';
import { Router, NavigationStart }  from '@angular/router';
import { Location } from '@angular/common';

enum LastChangeType {
  Route = 1,
  Pop
}

/**
 * Notice: NavigateService.isPop() depends on the order of Router and Location events.
 */

@Injectable()
export class NavigateService {
  private lastChangeType: LastChangeType = LastChangeType.Route;
  private scrollPositions = {};

  constructor(
    private router: Router,
    private location: Location
  ) {

    this.router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        this.lastChangeType = LastChangeType.Route;
      }
    });

    this.location.subscribe((value) => {
      if (value && value.pop) {
        this.lastChangeType = LastChangeType.Pop;
      }
    });
  }

  isPop() {
    return this.lastChangeType === LastChangeType.Pop;
  }

  isRoute() {
    return this.lastChangeType === LastChangeType.Route;
  }

  updateScrollPosition(id, position) {
    this.scrollPositions[id] = position;
  }

  getScrollPosition(id) {
    return this.scrollPositions[id];
  }
}
