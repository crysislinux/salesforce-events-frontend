import { Session } from './session';

export class Event {
  id: string;
  title: string;
  description: string;
  start: string;
  end: string;
  status: string;
  registrationLimit: number;
  remainingSeats: number;
  sessions: Session[];
}
