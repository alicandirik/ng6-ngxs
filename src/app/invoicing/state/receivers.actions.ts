import {ReceiverDataModel} from '../models/receiver-data.model';


// ACTIONS
export class ClearReceiversState {
  static type = '[invoicing] receivers init';
}

export class QueryReceivers {
  static type = '[invoicing] receivers query';
  constructor(public payload: string) {}
}

// EVENTS
export class AddedReceiver {
  static type = '[invoicing] receiver added';
  constructor(public payload: ReceiverDataModel) {}
}

export class ModifiedReceiver {
  static type = '[invoicing] receiver modified';
  constructor(public payload: ReceiverDataModel) {}
}

export class RemovedReceiver {
  static type = '[invoicing] receiver removed';
  constructor(public payload: ReceiverDataModel) {}
}

