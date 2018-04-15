import {CanActivate} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/internal/operators';
import {Store} from '@ngxs/store';

export abstract class AbstractMasterGuard implements CanActivate {

  protected constructor(protected store: Store) {}

  canActivate(): Observable<boolean> {
    return this.checkStore()
      .pipe(
        switchMap(() => of(true)),
        catchError(() => of(false))
      );
  }

  protected checkStore(): Observable<boolean> {
    return this.getLoaded()
      .pipe(
        tap(isLoaded => !isLoaded && this.store.dispatch(this.getQueryAction())),
        // filter(isLoaded => isLoaded),
        take(1)
      );
  }

  protected abstract getLoaded(): Observable<boolean>;
  protected abstract getQueryAction(): any;
}
