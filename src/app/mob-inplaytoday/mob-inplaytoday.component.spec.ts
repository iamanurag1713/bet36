import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobInplaytodayComponent } from './mob-inplaytoday.component';

describe('MobInplaytodayComponent', () => {
  let component: MobInplaytodayComponent;
  let fixture: ComponentFixture<MobInplaytodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobInplaytodayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobInplaytodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
