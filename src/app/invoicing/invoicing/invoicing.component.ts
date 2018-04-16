import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {ClearInvoicingState} from '../state/invoicing.actions';
import {Observable} from 'rxjs';
import {UserModel} from '../../shared/models/user.model';
import {take} from 'rxjs/internal/operators';
import {QueryReceivers} from '../state/receivers.actions';
import {QueryNumberRanges} from '../state/number-ranges.actions';
import {AppState} from '../../state/app.state';

@Component({
  selector: 'invoicing',
  templateUrl: './invoicing.component.html',
  styleUrls: ['./invoicing.component.scss']
})
export class InvoicingComponent implements OnInit, OnDestroy {

  @Select(AppState.getLoggedInUser) authUser$: Observable<UserModel>;

  constructor(private store: Store) { }

  ngOnInit() {
   this.authUser$.pipe(take(1)).subscribe(authUser => this.store.dispatch([
     new QueryNumberRanges(),
     new QueryReceivers(authUser.organization)
   ]));
  }

  ngOnDestroy() {
    // this.store.dispatch(new ClearInvoicingState());
  }

}
