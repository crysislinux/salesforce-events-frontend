import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class TransformService {

  constructor() {}

  date(date: string) {
    // fix for safari (invalid date format)
    // fix for edge (see https://github.com/angular/angular/issues/9524)
    return moment(date).format('MMM Do, hh:mm a');
  }
}
