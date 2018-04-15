import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NaviSidebarComponent } from './navi-sidebar.component';

describe('NaviSidebarComponent', () => {
  let component: NaviSidebarComponent;
  let fixture: ComponentFixture<NaviSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NaviSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NaviSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
