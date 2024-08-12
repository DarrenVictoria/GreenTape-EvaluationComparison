import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BidComparisonTableComponent } from './bid-comparison-table.component';

describe('BidComparisonTableComponent', () => {
  let component: BidComparisonTableComponent;
  let fixture: ComponentFixture<BidComparisonTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BidComparisonTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BidComparisonTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
