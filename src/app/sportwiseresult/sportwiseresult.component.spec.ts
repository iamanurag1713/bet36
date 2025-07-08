import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportwiseresultComponent } from './sportwiseresult.component';

describe('SportwiseresultComponent', () => {
  let component: SportwiseresultComponent;
  let fixture: ComponentFixture<SportwiseresultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportwiseresultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportwiseresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
