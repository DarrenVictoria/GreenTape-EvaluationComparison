import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationComparisonTabsComponent } from './evaluation-comparison-tabs.component';

describe('EvaluationComparisonTabsComponent', () => {
  let component: EvaluationComparisonTabsComponent;
  let fixture: ComponentFixture<EvaluationComparisonTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationComparisonTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationComparisonTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
