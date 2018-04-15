import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {AbstractApiService} from './abstract-api.service';

@Injectable()
export class ReceiversApiService extends AbstractApiService {

  protected readonly collectionName = 'receivers';

  constructor(protected afs: AngularFirestore) {
    super(afs);
  }

}
