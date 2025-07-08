import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedinHeaderComponent } from './loggedin-header.component';

describe('LoggedinHeaderComponent', () => {
  let component: LoggedinHeaderComponent;
  let fixture: ComponentFixture<LoggedinHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoggedinHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoggedinHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
