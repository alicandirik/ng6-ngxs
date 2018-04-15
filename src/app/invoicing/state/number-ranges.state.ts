import {Action, State, StateContext, Store} from '@ngxs/store';
import {NumberRangeDataModel} from '../models/number-range-data.model';
import {
  AddedNumberRange,
  ClearNumberRangesState,
  ModifiedNumberRange,
  QueryNumberRanges,
  RemovedNumberRange
} from './number-ranges.actions';
import {map, mergeMap} from 'rxjs/internal/operators';
import {NumberRangesApiService} from '../services/number-ranges-api.service';

export interface NumberRangesStateModel {
  isLoading: boolean;
  isLoaded: boolean;
  numberRanges: NumberRangeDataModel[];
}

const defaults = { isLoading: false, isLoaded: false, numberRanges: [] };
@State({
  name: 'numberRanges',
  defaults: defaults
})
export class NumberRangesState {
  constructor(private store: Store,
              private service: NumberRangesApiService) {}

  // DISPATCH query on startup
  onInit() {
    // this.store.dispatch([new ClearNumberRangesState(), new QueryNumberRanges()]);
    this.store.dispatch(new ClearNumberRangesState());
  }

  // COMMANDS
  @Action(ClearNumberRangesState)
  clear(sc: StateContext<NumberRangesStateModel>) {
    sc.setState(defaults);
  }

  @Action(QueryNumberRanges)
  queryNumberRanges(sc: StateContext<NumberRangesStateModel>) {
    return this.service.queryAll()
      .pipe(
        mergeMap(actions => actions),
        map(action => {
          const payload = { ...action.payload.doc.data(), id: action.payload.doc.id };
          switch (action.type) {
            case 'added':
              sc.dispatch(new AddedNumberRange(payload));
              break;
            case 'modified':
              sc.dispatch(new ModifiedNumberRange(payload));
              break;
            case 'removed':
              sc.dispatch(new ModifiedNumberRange(payload));
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
  @Action(AddedNumberRange)
  add(sc: StateContext<NumberRangesStateModel>, event: AddedNumberRange) {
    const state = sc.getState();
    sc.patchState({ isLoading: false, isLoaded: true, numberRanges: [...state.numberRanges, event.payload]});
  }

  @Action(ModifiedNumberRange)
  modify(sc: StateContext<NumberRangesStateModel>, event: ModifiedNumberRange) {
    const state = sc.getState();
    sc.patchState({ numberRanges: [...state.numberRanges.filter(nr => nr.id !== event.payload.id), event.payload]});
  }

  @Action(RemovedNumberRange)
  remove(sc: StateContext<NumberRangesStateModel>, event: RemovedNumberRange) {
    const state = sc.getState();
    sc.patchState({ numberRanges: [...state.numberRanges.filter(nr => nr.id !== event.payload.id)]});
  }
}

