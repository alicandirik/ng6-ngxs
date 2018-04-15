import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot} from '@angular/router';
import {Select} from '@ngxs/store';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap, take, tap} from 'rxjs/internal/operators';
import {AppState} from '../../state/app.state';
import {UserModel} from '../../shared/models/user.model';

@Injectable()
export class AuthenticationGuard implements CanActivate, CanLoad {

  @Select(AppState.getLoggedInUser) authUser$: Observable<UserModel>;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<boolean> {
    return this.checkUser()
      .pipe(
        switchMap(() => of(true)),
        catchError(() => of(false))
      );
  }

  canLoad(route: Route): Observable<boolean> {
    return this.checkUser()
      .pipe(
        switchMap(() => of(true)),
        catchError(() => of(false))
      );
  }

  protected checkUser(): Observable<boolean> {
    return this.authUser$
      .pipe(
        map(authUser => !!authUser),
        take(1)
      );
  }
}
