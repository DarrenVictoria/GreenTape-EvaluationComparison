import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortlistCommittee2Component } from './shortlist-committee-2.component';

describe('ShortlistCommittee2Component', () => {
  let component: ShortlistCommittee2Component;
  let fixture: ComponentFixture<ShortlistCommittee2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortlistCommittee2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortlistCommittee2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
