import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiverMasterComponent } from './receiver-master.component';

describe('ReceiverMasterComponent', () => {
  let component: ReceiverMasterComponent;
  let fixture: ComponentFixture<ReceiverMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiverMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiverMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
