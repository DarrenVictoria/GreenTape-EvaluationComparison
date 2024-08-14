import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortlistCommitteeComponent } from './shortlist-committee.component';

describe('ShortlistCommitteeComponent', () => {
  let component: ShortlistCommitteeComponent;
  let fixture: ComponentFixture<ShortlistCommitteeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortlistCommitteeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortlistCommitteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
