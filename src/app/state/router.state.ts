import {Action, State, StateContext} from '@ngxs/store';
import {Router} from '@angular/router';
import {Navigate} from './router.actions';

@State<string>({
  name: 'router',
  defaults: ''
})

export class RouterState {
  constructor(private router: Router) {}

  @Action(Navigate)
  async changeRoute(sc: StateContext<string>, action: Navigate) {
    const path = action.payload;
    await this.router.navigate([path]);
    sc.setState(path);
  }
}
