import {Component} from '@angular/core';
import {Select} from '@ngxs/store';
import {UserModel} from './shared/models/user.model';
import {Observable} from 'rxjs';
import {AppState} from './state/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @Select(AppState.getLoggedInUser) authUser$: Observable<UserModel>;
  @Select() isPending$: Observable<boolean>;
}
