import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {AbstractApiService} from './abstract-api.service';

@Injectable()
export class NumberRangesApiService extends AbstractApiService {

  protected readonly collectionName = 'number-ranges';

  constructor(protected afs: AngularFirestore) {
    super(afs);
  }
}
