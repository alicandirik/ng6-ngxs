import {Action, Select, State, StateContext, Store} from '@ngxs/store';
import {ReceiverDataModel} from '../models/receiver-data.model';
import {map, mergeMap, take} from 'rxjs/internal/operators';
import {ClearState} from './invoicing.actions';
import {AppState} from '../../state/app.state';
import {Observable} from 'rxjs';
import {UserModel} from '../../shared/models/user.model';
import {AddedReceiver, ModifiedReceiver, QueryReceivers, RemovedReceiver} from './receivers.actions';
import {ReceiversApiService} from '../services/receivers-api.service';

export interface ReceiversStateModel {
  isLoading: boolean;
  isLoaded: boolean;
  receivers: ReceiverDataModel[];
}

const defaults = { isLoading: false, isLoaded: false, receivers: [] };
@State<ReceiversStateModel>({
  name: 'receivers',
  defaults: defaults
})

export class ReceiversState {

  @Select(AppState.getLoggedInUser) authUser$: Observable<UserModel>;

  constructor(private store: Store,
              private service: ReceiversApiService) {}

  // DISPATCH query on startup
  onInit() {
    this.authUser$.pipe(take(1)).subscribe(authUser => this.store.dispatch([new ClearState(), new QueryReceivers(authUser.organization)]));
  }

  // COMMANDS
  @Action(ClearState)
  clear(sc: StateContext<ReceiversStateModel>) {
    sc.setState(defaults);
  }

  @Action(QueryReceivers)
  query(sc: StateContext<ReceiversStateModel>, event: QueryReceivers) {
    return this.service.query(event.payload)
      .pipe(
        mergeMap(actions => actions),
        map(action => {
          const payload = { ...action.payload.doc.data(), id: action.payload.doc.id };
          switch (action.type) {
            case 'added':
              sc.dispatch(new AddedReceiver(payload));
              break;
            case 'modified':
              sc.dispatch(new ModifiedReceiver(payload));
              break;
            case 'removed':
              sc.dispatch(new RemovedReceiver(payload));
              break;
            default:
              console.error(`Wrong action type from query: ${action.type}`);
              break;
          }
          return;
        })
      );
  }

  // EVENTS
  @Action(AddedReceiver)
  add(sc: StateContext<ReceiversStateModel>, event: AddedReceiver) {
    const state = sc.getState();
    sc.patchState({ isLoading: false, isLoaded: true, receivers: [...state.receivers, event.payload]});
  }

  @Action(ModifiedReceiver)
  modify(sc: StateContext<ReceiversStateModel>, event: ModifiedReceiver) {
    const state = sc.getState();
    sc.patchState({ receivers: [...state.receivers.filter(r => r.id !== event.payload.id), event.payload]});
  }

  @Action(RemovedReceiver)
  remove(sc: StateContext<ReceiversStateModel>, event: RemovedReceiver) {
    const state = sc.getState();
    sc.patchState({ receivers: [...state.receivers.filter(r => r.id !== event.payload.id)]});
  }
}
