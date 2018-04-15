import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NaviHeaderComponent } from './navi-header.component';

describe('NaviHeaderComponent', () => {
  let component: NaviHeaderComponent;
  let fixture: ComponentFixture<NaviHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NaviHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NaviHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
