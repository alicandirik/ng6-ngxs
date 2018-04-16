import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {UserModel} from '../shared/models/user.model';
import {filter, tap} from 'rxjs/internal/operators';
import {Router} from '@angular/router';
import {AuthService} from '../auth/services/auth.service';
import {Navigate} from './router.actions';
import {
  CheckSession, ClearAppState, DisplayConfirmation,
  DisplayMessage,
  LoginFailed,
  LoginRedirect,
  LoginSuccess,
  LoginWithEmailAndPassword,
  Logout,
  LogoutSuccess
} from './app.actions';
import {MessageModel} from '../shared/models/message.model';
import {UiService} from '../shared/services/ui-service';
import {AUTH_MSGS} from '../auth/messages/auth-messages';
import {Messages} from '../shared/models/messages.model';

export interface AppStateModel {
  authUser: UserModel;
  message: MessageModel;
  isPending: boolean;
}

const defaults = { authUser: null, message: null, isPending: false };

@State<AppStateModel>({
  name: 'app',
  defaults: defaults
})

export class AppState {
  messages = new Messages(AUTH_MSGS);

  constructor(private store: Store,
              private router: Router,
              private authService: AuthService,
              private uiService: UiService) {
  }

  // SELECTORS
  @Selector()
  static getLoggedInUser(state: AppStateModel) {
    return state.authUser;
  }

  // DISPATCH CheckSession on startup
  onInit() {
    this.store.dispatch([ new ClearAppState(), new CheckSession()]);
  }

  // COMMANDS
  @Action(ClearAppState)
  clear(sc: StateContext<AppStateModel>) {
    sc.setState(defaults);
  }

  @Action(CheckSession, { cancelUncompleted: true })
  checkSession(sc: StateContext<AppStateModel>) {
    return this.authService.queryAuth()
      .pipe(
        tap((user: UserModel) => {
          if (user) {
            sc.dispatch(new LoginSuccess(user));
            return;
          }
          sc.dispatch(new LoginRedirect());
          return;
        })
      );
  }

  @Action(LoginWithEmailAndPassword)
  loginWithEmailAndPassword(sc: StateContext<AppStateModel>, action: LoginWithEmailAndPassword) {
    sc.patchState({ isPending: true });
    this.authService.loginWithEmailAndPassword(action.email, action.password)
      .then((user: any) => {
        sc.dispatch(new LoginSuccess(user));
      })
      .catch(error => {
        sc.dispatch(new LoginFailed(error));
      });
  }

  @Action(Logout)
  logout(sc: StateContext<AppStateModel>) {
    // use setState after state has been totally cleared in plugin
    sc.setState({ authUser: null, message: null, isPending: false });
    this.authService.logout()
      .then(() => sc.dispatch(new LogoutSuccess()));
  }

  @Action(DisplayMessage)
  displayMessage(sc: StateContext<AppStateModel>, event: DisplayMessage) {
    this.uiService.openSnackBar(event.message);
  }

  @Action(DisplayConfirmation)
  displayConfirmation(sc: StateContext<AppStateModel>, event: DisplayConfirmation) {
    return this.uiService.openConfirmationDialog(event.config)
      .pipe(
        filter(response => response.reply),
        tap(response => {
          sc.dispatch(response.do);
          return;
        })
      );
  }

  // EVENTS
  @Action(LoginSuccess)
  onLoginSuccess(sc: StateContext<AppStateModel>) {
    sc.dispatch(new Navigate('/'));
  }

  @Action(LoginSuccess)
  setUserStateOnSuccess(sc: StateContext<AppStateModel>, event: LoginSuccess) {
    sc.patchState({ authUser: event.authUser, isPending: false, message: null });
  }

  @Action(LoginRedirect)
  onLoginRedirect(sc: StateContext<AppStateModel>) {
    sc.dispatch(new Navigate('/login'));
  }

  @Action(LoginFailed)
  setUserStateOnFailure(sc: StateContext<AppStateModel>, event: LoginFailed) {
    sc.patchState({ authUser: undefined, isPending: false });
    sc.dispatch(new DisplayMessage(event.error.message));
  }

  @Action(LogoutSuccess)
  setUserStateOnLogout(sc: StateContext<AppStateModel>) {
    // sc.patchState({ authUser: undefined, isPending: false });
    sc.dispatch([
      new LoginRedirect(),
      new DisplayMessage(this.messages.getMessage('user-logged-out'))
    ]);
  }
}

