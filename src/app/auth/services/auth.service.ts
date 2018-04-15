import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {UserModel} from '../../shared/models/user.model';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestore} from 'angularfire2/firestore';
import {catchError, filter, map, switchMap, take, tap} from 'rxjs/internal/operators';
import {fromPromise} from 'rxjs/internal/observable/fromPromise';
import {Messages} from '../../shared/models/messages.model';
import {AUTH_MSGS} from '../messages/auth-messages';

@Injectable()
export class AuthService {
  messages = new Messages(AUTH_MSGS);

  constructor(private auth: AngularFireAuth,
              private afs: AngularFirestore) { }

  loginWithEmailAndPassword(email: string, password: string): Promise<any> {
    return this.auth.auth.signInWithEmailAndPassword(email, password)
      .then(userRecord => this.mapAuthToUser(userRecord).toPromise())
      .catch(err => {
        throw { message: this.messages.getMessage(err.code) };
      });
  }

  logout(): Promise<any> {
    return this.auth.auth.signOut();
  }

  queryAuth(): Observable<any> {
    console.log('AuthService: queryAuth');
    return this.auth.authState
      .pipe(
        take(1),
        tap(auth => console.log('queryAuth: ', auth)),
        filter(auth => !!auth),
        switchMap(userRecord => this.mapAuthToUser(userRecord)),
        catchError(error => of(error))
      );
  }

  private mapAuthToUser(userRecord: any): Observable<UserModel> | any {
    console.log('MapAuthToUser: ', userRecord);
    return fromPromise(this.afs.collection('user-profiles').doc(userRecord.uid).ref.get())
      .pipe(
        map(userProfile => {
          const user = {...userProfile.data(), uid: userRecord.uid, photoURL: userProfile.data().imageUrl };
          delete user['imageUrl'];
          return user;
        }),
        catchError(error => of(error))
      );
  }
}
