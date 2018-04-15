import {MessageMap} from '../../shared/models/message-map.model';

export const AUTH_MSGS: MessageMap = {
  'auth/wrong-password': { text: 'Anmeldung ist fehlgeschlagen. Bitte überprüfen Sie ihre Eingaben.', type: 'error' },
  'auth/user-not-found': { text: 'Anmeldung ist fehlgeschlagen.Bitte überprüfen Sie ihre Eingaben.', type: 'error' },
  'user-logged-out': { text: 'Sie haben sich abgemeldet.', type: 'info' }
};
