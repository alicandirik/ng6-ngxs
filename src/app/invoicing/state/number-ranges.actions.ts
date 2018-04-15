
// ACTIONS
import {NumberRangeDataModel} from '../models/number-range-data.model';

export class ClearNumberRangesState {
  static type = '[invoicing] number-ranges init';
}

export class QueryNumberRanges {
  static type = '[invoicing] number-ranges query';
}

// EVENTS
export class AddedNumberRange {
  static type = '[invoicing] number-range added';
  constructor(public payload: NumberRangeDataModel) {}
}

export class ModifiedNumberRange {
  static type = '[invoicing] number-range modified';
  constructor(public payload: NumberRangeDataModel) {}
}

export class RemovedNumberRange {
  static type = '[invoicing] number-range removed';
  constructor(public payload: NumberRangeDataModel) {}
}
