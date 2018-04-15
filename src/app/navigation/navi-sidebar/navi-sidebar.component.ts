import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {Select} from '@ngxs/store';
import {Observable} from 'rxjs';
import {UserModel} from '../../shared/models/user.model';
import {AppState} from '../../state/app.state';

@Component({
  selector: 'navi-sidebar',
  templateUrl: './navi-sidebar.component.html',
  styleUrls: ['./navi-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NaviSidebarComponent {
  @Output('close') close = new EventEmitter<void>();

  @Select(AppState.getLoggedInUser) authUser$: Observable<UserModel>;

  constructor() { }

  onClose() {
    this.close.emit();
  }
}
