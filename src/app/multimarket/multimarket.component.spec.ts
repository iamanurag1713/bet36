import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultimarketComponent } from './multimarket.component';

describe('MultimarketComponent', () => {
  let component: MultimarketComponent;
  let fixture: ComponentFixture<MultimarketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultimarketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultimarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
