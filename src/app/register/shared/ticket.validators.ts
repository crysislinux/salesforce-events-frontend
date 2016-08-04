import { FormGroup } from '@angular/forms';

export function validateSessions(c: FormGroup) {
  const value = c.value;

  for (let sessionId in value) {
    if (value.hasOwnProperty(sessionId) && value[sessionId] === true) {
      return null;
    }
  }

  return { empty: true };
}
