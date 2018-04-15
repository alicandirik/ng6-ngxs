import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Select} from '@ngxs/store';
import {AppState} from '../../state/app.state';
import {UserModel} from '../../shared/models/user.model';
import {filter, map, take} from 'rxjs/internal/operators';
import {intersection} from 'lodash';

@Injectable()
export class AuthorizationGuard implements CanActivate, CanLoad {

  @Select(AppState.getLoggedInUser) authUser$: Observable<UserModel>;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkAuthorization(route.data['roles']);
  }

  canLoad(route: Route): Observable<boolean>  {
    return this.checkAuthorization(route.data['roles']);
  }

  private checkAuthorization(allowedRoles: string[]): Observable<boolean> {
    return this.authUser$
      .pipe(
        filter(authUser => !!authUser),
        map(authUser => authUser.roles && intersection(allowedRoles, authUser.roles).length > 0),
        take(1)
      );
  }
}
