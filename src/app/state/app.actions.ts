import {UserModel} from '../shared/models/user.model';
import {MessageModel} from '../shared/models/message.model';
import {ConfirmationPopupModel} from '../shared/models/confirmation-popup.model';

// ACTIONS
export class ClearState {
  static type = '[app] init';
}

export class CheckSession {
  static type = '[app] check session';
}

export class LoginWithEmailAndPassword {
  static type = '[app] login with email and password';
  constructor(public email: string, public password: string) {}
}

export class Logout {
  static type = '[app] logout';
}

// EVENTS
export class LoginRedirect {
  static type = '[app] login redirect';
}

export class LoginSuccess {
  static type = '[app] login success';
  constructor(public authUser: UserModel) {}
}

export class LoginFailed {
  static type = '[app] login failed';
  constructor(public error: any) {}
}

export class LogoutSuccess {
  static type = '[app] logout success';
}

export class DisplayMessage {
  static type = '[app] display message';
  constructor(public message: MessageModel) {}
}

export class DisplayConfirmation {
  static type = '[app] display confirmation';
  constructor(public config: ConfirmationPopupModel) {}
}

