import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentChangeAction} from 'angularfire2/firestore';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/internal/operators';

@Injectable()
export abstract class AbstractApiService {
  protected abstract readonly collectionName: string;

  protected constructor(protected afs: AngularFirestore) {}

  query(organization: string): Observable<DocumentChangeAction[]> {
    return this.afs.collection(this.collectionName, ref => ref.where('organization', '==', organization))
      .stateChanges()
      .pipe(
        catchError(err => [])
      );
  }

  queryAll(): Observable<DocumentChangeAction[]> {
    return this.afs.collection(this.collectionName).stateChanges()
      .pipe(
        catchError(err => [])
      );
  }
}
