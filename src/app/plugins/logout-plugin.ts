import {getActionTypeFromInstance} from '@ngxs/store';
import {Logout} from '../state/app.actions';

export function logoutPlugin(state, action, next) {
  // use the action type helper to determine the type
  if (getActionTypeFromInstance(action) === Logout.type) {
    // erase all protected states
    if (state['invoicing']) {
      state['invoicing'] = {};
    }
  }
  return next(state, action);
}
