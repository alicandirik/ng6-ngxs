import {Action, State, StateContext, Store} from '@ngxs/store';
import {NumberRangesState} from './number-ranges.state';
import {ReceiversState} from './receivers.state';
import {ClearState} from './invoicing.actions';

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
    this.store.dispatch(new ClearState());
  }

  // COMMANDS
  @Action(ClearState)
  clear(sc: StateContext<InvoicingStateModel>) {
    sc.setState(defaults);
  }

}


