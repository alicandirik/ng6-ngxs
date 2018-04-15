import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {UserModel} from '../../shared/models/user.model';
import {Select, Store} from '@ngxs/store';
import {AppState} from '../../state/app.state';
import {Logout} from '../../state/app.actions';

@Component({
  selector: 'navi-header',
  templateUrl: './navi-header.component.html',
  styleUrls: ['./navi-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NaviHeaderComponent {
  @Output('toggle') toggle = new EventEmitter<void>();

  @Select(AppState.getLoggedInUser) authUser$: Observable<UserModel>;

  constructor(private store: Store) { }

  onLogout() {
    this.store.dispatch(new Logout());
  }

  onToggle() {
    this.toggle.emit();
  }

  logAuth() {
    this.authUser$.subscribe(authUser => {
      console.log(authUser);
    });
  }
}
