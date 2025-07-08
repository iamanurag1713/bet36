import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetsHistoryComponent } from './bets-history.component';

describe('BetsHistoryComponent', () => {
  let component: BetsHistoryComponent;
  let fixture: ComponentFixture<BetsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BetsHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BetsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
