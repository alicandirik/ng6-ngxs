import { Component, OnInit } from '@angular/core';
import {Store} from '@ngxs/store';
import {DisplayConfirmation, DisplayMessage} from '../state/app.actions';

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit() {
  }

  onPopup() {
    this.store.dispatch(new DisplayConfirmation({
      title: 'Geht das?',
      do: new DisplayMessage({ text: 'Geht!', type: 'success' })
    }));
  }

}
