import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreawardCommitteeComponent } from './awarder.component';

describe('PreawardCommitteeComponent', () => {
  let component: PreawardCommitteeComponent;
  let fixture: ComponentFixture<PreawardCommitteeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PreawardCommitteeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreawardCommitteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
