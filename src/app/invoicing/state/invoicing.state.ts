import {Action, State, StateContext, Store} from '@ngxs/store';
import {AppState} from '../../state/app.state';
import {NumberRangesState} from './number-ranges.state';
import {ReceiversState} from './receivers.state';
import {ClearInvoicingState} from './invoicing.actions';
import {LogoutSuccess} from '../../state/app.actions';
import {AuthService} from '../../auth/services/auth.service';
import {UiService} from '../../shared/services/ui-service';
import {Router} from '@angular/router';

export interface InvoicingStateModel {
  current?: any;
  isDirty?: boolean;
  isLoading?: boolean;
  isLoaded?: boolean;
}

const defaults = { current: null, isDirty: false, isLoading: false, isLoaded: false };

@State<InvoicingStateModel>({
  name: 'invoicing',
  defaults: defaults,
  children: [
    NumberRangesState,
    ReceiversState
  ]
})

export class InvoicingState {

  constructor(private store: Store) {}

  onInit() {
    console.log('Store: ', this.store);
    this.store.dispatch(new ClearInvoicingState());
  }

  // COMMANDS
  @Action(ClearInvoicingState)
  clear(sc: StateContext<InvoicingStateModel>) {
    sc.setState(defaults);
  }

}


